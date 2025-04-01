import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TicketItem } from './ticket-item.entity';
import { User } from 'src/user/entities/user.entity';

export enum ticketType {
  PURCHASE = 'PURCHASE',
  DISPATCH = 'DISPATCH',
}

export enum ticketStatus {
  GENERATED = 'GENERATED',
  INPROGRESS = 'INPROGRESS',
  PROCESSED = 'PROCESSED',
}
@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ nullable: true })
  barcode: string;

  @Column({ type: 'enum', enum: ticketStatus, default: ticketStatus.GENERATED })
  status: string;

  @Column({ type: 'enum', enum: ticketType })
  ttype: string;

  @CreateDateColumn()
  date: Date;

  @OneToMany(() => TicketItem, (ti) => ti.ticket)
  items: TicketItem[];

  @ManyToOne(() => User)
  user: User;
}
