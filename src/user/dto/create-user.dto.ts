import { IsEnum, IsString } from 'class-validator';
import { UserLevel } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(UserLevel)
  level: UserLevel;
}
