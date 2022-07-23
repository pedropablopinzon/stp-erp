import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { JSONValue } from '../types/util.types';

@Entity()
export class ProgressLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project_id: number;

  @Column()
  comment: string;

  @Column({ type: 'json' })
  images_url: JSONValue;

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
