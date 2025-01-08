import { Controller, Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketService } from 'src/ticket/ticket.service';
import { ticketStatus } from 'src/ticket/entities/ticket.entity';
import { Item } from 'src/item/entities/item.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepo: Repository<Stock>,

    private readonly ticketService: TicketService,
  ) {}

  async create(dto: CreateStockDto) {
    try {
      const newStock = this.stockRepo.create({
        quantity: dto.quantity,
        s_type: dto.s_type,
        item: { _id: dto.item_id } as Item,
      });
      await this.stockRepo.save(newStock);
    } catch (error) {
      console.log(error);
    }
  }

  async addMultipleStodk(ticket_id: number, createStockDto: CreateStockDto[]) {
    for (const dto of createStockDto) {
      await this.create(dto);
    }

    await this.ticketService.updateStatus(ticket_id, ticketStatus.PROCESSED);
    return 'This action adds a new stock';
  }

  async findAll() {
    return this.stockRepo.find({ relations: { item: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
