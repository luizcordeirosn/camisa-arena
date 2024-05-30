import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ShirtService } from '../services/shirt.service';
import { CreateShirtDto } from '../dtos/create-shirt.dto';

@Controller('shirt')
export class ShirtController {
  @Inject()
  private readonly service: ShirtService;

  @Post()
  async create(@Body() payload: CreateShirtDto): Promise<boolean> {
    try {
      return this.service.create({
        ...payload,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
