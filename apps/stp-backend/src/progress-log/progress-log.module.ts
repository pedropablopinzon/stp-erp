import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgressLog } from '@stp-erp/data';
import { ProgressLogController } from './controller/progress-log.controller';
import { ProgressLogService } from './service/progress-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgressLog])],
  controllers: [ProgressLogController],
  providers: [ProgressLogService],
})
export class ProgressLogModule {}
