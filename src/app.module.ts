import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './item/item.module';
import { StockModule } from './stock/stock.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';
import { UserActivityLogModule } from './user-activity-log/user-activity-log.module';
import { AuthModule } from './auth/auth.module';

import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      entities: [],
      database: process.env.DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
      // logging: true,
    }),
    ItemModule,
    StockModule,
    TicketModule,
    UserModule,
    UserActivityLogModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
