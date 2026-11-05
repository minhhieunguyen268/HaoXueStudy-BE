import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

interface AuthenticatedRequest extends Request {
  user: { userId: number; email: string };
}

interface AuthResult {
  accessToken: string;
  user: unknown;
}

const ACCESS_COOKIE = 'access_token';

function accessCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };
}

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST | `/api/auth/register` | Đăng ký tài khoản và tạo phiên đăng nhập bằng cookie.
  @Post('register')
  async register(
    @Body() input: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = (await this.authService.register(input)) as AuthResult;
    response.cookie(ACCESS_COOKIE, result.accessToken, accessCookieOptions());
    return { user: result.user };
  }

  // POST | `/api/auth/login` | Đăng nhập bằng email/mật khẩu, trả thông tin người dùng và set access_token cookie.
  @Post('login')
  async login(
    @Body() input: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = (await this.authService.login(input)) as AuthResult;
    response.cookie(ACCESS_COOKIE, result.accessToken, accessCookieOptions());
    return { user: result.user };
  }

  // POST | `/api/auth/logout` | Đăng xuất và xóa access_token cookie.
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(ACCESS_COOKIE, accessCookieOptions());
    return { success: true };
  }

  // GET | `/api/auth/me` | Lấy thông tin người dùng hiện tại từ access_token cookie.
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() request: AuthenticatedRequest) {
    return this.authService.getMe(request.user.userId);
  }
}
