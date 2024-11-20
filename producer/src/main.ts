import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); // HTTP Server for API

  // Microservice for RabbitMQ
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'], // RabbitMQ URL
      queue: 'task_queue', // Queue name
      queueOptions: {
        durable: true, // Ensure queue is durable
      },
    },
  });
  await microservice.listen(); // Listen to RabbitMQ for events
}
bootstrap();





//

/*
const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
  transport: Transport.RMQ, // Use RabbitMQ for message transport
  options: {
    urls: ['amqp://localhost:5672'], // RabbitMQ server URL
    queue: 'task_queue', // The queue to listen to or send messages to
    queueOptions: {
      durable: true, // Ensures messages are persistent (durable)
    },
  },
});
await app.listen();


Remember:
Transport.RMQ is used to set up RabbitMQ as the transport.
urls is the RabbitMQ server connection URL.
queue is the name of the queue (e.g., task_queue).
durable: true makes sure the queue persists even if RabbitMQ restarts.




/// produce

private client: ClientProxy;

constructor() {
  this.client = ClientProxyFactory.create({
    transport: Transport.RMQ, // Use RabbitMQ for transport
    options: {
      urls: ['amqp://localhost:5672'], // RabbitMQ server URL
      queue: 'task_queue', // Queue to which you will send messages
      queueOptions: {
        durable: true, // Queue persistence
      },
    },
  });
}

Remember:
ClientProxy is used for sending messages to RabbitMQ from your service/controller.
ClientProxyFactory.create initializes the RabbitMQ connection for the producer.


this.client.emit('task_created', { data: 'Sample task data' }).toPromise();

Remember:
emit is used to send messages (like events) to a RabbitMQ queue.
The first argument is the event name (task_created), and the second is the payload ({ data: 'Sample task data' }).
.toPromise() ensures the message sending process is handled asynchronously.



###consumer
@Controller()
export class TaskConsumerController {
  @EventPattern('task_created')
  async handleTask(data: any) {
    console.log('Received task:', data);
    // Handle the task
  }
}
*/


// ************ 1. Emit and Send Patterns **********
// When working with RabbitMQ in NestJS, there are two main messaging patterns:

// emit for fire-and-forget events.
// send for request-response messaging