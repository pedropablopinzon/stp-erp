import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import {
  CreateBusinessDto,
  UpdateBusinessDto,
} from '../../dtos/businesses.dto';
import { BusinessDocument } from '../../documents/business.document';
import { Business } from '../../entities/business.entity';

@Injectable()
export class BusinessesService {
  constructor(
    @InjectRepository(Business)
    private businessesRepository: Repository<Business>
  ) {}

  async read(uid: string, id: number): Promise<BusinessDocument> {
    try {
      const record: Business = await this.businessesRepository.findOneBy({
        id,
      });

      const document: BusinessDocument = {
        id: record.id,
        name: record.name,
        created_at: record.created_at,
        created_by: record.created_by,
        status_id: record.status_id,
        updated_at: record.updated_at,
        updated_by: record.updated_by,
      };

      return document;
    } catch (err) {
      throw new HttpException(
        {
          status: err.response.status ?? HttpStatus.FORBIDDEN,
          error: err.response.error ?? 'read',
        },
        HttpStatus.FORBIDDEN
      );
    }
  }

  async readAll(uid: string): Promise<BusinessDocument[]> {
    try {
      const records: Business[] = await this.businessesRepository.find();
      if (records.length === 0) {
        console.log('No matching records.');
        return [];
      }

      const documents: BusinessDocument[] = [];

      records.forEach((record: Business) => {
        const document: BusinessDocument = {
          id: record.id,
          name: record.name,
          created_at: record.created_at,
          created_by: record.created_by,
          status_id: record.status_id,
          updated_at: record.updated_at,
          updated_by: record.updated_by,
        };

        documents.push(document);
      });

      return documents;
    } catch (err) {
      throw new HttpException(
        {
          status: err.response.status ?? HttpStatus.FORBIDDEN,
          error: err.response.error ?? 'readAll',
        },
        HttpStatus.FORBIDDEN
      );
    }
  }

  async create(
    uid: string,
    data: CreateBusinessDto
  ): Promise<BusinessDocument> {
    const newDoc = {
      ...data,
      created_at: new Date(),
      created_by: uid,
      status_id: 1,
    };

    const record: Business = await this.businessesRepository.save(newDoc);

    const document: BusinessDocument = {
      id: record.id,
      name: record.name,
      created_at: record.created_at,
      created_by: record.created_by,
      status_id: record.status_id,
    };

    return document;
  }

  async update(
    uid: string,
    id: number,
    data: UpdateBusinessDto
  ): Promise<UpdateResult> {
    try {
      const updateDoc = {
        ...data,
        updated_at: new Date(),
        updated_by: uid,
      };

      return await this.businessesRepository.update(id, updateDoc);
    } catch (err) {
      throw new HttpException(
        {
          status: err.response.status ?? HttpStatus.FORBIDDEN,
          error: err.response.error ?? 'update',
        },
        HttpStatus.FORBIDDEN
      );
    }
  }

  async delete(uid: string, id: number): Promise<DeleteResult> {
    try {
      return await this.businessesRepository.delete(id);
    } catch (err) {
      throw new HttpException(
        {
          status: err.response.status ?? HttpStatus.FORBIDDEN,
          error: err.response.error ?? 'delete',
        },
        HttpStatus.FORBIDDEN
      );
    }
  }
}
