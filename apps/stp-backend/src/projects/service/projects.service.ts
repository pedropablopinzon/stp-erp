import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateProjectDto, UpdateProjectDto } from '../../dtos/projects.dto';
import { ProjectDocument } from '../../documents/project.document';
import { Project } from '../../entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private businessesRepository: Repository<Project>
  ) {}

  async read(uid: string, id: number): Promise<ProjectDocument> {
    try {
      const record: Project = await this.businessesRepository.findOneBy({
        id,
      });

      const document: ProjectDocument = {
        id: record.id,
        name: record.name,
        business_id: record.business_id,
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

  async readAll(uid: string): Promise<ProjectDocument[]> {
    try {
      const records: Project[] = await this.businessesRepository.find();
      if (records.length === 0) {
        console.log('No matching records.');
        return [];
      }

      const documents: ProjectDocument[] = [];

      records.forEach((record: Project) => {
        const document: ProjectDocument = {
          id: record.id,
          name: record.name,
          business_id: record.business_id,
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

  async create(uid: string, data: CreateProjectDto): Promise<ProjectDocument> {
    const newDoc = {
      ...data,
      created_at: new Date(),
      created_by: uid,
      status_id: 1,
    };

    const record: Project = await this.businessesRepository.save(newDoc);

    const document: ProjectDocument = {
      id: record.id,
      name: record.name,
      business_id: record.business_id,
      created_at: record.created_at,
      created_by: record.created_by,
      status_id: record.status_id,
    };

    return document;
  }

  async update(
    uid: string,
    id: number,
    data: UpdateProjectDto
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
