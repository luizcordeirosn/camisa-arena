import * as amqp from 'amqplib';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ShirtService } from 'src/product/services/shirt.service';
import { UpdateQuantityShirtDto } from 'src/product/dtos/update-quantity-shirt.dto';

@Injectable()
export class MessageReceiver implements OnModuleInit {
  QUEUE_NAME = 'orderCreated';
  EXCHANGE_NAME = 'orderExchange';
  ROUTING_KEY = 'orderKey';

  @Inject()
  private readonly service: ShirtService;

  async receive() {
    try {
      const connection = await amqp.connect('amqp://localhost');
      const channal = await connection.createChannel();
      await channal.assertExchange(this.EXCHANGE_NAME, 'direct');
      await channal.assertQueue(this.QUEUE_NAME, { durable: true });
      await channal.bindQueue(
        this.QUEUE_NAME,
        this.EXCHANGE_NAME,
        this.ROUTING_KEY,
      );

      channal.consume(this.QUEUE_NAME, async (msg) => {
        if (msg != null) {
          const obj = <UpdateQuantityShirtDto[]>(
            JSON.parse(msg.content.toString())
          );
          await this.service.updateQuantityById(obj);
          channal.ack(msg);
        }
      });
    } catch (error) {}
  }

  onModuleInit() {
    this.receive();
  }
}
