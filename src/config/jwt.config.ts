import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export const jwtConfig = (config: ConfigService): JwtModuleOptions => ({
  secret: config.getOrThrow<string>('JWT_SECRET'),
  signOptions: {
    expiresIn: config.get<string>('JWT_EXPIRES_IN', '1d') as `${number}${
      | 's'
      | 'm'
      | 'h'
      | 'd'}`,
  },
});
