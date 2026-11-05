import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { AiAssistantModule } from './modules/ai-assistant/ai-assistant.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CharactersModule } from './modules/characters/characters.module';
import { FlashcardsModule } from './modules/flashcards/flashcards.module';
import { LearningHistoryModule } from './modules/learning-history/learning-history.module';
import { LearningProgressModule } from './modules/learning-progress/learning-progress.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { UsersModule } from './modules/users/users.module';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    },
  ],
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: databaseConfig,
    }),
    AuthModule,
    AiAssistantModule,
    UsersModule,
    VocabularyModule,
    CharactersModule,
    CategoriesModule,
    LessonsModule,
    FlashcardsModule,
    QuizzesModule,
    LearningProgressModule,
    LearningHistoryModule,
  ],
})
export class AppModule {}
