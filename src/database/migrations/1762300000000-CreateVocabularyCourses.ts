import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVocabularyCourses1762300000000 implements MigrationInterface {
  name = 'CreateVocabularyCourses1762300000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasTable('course_books'))) {
      await queryRunner.query(`
        CREATE TABLE course_books (
          id BIGINT NOT NULL AUTO_INCREMENT,
          code VARCHAR(64) NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          UNIQUE KEY uq_course_books_code (code)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
    }

    if (!(await queryRunner.hasTable('course_lessons'))) {
      await queryRunner.query(`
        CREATE TABLE course_lessons (
          id BIGINT NOT NULL AUTO_INCREMENT,
          book_id BIGINT NOT NULL,
          lesson_number SMALLINT UNSIGNED NOT NULL,
          title VARCHAR(255) NOT NULL,
          description TEXT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          UNIQUE KEY uq_course_lessons_book_number (book_id, lesson_number),
          CONSTRAINT fk_course_lessons_book FOREIGN KEY (book_id) REFERENCES course_books(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
    }

    if (!(await queryRunner.hasTable('course_lesson_vocabulary'))) {
      await queryRunner.query(`
        CREATE TABLE course_lesson_vocabulary (
          lesson_id BIGINT NOT NULL,
          vocabulary_id BIGINT NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (lesson_id, vocabulary_id),
          INDEX idx_course_lesson_vocabulary_word (vocabulary_id),
          CONSTRAINT fk_course_lesson_vocabulary_lesson FOREIGN KEY (lesson_id) REFERENCES course_lessons(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
    }

    await queryRunner.query(
      `INSERT INTO course_books (code, title, description)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description)`,
      [
        'contemporary-chinese-1',
        'Giáo trình Đương Đại 1',
        'Giáo trình tiếng Trung phồn thể theo ngữ cảnh giao tiếp tại Đài Loan.',
      ],
    );

    const books = (await queryRunner.query(
      'SELECT id FROM course_books WHERE code = ?',
      ['contemporary-chinese-1'],
    )) as Array<{ id: number | string }>;
    const bookId = Number(books[0]?.id);
    if (!bookId) throw new Error('Could not initialize Contemporary Chinese Book 1');

    for (let lessonNumber = 1; lessonNumber <= 15; lessonNumber += 1) {
      const title = `Bài ${String(lessonNumber).padStart(2, '0')}`;
      await queryRunner.query(
        `INSERT INTO course_lessons (book_id, lesson_number, title)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE title = VALUES(title)`,
        [bookId, lessonNumber, title],
      );
    }
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable('course_lesson_vocabulary')) {
      await queryRunner.dropTable('course_lesson_vocabulary');
    }
    if (await queryRunner.hasTable('course_lessons')) {
      await queryRunner.dropTable('course_lessons');
    }
    if (await queryRunner.hasTable('course_books')) {
      await queryRunner.dropTable('course_books');
    }
  }
}
