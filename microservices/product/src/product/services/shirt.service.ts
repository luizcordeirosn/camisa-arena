import { Inject, Injectable } from '@nestjs/common';
import { ShirtRepository } from '../repositories/shirt.repository';
import { Shirt } from '../entities/shirt.entity';

@Injectable()
export class ShirtService {
  @Inject()
  private readonly repository: ShirtRepository;

  async create(payload: Shirt): Promise<boolean> {
    try {
      return this.repository.create(payload) != null ? true : false;
    } catch (error) {
      throw new Error('Erro ao tentar criar nova camisa');
    }
  }
}
