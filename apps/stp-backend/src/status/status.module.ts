import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StatusController } from './controller/status.controller';
import { StatusService } from './service/status.service';
import { Status } from '../entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}