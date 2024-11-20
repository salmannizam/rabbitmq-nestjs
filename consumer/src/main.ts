import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], // RabbitMQ URL
      queue: 'task_queue', // Queue name
      queueOptions: {
        durable: true, // Ensure queue is durable
      },
    },
  });
  await app.listen(); // Listen to RabbitMQ for events
}
bootstrap();
