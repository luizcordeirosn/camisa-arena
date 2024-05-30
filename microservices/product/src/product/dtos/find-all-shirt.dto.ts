import { Shirt } from '../entities/shirt.entity';

export class FindAllShirtDto {
  data: Shirt[];
  page: number;
  limit: number;
  total: number;
}
