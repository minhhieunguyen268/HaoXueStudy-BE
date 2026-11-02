import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Cho phép Frontend gọi API Backend
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  
  const port = Number(process.env.APP_PORT ?? 3000);
  await app.listen(port);
}
bootstrap();
