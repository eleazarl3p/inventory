import { Item } from 'src/item/entities/item.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from './ticket.entity';

@Entity()
export class TicketItem {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  ticket_id: number;

  @Column()
  item_id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Item, (item) => item.ticket_item)
  item: Item;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticket_item)
  ticket: Ticket;
}
