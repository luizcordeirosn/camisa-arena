import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ShirtRepository } from '../repositories/shirt.repository';
import { Shirt } from '../entities/shirt.entity';
import { FindAllShirtDto } from '../dtos/find-all-shirt.dto';
import { getPagination } from '../utils/get-pagination';
import { updateShirtDto } from '../dtos/update-shirt.dto';
import { UpdateQuantityShirtDto } from '../dtos/update-quantity-shirt.dto';
import { MessageSender } from '../utils/rabbitmq/message.sender';
import { UpdateOrderStatus } from '../dtos/update-order-status.dto';

@Injectable()
export class ShirtService {
  @Inject()
  private readonly repository: ShirtRepository;

  @Inject()
  private readonly sender: MessageSender;

  async create(payload: Shirt): Promise<boolean> {
    try {
      if (
        await this.repository.updateQuantityByModelAndSize(
          payload.model,
          payload.size,
          payload.quantity,
        )
      ) {
        return true;
      }

      return (await this.repository.create(payload)) != null ? true : false;
    } catch (error) {
      console.log(error.message);

      throw new HttpException(
        'Falha ao tentar criar nova camisa',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePriceByModel(payload: updateShirtDto): Promise<boolean> {
    try {
      return await this.repository.updatePriceByModel(
        payload.price,
        payload.model,
      );
    } catch (error) {
      console.log(error.message);
      throw new HttpException(
        'Falha ao atualizar o preço da camisa',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateQuantityById(payload: UpdateQuantityShirtDto): Promise<boolean> {
    try {
      payload.products.map(async (item) => {
        await this.repository.updateQuantityById(item);
      });
      const dto: UpdateOrderStatus = {
        orderId: payload.orderId,
        status: true,
      };

      this.sender.send(JSON.stringify(dto));
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
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
