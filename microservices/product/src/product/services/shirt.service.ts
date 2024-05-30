import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ShirtRepository } from '../repositories/shirt.repository';
import { Shirt } from '../entities/shirt.entity';
import { FindAllShirtDto } from '../dtos/find-all-shirt.dto';
import { getPagination } from '../utils/get-pagination';

@Injectable()
export class ShirtService {
  @Inject()
  private readonly repository: ShirtRepository;

  async create(payload: Shirt): Promise<boolean> {
    try {
      return (await this.repository.create(payload)) != null ? true : false;
    } catch (error) {
      console.log(error.message);

      throw new HttpException(
        'Falha ao tentar criar nova camisa',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(page: number, limit: number): Promise<FindAllShirtDto> {
    try {
      const { skip, take } = getPagination(page, limit);

      return {
        data: await this.repository.findAll(skip, take),
        total: await this.repository.count(),
        page,
        limit,
      };
    } catch (error) {
      console.log(error.message);

      throw new HttpException(
        'Falha ao listar todas as camisas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
