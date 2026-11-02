import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { QueryFailedError } from 'typeorm';
import { randomBytes } from 'crypto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

type PublicUser = Pick<
  User,
  'id' | 'username' | 'name' | 'email' | 'role' | 'createdAt'
>;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: RegisterDto) {
    this.assertPasswordByteLength(input.password);
    const email = input.email.trim().toLowerCase();

    if (await this.usersService.findByEmail(email)) {
      throw new ConflictException('Email đã được sử dụng');
    }

    try {
      const user = await this.usersService.createUser({
        username: this.createUsername(email),
        name: input.name.trim(),
        email,
        passwordHash: await hash(input.password, 12),
      });
      return this.createAuthResponse(user);
    } catch (error) {
      if (this.isDuplicateEmailError(error)) {
        throw new ConflictException('Email đã được sử dụng');
      }
      throw error;
    }
  }

  async login(input: LoginDto) {
    this.assertPasswordByteLength(input.password);
    const user = await this.usersService.findByEmail(
      input.email.trim().toLowerCase(),
    );

    if (!user || !(await compare(input.password, user.passwordHash))) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }

    return this.createAuthResponse(user);
  }

  async getMe(userId: number): Promise<PublicUser> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Tài khoản không còn tồn tại');
    }
    return this.toPublicUser(user);
  }

  private async createAuthResponse(user: User) {
    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken,
      tokenType: 'Bearer',
      user: this.toPublicUser(user),
    };
  }

  private toPublicUser(user: User): PublicUser {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    };
  }

  private createUsername(email: string): string {
    const localPart = email.split('@')[0];
    const base =
      localPart
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9._-]/g, '')
        .slice(0, 41) || 'user';
    return `${base}-${randomBytes(4).toString('hex')}`;
  }

  private assertPasswordByteLength(password: string): void {
    if (Buffer.byteLength(password, 'utf8') > 72) {
      throw new BadRequestException('Mật khẩu không được vượt quá 72 byte');
    }
  }

  private isDuplicateEmailError(error: unknown): boolean {
    return (
      error instanceof QueryFailedError &&
      (error.driverError as { code?: string }).code === 'ER_DUP_ENTRY'
    );
  }
}
