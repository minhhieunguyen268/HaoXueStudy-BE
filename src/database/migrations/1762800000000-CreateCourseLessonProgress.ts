import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourseLessonProgress1762800000000 implements MigrationInterface {
  async up(db: QueryRunner) {
    await db.query(`CREATE TABLE IF NOT EXISTS user_course_lesson_progress (
      user_id BIGINT NOT NULL, lesson_id BIGINT NOT NULL,
      step INT UNSIGNED NOT NULL DEFAULT 0, answers JSON NOT NULL,
      revision INT UNSIGNED NOT NULL DEFAULT 1, completed_at TIMESTAMP NULL,
      PRIMARY KEY (user_id, lesson_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  }
  async down(db: QueryRunner) { await db.query('DROP TABLE user_course_lesson_progress'); }
}
