import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ShirtRepository } from '../repositories/shirt.repository';
import { Shirt } from '../entities/shirt.entity';

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
}
