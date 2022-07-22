import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStatusDto, UpdateStatusDto } from '../../dtos/status.dto';
import { Status } from '../status.entity';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private usersRepository: Repository<Status>
  ) {}

  findAll(): Promise<Status[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<Status> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(data: CreateStatusDto): Promise<void> {
    await this.usersRepository.save(data);
  }

  async update(id: number, data: UpdateStatusDto): Promise<void> {
    await this.usersRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
