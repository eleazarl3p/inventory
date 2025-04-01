import { IsString } from 'class-validator';

export class AuthPayloaddDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
