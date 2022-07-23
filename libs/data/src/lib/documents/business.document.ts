import { Tables } from '../enums/tables';

export class BusinessDocument {
  static collectionName = Tables.business;

  id?: number;

  status_id: number;
  created_at: Date;
  created_by: string;
  updated_at?: Date;
  updated_by?: string;

  name: string;
}
