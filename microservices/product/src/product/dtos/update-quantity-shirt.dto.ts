import { IsNumber } from 'class-validator';

export class UpdateQuantityShirtDto {
  @IsNumber()
  quantity: number;

  @IsNumber()
  productId: number;
}
