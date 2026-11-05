import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAiAssistantTables1762200000000 implements MigrationInterface {
  name = 'CreateAiAssistantTables1762200000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasTable('ai_conversations'))) {
      await queryRunner.query(`
        CREATE TABLE ai_conversations (
          id BIGINT NOT NULL AUTO_INCREMENT,
          user_id BIGINT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          INDEX idx_ai_conversations_user_updated (user_id, updated_at),
          CONSTRAINT fk_ai_conversations_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
    }

    if (!(await queryRunner.hasTable('ai_messages'))) {
      await queryRunner.query(`
        CREATE TABLE ai_messages (
          id BIGINT NOT NULL AUTO_INCREMENT,
          conversation_id BIGINT NOT NULL,
          role ENUM('USER', 'ASSISTANT') NOT NULL,
          content TEXT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          INDEX idx_ai_messages_conversation_created (conversation_id, created_at),
          CONSTRAINT fk_ai_messages_conversation FOREIGN KEY (conversation_id) REFERENCES ai_conversations(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
    }
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('ai_messages')) {
      await queryRunner.dropTable('ai_messages');
    }
    if (await queryRunner.hasTable('ai_conversations')) {
      await queryRunner.dropTable('ai_conversations');
    }
  }
}
