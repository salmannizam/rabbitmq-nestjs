import { Controller, Post, Body, Get } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Controller('tasks')
export class TaskController {
  private client: ClientProxy;

  constructor() {

    // constructor(@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy) {}


    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'], // RabbitMQ connection
        queue: 'task_queue', // Queue name
        queueOptions: {
          durable: true,
        },
      },
    });
  }

  @Post('create')
  async createTask(@Body() task: { description: string }) {
    // Emit the task_created event to RabbitMQ
    this.client.emit('task_created', task);
    console.log('Task created and sent to the queue')
    return { message: 'Task created and sent to the queue' };
  }

  @Get('status')
  getTaskStatus() {
    return { status: 'Producer is running' };
  }
}


//exchange///////

//*** */ 1.direct*****
// @Controller('tasks')
// export class TaskController {
//   constructor(@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy) {}

//   @Post('create')
//   async createTask(@Body() task: { description: string }) {
//     // Send message to 'direct_exchange' with routing key 'task_queue'
//     this.client.emit({ exchange: 'direct_exchange', routingKey: 'task_queue' }, task);
//     return { message: 'Task created and sent to the queue' };
//   }
// }


//*** */ 1.fanout*****
// @Post('notify')
// async notifyAll(@Body() message: { content: string }) {
//   // Send message to 'fanout_exchange', no routing key needed
//   this.client.emit({ exchange: 'fanout_exchange' }, message);
//   return { message: 'Broadcast message sent to all queues' };
// }

//*** */ 1.topic exchnge*****
// @Post('create')
// async createTask(@Body() task: { description: string }) {
//   // Send message to 'topic_exchange' with routing key 'task.created'
//   this.client.emit({ exchange: 'topic_exchange', routingKey: 'task.created' }, task);
//   return { message: 'Task created with routing key "task.created"' };
// }
// }


//*** */ 1.header exchnge*****
// A Headers Exchange routes messages based on message headers instead of a routing key. This is less commonly used but can be helpful when routing decisions depend on specific header information.

// Producer sends a message with certain headers.
// The Exchange checks the headers and routes the message to the appropriate queue.
// Summary: