import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const databaseConfig = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: config.getOrThrow<string>('DB_HOST'),
  port: config.get<number>('DB_PORT', 3306),
  username: config.getOrThrow<string>('DB_USERNAME'),
  password: config.get<string>('DB_PASSWORD', ''),
  database: config.getOrThrow<string>('DB_DATABASE'),
  autoLoadEntities: true,
  synchronize: false,
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsRun: true,
  retryAttempts: 5,
  retryDelay: 3000,
});
