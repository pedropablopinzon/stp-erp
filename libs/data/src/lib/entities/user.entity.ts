import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  display_name: string;

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
