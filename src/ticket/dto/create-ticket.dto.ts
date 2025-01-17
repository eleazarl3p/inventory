import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ticketType } from '../entities/ticket.entity';
import { CreateTicketItemDto } from './create-ticket-item.dto';
import { Type } from 'class-transformer';

export class CreateTicketDto {
  @IsEnum(ticketType)
  ttype: ticketType;

  @IsOptional()
  @IsString()
  barcode: string;

  @ValidateNested({ each: true })
  @Type(() => CreateTicketItemDto)
  items: CreateTicketItemDto[];
}
