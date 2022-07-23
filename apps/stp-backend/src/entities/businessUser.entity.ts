import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BusinessUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  business_id: number;

  @Column()
  user_id: string;

  @Column()
  created_at: Date;

  @Column()
  created_by: string;

  @Column()
  status_id: number;

  @Column()
  updated_at: Date;

  @Column()
  updated_by: string;
}
