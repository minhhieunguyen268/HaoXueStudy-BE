import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import type { VocabularyFilters } from './vocabulary.service';

@Controller('api/vocabulary')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  // GET | /api/vocabulary/books/:bookCode/lessons/:lesson/dialogues | Lấy hội thoại theo thứ tự trong bài.
  @Get('books/:bookCode/lessons/:lesson/dialogues')
  findDialogues(@Param('bookCode') bookCode: string, @Param('lesson', ParseIntPipe) lesson: number) {
    return this.vocabularyService.findDialogues(bookCode, lesson);
  }

  // GET | /api/vocabulary/books/:bookCode/grammar | Lấy ngữ pháp theo từng bài của giáo trình.
  @Get('books/:bookCode/grammar')
  findGrammar(@Param('bookCode') bookCode: string) {
    return this.vocabularyService.findGrammar(bookCode);
  }


  // GET | `/api/vocabulary/books` | Lấy danh sách giáo trình và số bài/từ đã gắn.
  @Get('books')
  findBooks() {
    return this.vocabularyService.findBooks();
  }

  // GET | `/api/vocabulary/books/:bookCode/lessons` | Lấy các bài và số từ đã gắn trong một giáo trình.
  @Get('books/:bookCode/lessons')
  findLessons(@Param('bookCode') bookCode: string) {
    return this.vocabularyService.findLessons(bookCode);
  }

  // GET | `/api/vocabulary` | Lấy danh sách từ; hỗ trợ q, category, tocflLevel, bookCode, lessonNumber, page và pageSize.
  @Get()
  findAll(@Query() query: VocabularyFilters) {
    return this.vocabularyService.findAll(query);
  }
}
