import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Shirt } from '../entities/shirt.entity';

@Injectable()
export class ShirtRepository {
  @Inject()
  private readonly prisma: PrismaService;

  async create(payload: Shirt): Promise<Shirt> {
    return await this.prisma.shirt.create({
      data: {
        ...payload,
      },
    });
  }
}
