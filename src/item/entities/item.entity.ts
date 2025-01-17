import { Stock } from 'src/stock/entities/stock.entity';
import { TicketItem } from 'src/ticket/entities/ticket-item.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum itemCat {
  HARDWARE = 'HARDWARE',
  ELECTRONICS = 'ELECTRONICS',
  OTHER = 'OTHER',
}
@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  barcode: string;

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
  min_quantity: number;

  @Column()
  unit_of_measure: string;

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
  purchase_price: number;

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
  sale_price: number;

  @Column('text', { array: true })
  photos: string[];

  @Column({ type: 'enum', enum: itemCat, default: itemCat.OTHER })
  category: string;

  @Column()
  description: string;

  @OneToMany(() => Stock, (stock) => stock.item)
  stocks: Stock[];

  @OneToMany(() => TicketItem, (ticket) => ticket.item)
  ticket_item: TicketItem[];
}
