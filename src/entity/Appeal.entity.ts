import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AppealStatus } from '../enums/AppealStatus.enum';

@Entity()
export class Appeal {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  subject!: string;

  @Column()
  text!: string;

  @Column({
    type: process.env.NODE_ENV === 'test' ? 'simple-enum' : 'enum',
    enum: AppealStatus,
    default: AppealStatus.NEW,
  })
  status!: AppealStatus;

  @Column({ nullable: true })
  solutionText?: string;

  @Column({ nullable: true })
  cancelReason?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}