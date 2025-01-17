import { Type } from 'class-transformer';
import { IsNumber, IsObject, ValidateNested } from 'class-validator';
import { CreateItemDto } from 'src/item/dto/create-item.dto';

export class CreateTicketItemDto {
  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @ValidateNested()
  @Type(() => CreateItemDto)
  item: CreateItemDto;
}
