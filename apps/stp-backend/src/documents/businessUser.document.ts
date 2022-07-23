import { Tables } from '../enums/tables';

export class BusinessUserDocument {
  static collectionName = Tables.business_user;

  id?: number;

  status_id: number;
  created_at: Date;
  created_by: string;
  updated_at?: Date;
  updated_by?: string;

  business_id: number;
  user_id: string;
}
