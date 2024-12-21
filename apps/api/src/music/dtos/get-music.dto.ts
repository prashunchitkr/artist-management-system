import { FindManyQueryDto } from '@/core/dtos/find-many-query.dto';
import { PaginatedDto } from '@/infra/dtos/paginated.dto';
import { MusicDto } from './music.dto';

export class GetAllMusicQueryDto extends FindManyQueryDto {}

export class GetAllMusicResponseDto implements PaginatedDto<MusicDto> {
  data: MusicDto[];
  total: number;
  count: number;
}
