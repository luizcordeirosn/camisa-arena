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

  async updateQuantityByModelAndSize(
    model: string,
    size: string,
    quantity: number,
  ): Promise<boolean> {
    return (
      await this.prisma.shirt.updateMany({
        where: {
          model,
          size,
        },
        data: {
          quantity: {
            increment: quantity,
          },
        },
      })
    ).count > 0
      ? true
      : false;
  }

  async updatePriceByModel(price: number, model: string): Promise<boolean> {
    return (
      await this.prisma.shirt.updateMany({
        where: {
          model,
        },
        data: {
          price,
        },
      })
    ).count > 0
      ? true
      : false;
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
