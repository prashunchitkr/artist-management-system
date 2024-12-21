import { FindManyQueryDto } from '@/core/dtos/find-many-query.dto';
import { PaginatedDto } from '@/infra/dtos/paginated.dto';
import { ArtistResponseDto } from './artist-response.dto';

export class FindArtistsQueryDto extends FindManyQueryDto {}

export class FindArtistResponseDto implements PaginatedDto<ArtistResponseDto> {
  data: ArtistResponseDto[];
  total: number;
  count: number;
}
