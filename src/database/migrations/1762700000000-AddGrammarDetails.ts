import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddGrammarDetails1762700000000 implements MigrationInterface {
  async up(runner: QueryRunner): Promise<void> {
    if (!(await runner.hasColumn('course_lesson_grammar', 'details'))) {
      await runner.query('ALTER TABLE course_lesson_grammar ADD COLUMN details JSON NULL');
    }
  }

  async down(runner: QueryRunner): Promise<void> {
    await runner.query('ALTER TABLE course_lesson_grammar DROP COLUMN details');
  }
}