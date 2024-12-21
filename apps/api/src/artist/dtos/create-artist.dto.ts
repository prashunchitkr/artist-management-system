import { IsNullable } from '@/core/decorators/is-nullable.decorator';
import { Gender } from '@/core/enums/db.enums';
import { IsDate, IsEnum, IsInt, IsString, MaxLength } from 'class-validator';

export class CreateArtistRequestDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsInt()
  user_id: number;

  @IsNullable()
  @IsDate()
  dob: Date | null;

  @IsNullable()
  @IsString()
  address: string | null;

  @IsNullable()
  @IsInt()
  first_release_year: number | null;

  @IsNullable()
  @IsInt()
  no_of_albums_released: number | null;
}
