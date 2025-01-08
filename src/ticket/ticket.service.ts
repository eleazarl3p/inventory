import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, ticketStatus } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
  ) {}

  create(createTicketDto: CreateTicketDto) {
    return 'This action adds a new ticket';
  }

  async findAll() {
    const tickets = await this.ticketRepo.find({
      relations: { ticket_item: { item: true } },
    });

    // Transform the data to rename `ticket_item` to `items`
    return tickets.map((ticket) => ({
      ...ticket,
      items: ticket.ticket_item, // Rename `ticket_item` to `items`
      ticket_item: undefined, // Remove the original `ticket_item`
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  async updateStatus(_id: number, status: ticketStatus) {
    return await this.ticketRepo.update({ _id }, { status });
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
