import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ShirtController } from './product/controllers/shirt.controller';
import { ShirtRepository } from './product/repositories/shirt.repository';
import { ShirtService } from './product/services/shirt.service';
import { MessageReceiver } from './product/utils/rabbitmq/message.receiver';
import { MessageSender } from './product/utils/rabbitmq/message.sender';

@Module({
  imports: [],
  controllers: [ShirtController],
  providers: [
    ShirtRepository,
    ShirtService,
    PrismaService,
    MessageReceiver,
    MessageSender,
  ],
})
export class AppModule {}
