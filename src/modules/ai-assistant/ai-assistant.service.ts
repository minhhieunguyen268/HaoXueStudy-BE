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
import { GoogleGenAI } from '@google/genai';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ChatDto } from './dto/chat.dto';
import { Conversation } from './entities/conversation.entity';
import { Message } from './entities/message.entity';

const STUDY_ASSISTANT_INSTRUCTIONS = `Bạn là HaoXueStudy, gia sư tiếng Trung phồn thể dùng cách nói tự nhiên ở Đài Loan.

Quy tắc trả lời:
- Trả lời bằng tiếng Việt, trừ khi người học yêu cầu ngôn ngữ khác. Hiểu cả tiếng lóng, lỗi gõ và câu hỏi viết không dấu nếu ý định vẫn rõ.
- Đi thẳng vào điều người học hỏi; không chào hỏi xã giao, không nhắc lại câu hỏi, không trả lời chung chung.
- Với câu hỏi dạng “... tiếng Trung là gì/dịch sang tiếng Trung”, dòng đầu tiên phải là bản dịch tiếng Trung phồn thể tự nhiên và dễ dùng. Sau đó ghi zhuyin (bopomofo), pinyin có dấu thanh, nghĩa tiếng Việt và một ghi chú sắc thái/ngữ cảnh ngắn nếu cần.
- Đưa một cách nói thay thế chỉ khi nó giúp người học hiểu sắc thái hoặc có cách diễn đạt tự nhiên hơn. Không lan man.
- Với câu hỏi ngữ pháp, từ vựng hoặc cách dùng, giải thích trọng tâm bằng một ví dụ phồn thể kèm zhuyin và pinyin. Phân biệt phồn thể Đài Loan với giản thể khi có khác biệt liên quan.
- Độ dài mặc định: đủ để người mới học hiểu và dùng được; câu hỏi đơn giản thường trả lời trong 3–6 dòng. Chỉ trả lời cực ngắn khi người học yêu cầu.
- Không tự nhận cách dịch sát nghĩa là tự nhiên. Nếu câu có nhiều sắc thái, nêu lựa chọn phù hợp và giải thích ngắn. Nếu không chắc, nói rõ.`;

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

    const history = await this.messages.find({
      where: { conversation: { id: conversation.id } },
      order: { createdAt: 'ASC' },
    });

    let reply: string;
    const model = this.config.get<string>('GEMINI_MODEL', 'gemini-3.5-flash');
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
            maxOutputTokens: 700,
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
