import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1762100000000 implements MigrationInterface {
  name = 'CreateUsersTable1762100000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('users')) {
      return;
    }

    await queryRunner.query(`
      CREATE TABLE users (
        id BIGINT NOT NULL AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(150) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(150) NULL,
        avatar_url VARCHAR(500) NULL,
        role ENUM('USER', 'ADMIN') DEFAULT 'USER',
        is_active TINYINT(1) DEFAULT 1,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY username (username),
        UNIQUE KEY email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    // This migration is safe for databases that already had a users table.
    // Keep rollback non-destructive so pre-existing accounts are never dropped.
  }
}
