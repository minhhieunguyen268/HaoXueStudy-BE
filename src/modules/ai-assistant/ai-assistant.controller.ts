import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatDto } from './dto/chat.dto';
import { AiAssistantService } from './ai-assistant.service';

interface AuthenticatedRequest extends Request {
  user: { userId: number; email: string };
}

@Controller('api/ai-assistant')
@UseGuards(JwtAuthGuard)
export class AiAssistantController {
  constructor(private readonly aiAssistant: AiAssistantService) {}

  // POST | `/api/ai-assistant/chat` | Gửi câu hỏi, lưu lịch sử và nhận phản hồi trợ lý tiếng Trung.
  @Post('chat')
  chat(@Req() request: AuthenticatedRequest, @Body() input: ChatDto) {
    return this.aiAssistant.sendMessage(request.user.userId, input);
  }

  // GET | `/api/ai-assistant/conversations` | Lấy các cuộc trò chuyện AI gần đây của người dùng hiện tại.
  @Get('conversations')
  listConversations(@Req() request: AuthenticatedRequest) {
    return this.aiAssistant.listConversations(request.user.userId);
  }

  // GET | `/api/ai-assistant/conversations/:id/messages` | Lấy lịch sử tin nhắn của cuộc trò chuyện thuộc người dùng hiện tại.
  @Get('conversations/:id/messages')
  getMessages(
    @Req() request: AuthenticatedRequest,
    @Param('id', ParseIntPipe) conversationId: number,
  ) {
    return this.aiAssistant.getMessages(request.user.userId, conversationId);
  }
}
