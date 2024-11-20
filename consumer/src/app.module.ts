import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskConsumerController } from './task/task.consumer';

@Module({
  imports: [],
  controllers: [AppController,TaskConsumerController],
  providers: [AppService],
})
export class AppModule {}
