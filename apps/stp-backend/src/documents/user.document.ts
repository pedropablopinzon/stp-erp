import { Tables } from '../enums/tables';

export class UserDocument {
  static collectionName = Tables.user;

  id?: string;

  status_id: number;
  created_at: Date;
  created_by: string;
  updated_at?: Date;
  updated_by?: string;

  display_name: string;
}
