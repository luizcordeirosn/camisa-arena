import { IsIn, IsOptional, IsString } from 'class-validator';

export class CreateShirtDto {
  @IsString()
  model: string;

  @IsString()
  @IsIn(['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG', 'EG', 'EGG'])
  size: string;

  @IsString()
  @IsOptional()
  description?: string;
}
