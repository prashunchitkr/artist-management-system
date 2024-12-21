import { IsNumber, Min } from 'class-validator';

export class FindManyQueryDto {
  @IsNumber()
  @Min(1)
  take: number = 10;

  @IsNumber()
  @Min(0)
  skip: number = 0;
}
