import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourseDialogues1763000000000 implements MigrationInterface {
  async up(db: QueryRunner) {
    await db.query(`CREATE TABLE IF NOT EXISTS course_lesson_dialogues (
      lesson_id BIGINT NOT NULL, position INT NOT NULL, dialogue VARCHAR(100) NOT NULL,
      speaker VARCHAR(255) NOT NULL, traditional TEXT NOT NULL, simplified TEXT NOT NULL,
      pinyin TEXT NOT NULL, meaning_vi TEXT NOT NULL,
      PRIMARY KEY (lesson_id, position),
      FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  }

  async down(db: QueryRunner) {
    await db.query('DROP TABLE course_lesson_dialogues');
  }
}
