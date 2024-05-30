import {
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateShirtDto {
  @IsString()
  model: string;

  @IsString()
  @IsIn(['PP', 'P', 'M', 'G', 'GG', 'XG', 'XGG', 'EG', 'EGG'])
  size: string;

  @IsNumber()
  price: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  quantity: number;

  @IsString()
  @IsOptional()
  description?: string;
}
