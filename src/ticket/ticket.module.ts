import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { TicketItem } from './entities/ticket-item.entity';
import { UserModule } from 'src/user/user.module';

import { UserActivityLogModule } from 'src/user-activity-log/user-activity-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket, TicketItem]),
    UserModule,
    UserActivityLogModule,
  ],
  controllers: [TicketController],
  providers: [TicketService],
  exports: [TicketService],
})
export class TicketModule {}
