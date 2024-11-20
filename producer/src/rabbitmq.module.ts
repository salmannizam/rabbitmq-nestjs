// import { Module } from '@nestjs/common';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     ClientsModule.registerAsync([
//       {
//         name: 'RABBITMQ_SERVICE', // Name the client
//         useFactory: (configService: ConfigService) => ({
//           transport: Transport.RMQ,
//           options: {
//             urls: [configService.get('RABBITMQ_URL')], // RabbitMQ URL from environment
//             queue: configService.get('RABBITMQ_QUEUE'), // Queue name from environment
//             queueOptions: {
//               durable: true, // Ensure queue survives restarts
//             },
//           },
//         }),
//         inject: [ConfigService],
//       },
//     ]),
//   ],
//   exports: [ClientsModule],
// })
// export class RabbitMQModule {}
