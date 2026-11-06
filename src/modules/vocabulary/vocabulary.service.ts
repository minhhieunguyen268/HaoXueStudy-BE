import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

export interface VocabularyFilters {
  q?: string;
  category?: string;
  tocflLevel?: string;
  bookCode?: string;
  lessonNumber?: number | string;
  page?: number;
  pageSize?: number;
}

@Injectable()
export class VocabularyService {
  constructor(private readonly dataSource: DataSource) {}

  async findBooks() {
    const rows = (await this.dataSource.query(`
      SELECT b.id, b.code, b.title, b.description,
        COUNT(DISTINCT l.id) AS lessonCount,
        COUNT(DISTINCT lv.vocabulary_id) AS vocabularyCount
      FROM course_books b
      LEFT JOIN course_lessons l ON l.book_id = b.id
      LEFT JOIN course_lesson_vocabulary lv ON lv.lesson_id = l.id
      GROUP BY b.id, b.code, b.title, b.description
      ORDER BY b.id
    `)) as Array<Record<string, unknown>>;

    return rows.map((row) => ({
      ...row,
      id: Number(row.id),
      lessonCount: Number(row.lessonCount),
      vocabularyCount: Number(row.vocabularyCount),
    }));
  }

  async findLessons(bookCode: string) {
    const rows = (await this.dataSource.query(
      `SELECT l.id, b.code AS bookCode, b.title AS bookTitle,
        l.lesson_number AS lessonNumber, l.title,
        COUNT(DISTINCT lv.vocabulary_id) AS vocabularyCount
      FROM course_lessons l
      JOIN course_books b ON b.id = l.book_id
      LEFT JOIN course_lesson_vocabulary lv ON lv.lesson_id = l.id
      WHERE b.code = ?
      GROUP BY l.id, b.code, b.title, l.lesson_number, l.title
      ORDER BY l.lesson_number`,
      [bookCode],
    )) as Array<Record<string, unknown>>;

    return rows.map((row) => ({
      ...row,
      id: Number(row.id),
      lessonNumber: Number(row.lessonNumber),
      vocabularyCount: Number(row.vocabularyCount),
    }));
  }

  async findAll(filters: VocabularyFilters = {}) {
    const page = Math.max(1, Number(filters.page) || 1);
    const pageSize = Math.min(50, Math.max(1, Number(filters.pageSize) || 24));
    const conditions: string[] = [];
    const values: Array<string | number> = [];

    if (filters.q?.trim()) {
      const query = `%${filters.q.trim()}%`;
      conditions.push(
        '(v.traditional LIKE ? OR v.simplified LIKE ? OR v.pinyin LIKE ? OR v.zhuyin LIKE ? OR v.meaning_vi LIKE ?)',
      );
      values.push(query, query, query, query, query);
    }
    if (filters.category?.trim()) {
      conditions.push(
        'EXISTS (SELECT 1 FROM vocabulary_categories vc JOIN categories c ON c.id = vc.category_id WHERE vc.vocabulary_id = v.id AND c.slug = ?)',
      );
      values.push(filters.category.trim());
    }
    if (filters.tocflLevel?.trim()) {
      conditions.push('v.tocfl_level = ?');
      values.push(filters.tocflLevel.trim().toUpperCase());
    }
    if (filters.bookCode?.trim()) {
      const lessonNumber = Number(filters.lessonNumber);
      const lessonCondition = Number.isInteger(lessonNumber) && lessonNumber > 0
        ? ' AND l.lesson_number = ?'
        : '';
      conditions.push(`EXISTS (
        SELECT 1 FROM course_lesson_vocabulary lv
        JOIN course_lessons l ON l.id = lv.lesson_id
        JOIN course_books b ON b.id = l.book_id
        WHERE lv.vocabulary_id = v.id AND b.code = ?${lessonCondition}
      )`);
      values.push(filters.bookCode.trim());
      if (lessonCondition) values.push(lessonNumber);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const [countRows, words] = await Promise.all([
      this.dataSource.query(
        `SELECT COUNT(*) AS total FROM vocabulary v ${where}`,
        values,
      ),
      this.dataSource.query(
        `SELECT v.id, v.traditional, v.simplified, v.pinyin, v.zhuyin, v.meaning_vi AS meaningVi, v.meaning_en AS meaningEn, v.word_type AS wordType, v.tocfl_level AS tocflLevel, v.stroke_count AS strokeCount, v.audio_url AS audioUrl FROM vocabulary v ${where} ORDER BY v.id ASC LIMIT ? OFFSET ?`,
        [...values, pageSize, (page - 1) * pageSize],
      ),
    ]);

    const ids = (words as Array<{ id: number | string }>).map((word) => Number(word.id));
    if (!ids.length) {
      return { items: [], total: Number(countRows[0]?.total ?? 0), page, pageSize };
    }

    const placeholders = ids.map(() => '?').join(',');
    const [categoryRows, exampleRows, characterRows] = await Promise.all([
      this.dataSource.query(
        `SELECT vc.vocabulary_id AS vocabularyId, c.id, c.name, c.slug FROM vocabulary_categories vc JOIN categories c ON c.id = vc.category_id WHERE vc.vocabulary_id IN (${placeholders}) ORDER BY c.id`,
        ids,
      ),
      this.dataSource.query(
        `SELECT id, vocabulary_id AS vocabularyId, sentence_traditional AS sentenceTraditional, sentence_simplified AS sentenceSimplified, sentence_pinyin AS sentencePinyin, sentence_zhuyin AS sentenceZhuyin, meaning_vi AS meaningVi, audio_url AS audioUrl FROM vocabulary_examples WHERE vocabulary_id IN (${placeholders}) ORDER BY id`,
        ids,
      ),
      this.dataSource.query(
        `SELECT vc.vocabulary_id AS vocabularyId, vc.character_order AS characterOrder, ch.id, ch.traditional_char AS traditionalChar, ch.simplified_char AS simplifiedChar, ch.pinyin, ch.zhuyin, ch.meaning_vi AS meaningVi, ch.radical, ch.stroke_count AS strokeCount, ch.tocfl_level AS tocflLevel FROM vocabulary_characters vc JOIN characters ch ON ch.id = vc.character_id WHERE vc.vocabulary_id IN (${placeholders}) ORDER BY vc.vocabulary_id, vc.character_order`,
        ids,
      ),
    ]);

    const categoriesByWord = new Map<number, unknown[]>();
    for (const row of categoryRows) {
      const key = Number(row.vocabularyId);
      const categories = categoriesByWord.get(key) ?? [];
      categories.push({ id: Number(row.id), name: row.name, slug: row.slug });
      categoriesByWord.set(key, categories);
    }

    const examplesByWord = new Map<number, unknown[]>();
    const seenExamples = new Map<number, Set<string>>();
    for (const row of exampleRows) {
      const key = Number(row.vocabularyId);
      const signature = `${row.sentenceTraditional}|${row.meaningVi}`;
      const seen = seenExamples.get(key) ?? new Set<string>();
      if (seen.has(signature)) continue;
      seen.add(signature);
      seenExamples.set(key, seen);
      const examples = examplesByWord.get(key) ?? [];
      examples.push({
        id: Number(row.id),
        sentenceTraditional: row.sentenceTraditional,
        sentenceSimplified: row.sentenceSimplified,
        sentencePinyin: row.sentencePinyin,
        sentenceZhuyin: row.sentenceZhuyin,
        meaningVi: row.meaningVi,
        audioUrl: row.audioUrl,
      });
      examplesByWord.set(key, examples);
    }

    const charactersByWord = new Map<number, unknown[]>();
    for (const row of characterRows) {
      const key = Number(row.vocabularyId);
      const characters = charactersByWord.get(key) ?? [];
      characters.push({
        id: Number(row.id),
        traditionalChar: row.traditionalChar,
        simplifiedChar: row.simplifiedChar,
        pinyin: row.pinyin,
        zhuyin: row.zhuyin,
        meaningVi: row.meaningVi,
        radical: row.radical,
        strokeCount: Number(row.strokeCount),
        tocflLevel: row.tocflLevel,
        characterOrder: Number(row.characterOrder),
      });
      charactersByWord.set(key, characters);
    }

    return {
      items: (words as Array<Record<string, unknown>>).map((word) => {
        const id = Number(word.id);
        return {
          ...word,
          id,
          strokeCount: word.strokeCount == null ? null : Number(word.strokeCount),
          categories: categoriesByWord.get(id) ?? [],
          examples: examplesByWord.get(id) ?? [],
          characters: charactersByWord.get(id) ?? [],
        };
      }),
      total: Number(countRows[0]?.total ?? 0),
      page,
      pageSize,
    };
  }
}
