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
  REVISON = 'REVISION',
}

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Item, (item) => item.stocks)
  item: Item;

  @Column({ type: 'enum', enum: stockAction })
  action: string;

  @CreateDateColumn()
  date: Date;
}
