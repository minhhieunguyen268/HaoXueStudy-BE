import { Controller, Get, Query } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import type { VocabularyFilters } from './vocabulary.service';

@Controller('api/vocabulary')
export class VocabularyController {
  constructor(private readonly vocabularyService: VocabularyService) {}

  // GET | `/api/vocabulary` | Lấy danh sách từ vựng; hỗ trợ q, category, tocflLevel, page và pageSize.
  @Get()
  findAll(@Query() query: VocabularyFilters) {
    return this.vocabularyService.findAll(query);
  }
}
