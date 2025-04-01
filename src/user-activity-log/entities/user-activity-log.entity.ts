import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum userAction {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

@Entity()
export class UserActivityLog {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  username: string;

  @Column({ type: 'enum', enum: userAction })
  action: userAction;

  @Column('json', { nullable: true })
  metadata: Record<string, any>;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  date: Date;
}
