import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ShirtService } from '../services/shirt.service';
import { CreateShirtDto } from '../dtos/create-shirt.dto';
import { FindAllShirtDto } from '../dtos/find-all-shirt.dto';

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

  @Get()
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<FindAllShirtDto> {
    try {
      return await this.service.findAll(page, limit);
    } catch (error) {
      throw new Error(error);
    }
  }
}
