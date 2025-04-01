import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { UserModule } from 'src/user/user.module';
import { UserActivityLogModule } from 'src/user-activity-log/user-activity-log.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item]),
    UserModule,
    UserActivityLogModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
