import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, ticketStatus } from './entities/ticket.entity';
import { TicketItem } from './entities/ticket-item.entity';
import { Item } from 'src/item/entities/item.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,

    @InjectRepository(TicketItem)
    private readonly ticketItemRepo: Repository<TicketItem>,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    const lastTicketId = (await this.lastId()) + 1;
    createTicketDto.barcode = `TI-${lastTicketId.toString().padStart(5, '0')}`;

    const newTicket = this.ticketRepo.create(createTicketDto);

    const saveTicket = await this.ticketRepo.save(newTicket);

    const items = await Promise.all(
      createTicketDto.items.map(async (itm) => {
        const ti = this.ticketItemRepo.create({
          ticket: { _id: saveTicket._id } as Ticket,
          item: { _id: itm.item._id } as Item,
          quantity: itm.quantity,
          price: itm.price,
        });

        return await this.ticketItemRepo.save(ti);
      }),
    );

    saveTicket.items = items;

    await this.ticketRepo.save(saveTicket);

    return saveTicket;
  }

  async findAll() {
    return await this.ticketRepo.find({
      relations: { items: { item: true } },
    });

    // Transform the data to rename `ticket_item` to `items`
    // return tickets.map((ticket) => ({
    //   ...ticket,
    //   items: ticket.items, // Rename `ticket_item` to `items`
    //   ticket_item: undefined, // Remove the original `ticket_item`
    // }));
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

  async lastId(): Promise<number> {
    const querry = await this.ticketRepo
      .createQueryBuilder()
      .select('max(_id)', 'id')
      .getRawMany();

    if (querry.length > 0) {
      const { id } = querry.pop();

      return id;
    }
    return 0;
  }
}
