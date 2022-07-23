import { Tables } from '../enums/tables';

export class ProjectDocument {
  static collectionName = Tables.project;

  id?: number;

  status_id: number;
  created_at: Date;
  created_by: string;
  updated_at?: Date;
  updated_by?: string;

  name: string;
  business_id: number;
}
