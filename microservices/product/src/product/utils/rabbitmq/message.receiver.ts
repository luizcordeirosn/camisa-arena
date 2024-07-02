import { Inject, OnModuleInit } from '@nestjs/common';
import { ShirtService } from 'src/product/services/shirt.service';
import { UpdateQuantityShirtDto } from 'src/product/dtos/update-quantity-shirt.dto';
import { RabbitMQConfig } from './rabbitmq.config';

export class MessageReceiver implements OnModuleInit {
  QUEUE_NAME = 'createdOrder';
  EXCHANGE_NAME = 'createdExchange';
  ROUTING_KEY = 'orderKey';

  @Inject()
  private readonly service: ShirtService;

  async receive() {
    try {
      const rabbitmq = RabbitMQConfig.rabbitmqConfig;
      await rabbitmq.start();

      await rabbitmq.channel.assertExchange(this.EXCHANGE_NAME, 'direct');
      await rabbitmq.channel.assertQueue(this.QUEUE_NAME, { durable: true });
      await rabbitmq.channel.bindQueue(
        this.QUEUE_NAME,
        this.EXCHANGE_NAME,
        this.ROUTING_KEY,
      );

      rabbitmq.channel.consume(this.QUEUE_NAME, async (msg) => {
        if (msg != null) {
          const obj = <UpdateQuantityShirtDto>(
            JSON.parse(msg.content.toString())
          );
          console.log(obj);
          await this.service.updateQuantityById(obj);
          rabbitmq.channel.ack(msg);
        }
      });
    } catch (error) {}
  }

  onModuleInit() {
    this.receive();
  }
}
