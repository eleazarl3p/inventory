import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ForbiddenException,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

import { UserService } from 'src/user/user.service';
import { UserActivityLogService } from 'src/user-activity-log/user-activity-log.service';
import { userAction } from 'src/user-activity-log/entities/user-activity-log.entity';

@Controller('ticket')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,

    private readonly userService: UserService,

    private readonly userActivityLogService: UserActivityLogService,
  ) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto) {
    const user = await this.userService.findOne(1);

    if (!user) {
      throw new ForbiddenException('User not authorized');
    }
    const newTicket = await this.ticketService.create(createTicketDto, user);

    this.userActivityLogService.create(user, userAction.CREATE, {
      ticket: { id: newTicket._id, barcode: newTicket.barcode },
    });
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
