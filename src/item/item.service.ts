import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) {}
  async create(createItemDto: CreateItemDto) {
    const newItem = this.itemRepo.create(createItemDto);

    return await this.itemRepo.save(newItem);
  }

  async createMultipleItem(itemsDto: CreateItemDto[]) {
    const result = await Promise.all(
      itemsDto.map(async (item) => {
        return await this.create(item);
      }),
    );

    return result;
  }

  async findAll() {
    return await this.itemRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
