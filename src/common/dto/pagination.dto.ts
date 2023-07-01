import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  readonly offset?: number = 0;

  @IsOptional()
  @Min(1)
  @Max(10)
  @IsInt()
  readonly limit?: number = 10;
}
