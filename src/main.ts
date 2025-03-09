import 'dotenv/config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      //urls: ['amqp://admin:admin@localhost:5672'],
      urls: ['amqps://ouxnznue:qvOdwSPLE2pVDNLrAcIN1J9k5JLPHFBq@collie.lmq.cloudamqp.com/ouxnznue'],
      //queue: 'orders_queue',
      queueOptions: {
        durable: true
      },
    },
  });

  app.listen()
}
bootstrap();
