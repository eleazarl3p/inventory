import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) {}
  async create(createItemDto: CreateItemDto, user: User) {
    try {
      const newItem = this.itemRepo.create({
        ...createItemDto,
        user: { _id: user._id } as User,
      });
      return await this.itemRepo.save(newItem);
    } catch (error) {
      console.log('error : ', error);
    }
  }

  async createMultipleItem(
    itemsDto: CreateItemDto[],
    user: User,
  ): Promise<Item[]> {
    const result = await Promise.all(
      itemsDto.map(async (item) => {
        return await this.create(item, user);
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

  async update(_id: number, updateItemDto: UpdateItemDto) {
    return this.itemRepo.update({ _id }, updateItemDto);
  }
  async updateMultiple(updateItemDto: UpdateItemDto[]) {
    const result = await Promise.all(
      updateItemDto.map(async (item) => {
        const { _id } = item;
        return await this.update(_id, item);
      }),
    );
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
