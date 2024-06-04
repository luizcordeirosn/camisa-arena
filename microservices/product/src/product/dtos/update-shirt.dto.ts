import { IsNumber, IsString } from 'class-validator';

export class updateShirtDto {
  @IsNumber()
  price: number;

  @IsString()
  model: string;
}
