import { Injectable } from '@nestjs/common';
import { AuthPayloaddDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async ValidateUser({ username, password }: AuthPayloaddDto) {
    const finduser = await this.userService.findUser(username);

    if (!finduser) return null;

    if (password === finduser.password) {
      const { password, ...user } = finduser;
      return this.jwtService.sign(user);
    }
  }
}
