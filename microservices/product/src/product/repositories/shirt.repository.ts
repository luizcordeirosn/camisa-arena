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

  async findAll(skip: number, take: number): Promise<Shirt[]> {
    return await this.prisma.shirt.findMany({
      orderBy: [{ model: 'asc' }, { updatedAt: 'desc' }],
      skip,
      take,
    });
  }

  async count(): Promise<number> {
    return await this.prisma.shirt.count();
  }
}
