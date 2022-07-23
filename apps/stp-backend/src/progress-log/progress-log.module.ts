import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgressLogController } from './controller/progress-log.controller';
import { ProgressLogService } from './service/progress-log.service';
import { ProgressLog } from '../entities/progressLog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgressLog])],
  controllers: [ProgressLogController],
  providers: [ProgressLogService],
})
export class ProgressLogModule {}
