import { Tables } from '../enums/tables';

export class StatusDocument {
  static collectionName = Tables.status;

  id?: number;

  name: string;
}
