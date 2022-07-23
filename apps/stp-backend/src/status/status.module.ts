import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Status } from '@stp-erp/data';
import { StatusController } from './controller/status.controller';
import { StatusService } from './service/status.service';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}