import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1 style="color:#929292; text-align: center;">INVENTORY API V1</h1>';
  }
}
