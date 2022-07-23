import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LogCheckInOutController } from './controller/log-check-in-out.controller';
import { LogCheckInOutService } from './service/log-check-in-out.service';
import { LogCheckInOut } from '../entities/logCheckInOut.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogCheckInOut])],
  controllers: [LogCheckInOutController],
  providers: [LogCheckInOutService],
})
export class LogCheckInOutModule {}
