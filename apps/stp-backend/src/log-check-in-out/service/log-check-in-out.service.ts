import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateLogCheckInOutDto, UpdateLogCheckInOutDto } from '@stp-erp/data';
import { LogCheckInOutDocument } from '@stp-erp/data';
import { LogCheckInOut } from '@stp-erp/data';

@Injectable()
export class LogCheckInOutService {
  constructor(
    @InjectRepository(LogCheckInOut)
    private businessesRepository: Repository<LogCheckInOut>
  ) {}

  async read(uid: string, id: number): Promise<LogCheckInOutDocument> {
    try {
      const record: LogCheckInOut = await this.businessesRepository.findOneBy({
        id,
      });

      const document: LogCheckInOutDocument = {
        id: record.id,
        project_id: record.project_id,
        user_id: record.user_id,
        check_in_at: record.check_in_at,
        check_out_at: record.check_out_at,
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

  async readAll(uid: string): Promise<LogCheckInOutDocument[]> {
    try {
      const records: LogCheckInOut[] = await this.businessesRepository.find();
      if (records.length === 0) {
        console.log('No matching records.');
        return [];
      }

      const documents: LogCheckInOutDocument[] = [];

      records.forEach((record: LogCheckInOut) => {
        const document: LogCheckInOutDocument = {
          id: record.id,
          project_id: record.project_id,
          user_id: record.user_id,
          check_in_at: record.check_in_at,
          check_out_at: record.check_out_at,
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
    data: CreateLogCheckInOutDto
  ): Promise<LogCheckInOutDocument> {
    const newDoc = {
      ...data,
      created_at: new Date(),
      created_by: uid,
      status_id: 1,
    };

    const record: LogCheckInOut = await this.businessesRepository.save(newDoc);

    const document: LogCheckInOutDocument = {
      id: record.id,
      project_id: record.project_id,
      user_id: record.user_id,
      check_in_at: record.check_in_at,
      check_out_at: record.check_out_at,
      created_at: record.created_at,
      created_by: record.created_by,
      status_id: record.status_id,
    };

    return document;
  }

  async update(
    uid: string,
    id: number,
    data: UpdateLogCheckInOutDto
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
