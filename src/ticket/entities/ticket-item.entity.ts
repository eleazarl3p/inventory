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

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: {
      to: (value: number) => value, // Save as is (number)
      from: (value: string) => parseFloat(value), // Convert to number
    },
  })
  quantity: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: {
      to: (value: number) => value, // Save as is (number)
      from: (value: string) => parseFloat(value), // Convert to number
    },
  })
  price: number;

  @ManyToOne(() => Item, (item) => item.ticket_item)
  item: Item;

  @ManyToOne(() => Ticket, (ticket) => ticket.items)
  ticket: Ticket;
}
