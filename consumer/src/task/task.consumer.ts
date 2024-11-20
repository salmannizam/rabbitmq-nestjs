import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class TaskConsumerController {
  @EventPattern('task_created') // Ensure this matches the emitted pattern
  async handleTask(task: { description: string }) {
    console.log('Received task:', task.description);

    // Simulate task processing
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2-second task
    console.log('Task processed:', task.description);
  }
}
