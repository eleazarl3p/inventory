import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userRepo.create(createUserDto);
      return await this.userRepo.save(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOne(_id: number) {
    return await this.userRepo.findOne({ where: { _id } });
  }

  async findUser(username: string): Promise<User> {
    return await this.userRepo.findOne({
      where: { username },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
