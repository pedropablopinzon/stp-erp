import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import {
  CreateProgressLogDto,
  UpdateProgressLogDto,
} from '@stp-erp/data';
import { ProgressLogDocument } from '@stp-erp/data';
import { ProgressLog } from '@stp-erp/data';

@Injectable()
export class ProgressLogService {
  constructor(
    @InjectRepository(ProgressLog)
    private progressLogRepository: Repository<ProgressLog>
  ) {}

  async read(uid: string, id: number): Promise<ProgressLogDocument> {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const record: ProgressLog = await this.progressLogRepository.findOneBy({
        id,
      });

      const document: ProgressLogDocument = {
        id: record.id,
        project_id: record.project_id,
        comment: record.comment,
        images_url: record.images_url,
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

  async readAll(uid: string): Promise<ProgressLogDocument[]> {
    try {
      const records: ProgressLog[] = await this.progressLogRepository.find();
      if (records.length === 0) {
        console.log('No matching records.');
        return [];
      }

      const documents: ProgressLogDocument[] = [];

      records.forEach((record: ProgressLog) => {
        const document: ProgressLogDocument = {
          id: record.id,
          project_id: record.project_id,
          comment: record.comment,
          images_url: record.images_url,
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
    data: CreateProgressLogDto
  ): Promise<ProgressLogDocument> {
    const newDoc = {
      ...data,
      created_at: new Date(),
      created_by: uid,
      status_id: 1,
    };

    const record: ProgressLog = await this.progressLogRepository.save(newDoc);

    const document: ProgressLogDocument = {
      id: record.id,
      project_id: record.project_id,
      comment: record.comment,
      images_url: record.images_url,
      created_at: record.created_at,
      created_by: record.created_by,
      status_id: record.status_id,
    };

    return document;
  }

  async update(
    uid: string,
    id: number,
    data: UpdateProgressLogDto
  ): Promise<UpdateResult> {
    try {
      const updateDoc = {
        ...data,
        updated_at: new Date(),
        updated_by: uid,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await this.progressLogRepository.update(id, updateDoc);
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
      return await this.progressLogRepository.delete(id);
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
