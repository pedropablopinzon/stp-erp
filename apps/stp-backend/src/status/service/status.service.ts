import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateStatusDto, UpdateStatusDto } from '../../dtos/status.dto';
import { StatusDocument } from '../../documents/status.document';
import { Status } from '../../entities/status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>
  ) {}

  async read(id: number): Promise<StatusDocument> {
    try {
      const record: Status = await this.statusRepository.findOneBy({ id });

      const document: StatusDocument = {
        id: record.id,
        name: record.name,
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

  async readAll(): Promise<StatusDocument[]> {
    try {
      const records: Status[] = await this.statusRepository.find();
      if (records.length === 0) {
        console.log('No matching records.');
        return [];
      }

      const documents: StatusDocument[] = [];

      records.forEach((record: Status) => {
        const document: StatusDocument = {
          id: record.id,
          name: record.name,
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

  async create(data: CreateStatusDto): Promise<StatusDocument> {
    const record: Status = await this.statusRepository.save(data);

    const document: StatusDocument = {
      id: record.id,
      name: record.name,
    };

    return document;
  }

  async update(id: number, data: UpdateStatusDto): Promise<UpdateResult> {
    try {
      return await this.statusRepository.update(id, data);
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

  async delete(id: number): Promise<DeleteResult> {
    try {
      return await this.statusRepository.delete(id);
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
