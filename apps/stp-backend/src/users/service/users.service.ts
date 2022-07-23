import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from '@stp-erp/data';
import { UserDocument } from '@stp-erp/data';
import { User } from '@stp-erp/data';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private UseresRepository: Repository<User>
  ) {}

  async read(uid: string, id: string): Promise<UserDocument> {
    try {
      const record: User = await this.UseresRepository.findOneBy({
        id,
      });

      const document: UserDocument = {
        id: record.id,
        display_name: record.display_name,
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

  async readAll(uid: string): Promise<UserDocument[]> {
    try {
      const records: User[] = await this.UseresRepository.find();
      if (records.length === 0) {
        console.log('No matching records.');
        return [];
      }

      const documents: UserDocument[] = [];

      records.forEach((record: User) => {
        const document: UserDocument = {
          id: record.id,
          display_name: record.display_name,
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

  async create(uid: string, data: CreateUserDto): Promise<UserDocument> {
    const newDoc = {
      ...data,
      created_at: new Date(),
      created_by: uid,
      status_id: 1,
    };

    const record: User = await this.UseresRepository.save(newDoc);

    const document: UserDocument = {
      id: record.id,
      display_name: record.display_name,
      created_at: record.created_at,
      created_by: record.created_by,
      status_id: record.status_id,
    };

    return document;
  }

  async update(
    uid: string,
    id: string,
    data: UpdateUserDto
  ): Promise<UpdateResult> {
    try {
      const updateDoc = {
        ...data,
        updated_at: new Date(),
        updated_by: uid,
      };

      return await this.UseresRepository.update(id, updateDoc);
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
      return await this.UseresRepository.delete(id);
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
