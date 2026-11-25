import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCourseLessonQuiz1762900000000 implements MigrationInterface {
  async up(db: QueryRunner) {
    await db.query(`CREATE TABLE IF NOT EXISTS course_lesson_quiz_questions (
      lesson_id BIGINT NOT NULL, position INT NOT NULL, difficulty VARCHAR(50) NOT NULL,
      prompt TEXT NOT NULL, option_a TEXT NOT NULL, option_b TEXT NOT NULL,
      option_c TEXT NOT NULL, option_d TEXT NOT NULL, correct ENUM('A','B','C','D') NOT NULL,
      explanation TEXT NOT NULL, PRIMARY KEY (lesson_id, position),
      FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    if (!(await db.hasColumn('user_course_lesson_progress', 'quiz_submitted'))) {
      await db.query('ALTER TABLE user_course_lesson_progress ADD quiz_submitted BOOLEAN NOT NULL DEFAULT FALSE');
    }
  }

  async down(db: QueryRunner) {
    await db.query('ALTER TABLE user_course_lesson_progress DROP COLUMN quiz_submitted');
    await db.query('DROP TABLE course_lesson_quiz_questions');
  }
}
