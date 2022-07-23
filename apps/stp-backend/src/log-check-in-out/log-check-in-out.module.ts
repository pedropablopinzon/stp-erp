import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LogCheckInOut } from '@stp-erp/data';
import { LogCheckInOutController } from './controller/log-check-in-out.controller';
import { LogCheckInOutService } from './service/log-check-in-out.service';

@Module({
  imports: [TypeOrmModule.forFeature([LogCheckInOut])],
  controllers: [LogCheckInOutController],
  providers: [LogCheckInOutService],
})
export class LogCheckInOutModule {}
