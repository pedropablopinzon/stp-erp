import { Tables } from '../enums/tables';

export class LogCheckInOutDocument {
  static collectionName = Tables.business;

  id?: number;

  status_id: number;
  created_at: Date;
  created_by: string;
  updated_at?: Date;
  updated_by?: string;

  project_id: number;
  user_id: string;
  check_in_at: Date;
  check_out_at?: Date;
}
