import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateExpenseRecordDto, UpdateExpenseRecordDto } from '@stp-erp/data';
import { ExpenseRecordDocument } from '@stp-erp/data';
import { ExpenseRecord } from '@stp-erp/data';

@Injectable()
export class ExpenseRecordService {
  constructor(
    @InjectRepository(ExpenseRecord)
    private expenseRecordRepository: Repository<ExpenseRecord>
  ) {}

  async read(uid: string, id: number): Promise<ExpenseRecordDocument> {
    try {
      const record: ExpenseRecord =
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        await this.expenseRecordRepository.findOneBy({ id });

      const document: ExpenseRecordDocument = {
        id: record.id,
        project_id: record.project_id,
        comment: record.comment,
        amount: record.amount,
        expected_amount: record.expected_amount,
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

  async readAll(uid: string): Promise<ExpenseRecordDocument[]> {
    try {
      const records: ExpenseRecord[] =
        await this.expenseRecordRepository.find();
      if (records.length === 0) {
        console.log('No matching records.');
        return [];
      }

      const documents: ExpenseRecordDocument[] = [];

      records.forEach((record: ExpenseRecord) => {
        const document: ExpenseRecordDocument = {
          id: record.id,
          project_id: record.project_id,
          comment: record.comment,
          amount: record.amount,
          expected_amount: record.expected_amount,
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
    data: CreateExpenseRecordDto
  ): Promise<ExpenseRecordDocument> {
    const newDoc = {
      ...data,
      created_at: new Date(),
      created_by: uid,
      status_id: 1,
    };

    const record: ExpenseRecord = await this.expenseRecordRepository.save(
      newDoc
    );

    const document: ExpenseRecordDocument = {
      id: record.id,
      project_id: record.project_id,
      comment: record.comment,
      amount: record.amount,
      expected_amount: record.expected_amount,
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
    data: UpdateExpenseRecordDto
  ): Promise<UpdateResult> {
    try {
      const updateDoc = {
        ...data,
        updated_at: new Date(),
        updated_by: uid,
      };
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return await this.expenseRecordRepository.update(id, updateDoc);
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
      return await this.expenseRecordRepository.delete(id);
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
