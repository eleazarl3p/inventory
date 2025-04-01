import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserLevel {
  LOW = 'LOW',
  MID = 'MEDIUM',
  HIGHT = 'HIGH',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserLevel, default: UserLevel.LOW })
  level: UserLevel;
}
