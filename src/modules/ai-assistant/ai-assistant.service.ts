import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ChatDto } from './dto/chat.dto';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';

const STUDY_ASSISTANT_INSTRUCTIONS = `Bạn là HaoXueStudy, trợ lý học tiếng Trung phồn thể Đài Loan nhưng cũng có thể trò chuyện bình thường bằng tiếng Việt.

Trước khi trả lời, hãy xác định ý định từ tin nhắn mới nhất. Tin nhắn mới nhất quyết định ý định; đừng mặc định người học đang yêu cầu dịch chỉ vì các tin nhắn trước đó nói về học tiếng Trung. Nếu người học sửa cách hiểu của bạn, hãy áp dụng ngay.

Quy tắc theo ý định:
- Chào hỏi hoặc xã giao (ví dụ “hello”, “hi”, “chào bạn”): đáp lại tự nhiên, thân thiện bằng tiếng Việt và hỏi ngắn gọn bạn có thể giúp gì. Không dịch lời chào, không thêm chữ Hán, zhuyin hay pinyin.
- Chỉ dùng định dạng học tiếng Trung khi người học hỏi rõ nghĩa/dịch/cách nói/cách đọc, hoặc hỏi kiến thức tiếng Trung. Với câu hỏi “... tiếng Trung là gì”, đưa bản dịch phồn thể tự nhiên ngay dòng đầu, sau đó ghi zhuyin, pinyin có dấu thanh và nghĩa tiếng Việt. Chỉ phiên âm câu tiếng Trung đang được học; không phiên âm phần giải thích tiếng Việt.
- Khi người học hỏi hoặc góp ý về câu trả lời, hãy trả lời đúng góp ý bằng tiếng Việt; không biến lời góp ý thành bài dịch.
- Trả lời đúng trọng tâm, hiểu tiếng lóng, lỗi gõ và câu không dấu nếu ý định rõ. Không chào hỏi xã giao khi người học đã hỏi một nội dung cụ thể.
- Với câu hỏi ngữ pháp, từ vựng hoặc cách dùng, giải thích ngắn bằng tiếng Việt, dùng chữ phồn thể và ví dụ tự nhiên ở Đài Loan. Ghi zhuyin và pinyin cho ví dụ tiếng Trung khi hữu ích. Dùng từ Đài Loan như 捷運, 計程車, 腳踏車.
- Với bản dịch có sắc thái thân mật, giải thích ngắn mức độ thân mật/lịch sự. Chỉ đưa phương án thay thế khi nó thực sự hữu ích.
- Mặc định viết đủ để dễ hiểu, không lặp lại, không lan man. Nếu không chắc, nói rõ.

Ví dụ ý định:
Người học: “hello”
Trợ lý: “Chào bạn! Hôm nay mình giúp gì cho bạn?”

Người học: “cảm ơn tiếng Trung là gì”
Trợ lý: “**謝謝**\nㄒㄧㄝˋ ㄒㄧㄝ˙ · xièxie\nNghĩa: cảm ơn.”`;

@Injectable()
export class AiAssistantService {
  private readonly logger = new Logger(AiAssistantService.name);
  private client?: GoogleGenAI;

  constructor(
    private readonly config: ConfigService,
    @InjectRepository(Conversation)
    private readonly conversations: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly messages: Repository<Message>,
  ) {}

  async sendMessage(userId: number, input: ChatDto) {
    const text = input.message.trim();
    if (!text) throw new BadRequestException('Tin nhắn không được để trống.');
    const client = this.getClient();
    let conversation: Conversation;

    if (input.conversationId) {
      const existing = await this.conversations.findOne({
        where: { id: input.conversationId, user: { id: userId } },
      });
      if (!existing) throw new NotFoundException('Không tìm thấy cuộc trò chuyện.');
      conversation = existing;
    } else {
      conversation = await this.conversations.save(
        this.conversations.create({ user: { id: userId } as User }),
      );
    }

    const recentHistory = await this.messages.find({
      where: { conversation: { id: conversation.id } },
      order: { createdAt: 'DESC', id: 'DESC' },
      take: 16,
    });
    const history = recentHistory.reverse();

    let reply: string;
    const model = this.config.get<string>('GEMINI_MODEL', 'gemini-3.8-flash');
    const fallbackModel = model === 'gemini-3.5-flash'
      ? 'gemini-3.5-flash-lite'
      : 'gemini-3.5-flash';
    let activeModel = model;
    try {
      const generate = (modelName: string) => client.models.generateContent({
          model: modelName,
          contents: [
            ...history.map((message) => ({
              role: message.role === 'USER' ? ('user' as const) : ('model' as const),
              parts: [{ text: message.content }],
            })),
            { role: 'user', parts: [{ text }] },
          ],
          config: {
            systemInstruction: STUDY_ASSISTANT_INSTRUCTIONS,
            maxOutputTokens: 1500,
            thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          },
        })
      const response = await generate(model).catch(async (error: unknown) => {
        const metadata = this.getErrorMetadata(error)
        const shouldFallback = model !== fallbackModel
          && (metadata.status === 400
            || metadata.status === 404
            || metadata.status === 503
            || metadata.status === 504
            || /NOT_FOUND|INVALID_ARGUMENT/i.test(metadata.code ?? ''))

        if (!shouldFallback) throw error
        activeModel = fallbackModel
        this.logger.warn(`Gemini model ${model} failed with status=${metadata.status ?? 'unknown'}; retrying with ${activeModel}`)
        return generate(activeModel)
      })
      if (response.candidates?.[0]?.finishReason === 'MAX_TOKENS') {
        this.logger.warn(`Gemini reply reached maxOutputTokens; model=${activeModel}`);
      }
      reply = response.text?.trim() ?? '';
      if (!reply) throw new Error('Empty model response');
    } catch (error) {
      const metadata = this.getErrorMetadata(error);
      this.logger.error(`Gemini request failed; model=${activeModel}; status=${metadata.status ?? 'network'}; code=${metadata.code ?? metadata.type ?? 'unknown'}`);

      if (metadata.status === 401 || metadata.status === 403 || /API_KEY_INVALID|UNAUTHENTICATED|PERMISSION_DENIED/i.test(metadata.code ?? '')) {
        throw new ServiceUnavailableException('Gemini không chấp nhận API key hoặc project chưa được cấp quyền. Kiểm tra GEMINI_API_KEY trong backend .env.');
      }
      if (metadata.status === 429 || /RESOURCE_EXHAUSTED|QUOTA/i.test(metadata.code ?? '')) {
        throw new ServiceUnavailableException('Gemini đang giới hạn yêu cầu hoặc tài khoản API đã hết hạn mức.');
      }
      if (metadata.status === 400 || metadata.status === 404 || /NOT_FOUND|INVALID_ARGUMENT/i.test(metadata.code ?? '')) {
        throw new ServiceUnavailableException('Gemini không nhận model đã cấu hình. Kiểm tra GEMINI_MODEL và quyền truy cập model trong Google AI Studio.');
      }
      if (!metadata.status) {
        throw new BadGatewayException('Backend không kết nối được Gemini. Kiểm tra kết nối mạng của backend.');
      }
      throw new BadGatewayException(`Gemini tạm thời gặp lỗi HTTP ${metadata.status} khi dùng ${activeModel}. Vui lòng thử lại sau.`);
    }

    await this.messages.save([
      this.messages.create({ conversation, role: 'USER', content: text }),
      this.messages.create({ conversation, role: 'ASSISTANT', content: reply }),
    ]);
    conversation.updatedAt = new Date();
    await this.conversations.save(conversation);

    return { conversationId: conversation.id, reply };
  }

  async listConversations(userId: number) {
    return this.conversations.find({
      where: { user: { id: userId } },
      order: { updatedAt: 'DESC' },
      take: 30,
      select: { id: true, createdAt: true, updatedAt: true },
    });
  }

  async getMessages(userId: number, conversationId: number) {
    const conversation = await this.conversations.findOne({
      where: { id: conversationId, user: { id: userId } },
    });
    if (!conversation) throw new NotFoundException('Không tìm thấy cuộc trò chuyện.');

    return this.messages.find({
      where: { conversation: { id: conversationId } },
      order: { createdAt: 'ASC' },
      select: { id: true, role: true, content: true, createdAt: true },
    });
  }

  private getClient(): GoogleGenAI {
    if (this.client) return this.client;
    const apiKey = this.config.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      throw new ServiceUnavailableException('GEMINI_API_KEY chưa được cấu hình trong backend .env.');
    }
    this.client = new GoogleGenAI({ apiKey, httpOptions: { timeout: 30_000 } });
    return this.client;
  }

  private getErrorMetadata(error: unknown) {
    if (!error || typeof error !== 'object') return {};
    const record = error as Record<string, unknown>;
    return {
      status: typeof record.status === 'number' ? record.status : undefined,
      code: typeof record.code === 'string' ? record.code : undefined,
      type: typeof record.type === 'string' ? record.type : undefined,
    };
  }
}
