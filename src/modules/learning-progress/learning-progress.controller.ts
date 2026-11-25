import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { IsBoolean, IsInt, IsObject, IsOptional, Max, Min } from 'class-validator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LearningProgressService } from './learning-progress.service';

class Checkpoint {
  @IsInt() @Min(0) revision!: number;
  @IsInt() @Min(0) step!: number;
  @IsOptional() @IsBoolean() submit?: boolean;
  @IsObject() answers!: Record<string, string>;
}
class LegacyProgress {
  @IsInt() @Min(1) @Max(15) completed!: number;
}
type Session = { user: { userId: number } };

@Controller('api/learning-progress/a1')
@UseGuards(JwtAuthGuard)
export class LearningProgressController {
  constructor(private readonly progress: LearningProgressService) {}

  // GET | /api/learning-progress/a1 | Đọc tiến độ Quyển 1 của tài khoản đang đăng nhập.
  @Get()
  read(@Req() req: Session) { return this.progress.read(req.user.userId); }

  // POST | /api/learning-progress/a1/import | Chuyển các bài đã hoàn thành từ trình duyệt cũ.
  @Post('import')
  import(@Req() req: Session, @Body() data: LegacyProgress) {
    return this.progress.import(req.user.userId, data.completed);
  }

  // GET | /api/learning-progress/a1/:lesson/quiz | Lấy câu hỏi và lựa chọn của bài cuối chương.
  @Get(':lesson/quiz')
  quiz(@Req() req: Session, @Param('lesson', ParseIntPipe) lesson: number) {
    return this.progress.quiz(req.user.userId, lesson);
  }

  // PUT | /api/learning-progress/a1/:lesson | Lưu cấu trúc và đáp án, xét mở bài kế tiếp.
  @Put(':lesson')
  save(@Req() req: Session, @Param('lesson', ParseIntPipe) lesson: number, @Body() data: Checkpoint) {
    return this.progress.save(req.user.userId, lesson, data);
  }
}
