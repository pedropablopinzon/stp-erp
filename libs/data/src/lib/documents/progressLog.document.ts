import { Tables } from '../enums/tables';
import { JSONValue } from '../types/util.types';

export class ProgressLogDocument {
  static collectionName = Tables.progress_log;

  id?: number;

  status_id: number;
  created_at: Date;
  created_by: string;
  updated_at?: Date;
  updated_by?: string;

  project_id: number;
  comment: string;
  images_url: JSONValue;
}
