import { BadRequestException, ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

const book = 'contemporary-chinese-1';
interface Checkpoint { revision: number; step: number; answers: Record<string,string> }
export interface ProgressRow extends Checkpoint { lesson: number; done: number }

@Injectable()
export class LearningProgressService {
  constructor(private readonly db: DataSource) {}

  async read(user: number, em = this.db.manager) {
    const rows: ProgressRow[] = await em.query(`SELECT l.lesson_number AS lesson, p.step,
      p.answers, p.revision, (p.completed_at IS NOT NULL) AS done
      FROM user_course_lesson_progress p JOIN course_lessons l ON l.id=p.lesson_id
      JOIN course_books b ON b.id=l.book_id WHERE p.user_id=? AND b.code=?
      ORDER BY l.lesson_number`, [user, book]);
    let completed = 0;
    for (const row of rows) {
      if (!row.done || Number(row.lesson) !== completed + 1) break;
      completed++;
    }
    return { completed, lessons: rows };
  }

  private async lock(user: number, em: EntityManager) {
    await em.query('SELECT id FROM users WHERE id=? FOR UPDATE', [user]);
  }

  async import(user: number, completed: number) {
    return this.db.transaction(async em => {
      await this.lock(user, em);
      await em.query(`INSERT INTO user_course_lesson_progress (user_id, lesson_id, answers, completed_at)
        SELECT ?, l.id, JSON_OBJECT(), CURRENT_TIMESTAMP FROM course_lessons l
        JOIN course_books b ON b.id=l.book_id WHERE b.code=? AND l.lesson_number BETWEEN 1 AND ?
        ON DUPLICATE KEY UPDATE completed_at=COALESCE(completed_at,CURRENT_TIMESTAMP)`, [user, book, completed]);
      return this.read(user, em);
    });
  }

  async save(user: number, lesson: number, data: Checkpoint) {
    return this.db.transaction(async em => {
      await this.lock(user, em);
      const current = await this.read(user, em);
      if (lesson > current.completed + 1) throw new ForbiddenException('Bài học chưa mở khóa.');
      const patterns: { id: string; pattern: string }[] = await em.query(`SELECT l.id,g.pattern
        FROM course_lessons l JOIN course_books b ON b.id=l.book_id
        JOIN course_lesson_grammar g ON g.lesson_id=l.id
        WHERE b.code=? AND l.lesson_number=? ORDER BY g.position`, [book, lesson]);
      const count = patterns.length;
      const old = current.lessons.find(row => Number(row.lesson) === lesson);
      if ((old?.revision ?? 0) !== data.revision) throw new ConflictException('Tiến độ đã thay đổi.');
      const entries = Object.entries(data.answers);
      if (!count || data.step > count || data.step > (old?.step ?? 0) + 1 ||
          entries.some(([key, answer]) => !/^(0|[1-9]\d*)$/.test(key) || Number(key) >= count ||
            typeof answer !== 'string' || !answer.trim() || answer.length > 4000)) {
        throw new BadRequestException('Tiến độ không hợp lệ.');
      }
      if (entries.length && data.step !== count &&
          entries.some(([key, answer]) => old?.answers[key] !== answer)) {
        throw new BadRequestException('Hãy xem hết cấu trúc trước khi luyện tập.');
      }
      const done = data.step === count && entries.length === count;
      await em.query(`INSERT INTO user_course_lesson_progress (user_id, lesson_id, step, answers, completed_at)
        VALUES (?, ?, ?, ?, IF(?,CURRENT_TIMESTAMP,NULL))
        ON DUPLICATE KEY UPDATE step=VALUES(step), answers=VALUES(answers), revision=revision+1,
        completed_at=COALESCE(completed_at,VALUES(completed_at))`,
        [user, patterns[0].id, data.step, JSON.stringify(data.answers), done]);
      return this.read(user, em);
    });
  }
}
