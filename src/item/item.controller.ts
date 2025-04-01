import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ForbiddenException,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto, ValidateListItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { UserService } from 'src/user/user.service';
import { UserActivityLogService } from 'src/user-activity-log/user-activity-log.service';
import { userAction } from 'src/user-activity-log/entities/user-activity-log.entity';

@Controller('item')
export class ItemController {
  constructor(
    private readonly itemService: ItemService,

    private readonly userService: UserService,

    private readonly userActivityLogService: UserActivityLogService,
  ) {}

  @Post()
  async create(@Body() createItemDto: CreateItemDto) {
    const user = await this.userService.findOne(1);
    if (user) {
      const newItem = await this.itemService.create(createItemDto, user);

      this.userActivityLogService.create(user, userAction.CREATE, {
        item: { name: newItem.name, id: newItem._id },
      });
    } else {
      throw new ForbiddenException('Not authorized user');
    }
  }

  @Post('/from-file')
  async createMultipleItems(
    @Body(new ValidateListItemDto()) itemsDto: CreateItemDto[],
  ) {
    const user = await this.userService.findOne(1);
    if (user) {
      const result = await this.itemService.createMultipleItem(itemsDto, user);
      const items = result.map((itm) => {
        return { name: itm.name, id: itm._id };
      });
      this.userActivityLogService.create(user, userAction.CREATE, {
        items: items,
      });
    } else {
      throw new ForbiddenException('Not authorized user');
    }
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Put()
  updateMultiple(
    @Body(new ValidateListItemDto()) updateItemDto: UpdateItemDto[],
  ) {
    return this.itemService.updateMultiple(updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
