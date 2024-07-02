import { Injectable } from '@nestjs/common';
import { RabbitMQConfig } from './rabbitmq.config';

@Injectable()
export class MessageSender {
  QUEUE_NAME = 'authorizedOrder';
  EXCHANGE_NAME = 'authorizedExchange';
  ROUTING_KEY = 'orderKey';

  async send(message: string) {
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

      rabbitmq.channel.publish(
        this.EXCHANGE_NAME,
        this.ROUTING_KEY,
        Buffer.from(message),
      );
    } catch (error) {}
  }
}
