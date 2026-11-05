import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly dataSource: DataSource) {}

  // GET | `/api/categories` | Lấy danh sách chủ đề từ vựng.
  @Get()
  async findAll() {
    const rows = await this.dataSource.query(
      'SELECT id, name, slug, description, parent_id AS parentId FROM categories ORDER BY id ASC',
    );
    return rows.map((row: Record<string, unknown>) => ({
      ...row,
      id: Number(row.id),
      parentId: row.parentId == null ? null : Number(row.parentId),
    }));
  }
}
