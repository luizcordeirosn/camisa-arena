import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ShirtRepository } from './product/repositories/shirt.repository';
import { ShirtService } from './product/services/shirt.service';
import { ShirtController } from './product/controllers/shirt.controller';

@Module({
  imports: [],
  controllers: [ShirtController],
  providers: [ShirtRepository, ShirtService, PrismaService],
})
export class AppModule {}
