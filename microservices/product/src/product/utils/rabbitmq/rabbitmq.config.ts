import * as amqp from 'amqplib';

export class RabbitMQConfig {
  public connection;
  public channel;

  static rabbitmqConfig = new RabbitMQConfig();

  async start() {
    if (this.connection === undefined && this.channel === undefined) {
      this.connection = await amqp.connect('amqp://localhost');
      this.channel = await this.connection.createChannel();
    } else {
      return;
    }
  }
}
