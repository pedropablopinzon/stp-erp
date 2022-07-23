import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Business {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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
