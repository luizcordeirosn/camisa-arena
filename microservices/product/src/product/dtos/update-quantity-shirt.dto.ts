import { PurchasedShirt } from './purchased-shirt.dto';

export class UpdateQuantityShirtDto {
  orderId: number;
  products: PurchasedShirt[];
}
