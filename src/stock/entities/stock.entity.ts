import { Item } from 'src/item/entities/item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum stockAction {
  INSERTION = 'INSERTION',
  EXTRACTION = 'EXTRACTION',
  CREATION = 'CREATION',
  REVISONIN = 'REVISIONIN',
  REVISONOUT = 'REVISIONOUT',
}

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  _id: number;

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

  @ManyToOne(() => Item, (item) => item.stocks)
  item: Item;

  @Column({ type: 'enum', enum: stockAction })
  s_type: string;

  @CreateDateColumn()
  date: Date;
}
