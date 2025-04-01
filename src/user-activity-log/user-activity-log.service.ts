import { Injectable } from '@nestjs/common';
import { CreateUserActivityLogDto } from './dto/create-user-activity-log.dto';
import { UpdateUserActivityLogDto } from './dto/update-user-activity-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  userAction,
  UserActivityLog,
} from './entities/user-activity-log.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UserActivityLogService {
  constructor(
    @InjectRepository(UserActivityLog)
    private readonly userLogRepo: Repository<UserActivityLog>,
  ) {}
  async create(user: User, action: userAction, metadata: Record<string, any>) {
    console.log(metadata);
    const log = this.userLogRepo.create({
      action,
      metadata,
      username: user.username,
      user: { _id: user._id } as User,
    });
    return await this.userLogRepo.save(log);
  }

  findAll() {
    return `This action returns all userActivityLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userActivityLog`;
  }

  update(id: number, updateUserActivityLogDto: UpdateUserActivityLogDto) {
    return `This action updates a #${id} userActivityLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} userActivityLog`;
  }
}
