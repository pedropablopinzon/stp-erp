import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import {
  CreateBusinessUserDto,
  UpdateBusinessUserDto,
} from '../../dtos/businessUser.dto';
import { BusinessUserDocument } from '../../documents/businessUser.document';
import { BusinessUser } from '../../entities/businessUser.entity';

@Injectable()
export class BusinessUserService {
  constructor(
    @InjectRepository(BusinessUser)
    private businessUserRepository: Repository<BusinessUser>
  ) {}

  async read(uid: string, id: number): Promise<BusinessUserDocument> {
    try {
      const record: BusinessUser = await this.businessUserRepository.findOneBy({
        id,
      });

      const document: BusinessUserDocument = {
        id: record.id,
        business_id: record.business_id,
        user_id: record.user_id,
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

  async readAll(uid: string): Promise<BusinessUserDocument[]> {
    try {
      const records: BusinessUser[] = await this.businessUserRepository.find();
      if (records.length === 0) {
        console.log('No matching records.');
        return [];
      }

      const documents: BusinessUserDocument[] = [];

      records.forEach((record: BusinessUser) => {
        const document: BusinessUserDocument = {
          id: record.id,
          business_id: record.business_id,
          user_id: record.user_id,
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
    data: CreateBusinessUserDto
  ): Promise<BusinessUserDocument> {
    const newDoc = {
      ...data,
      created_at: new Date(),
      created_by: uid,
      status_id: 1,
    };

    const record: BusinessUser = await this.businessUserRepository.save(newDoc);

    const document: BusinessUserDocument = {
      id: record.id,
      business_id: record.business_id,
      user_id: record.user_id,
      created_at: record.created_at,
      created_by: record.created_by,
      status_id: record.status_id,
    };

    return document;
  }

  async update(
    uid: string,
    id: number,
    data: UpdateBusinessUserDto
  ): Promise<UpdateResult> {
    try {
      const updateDoc = {
        ...data,
        updated_at: new Date(),
        updated_by: uid,
      };

      return await this.businessUserRepository.update(id, updateDoc);
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
      return await this.businessUserRepository.delete(id);
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
