import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExpenseRecord } from '@stp-erp/data';
import { ExpenseRecordController } from './controller/expense-record.controller';
import { ExpenseRecordService } from './service/expense-record.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseRecord])],
  controllers: [ExpenseRecordController],
  providers: [ExpenseRecordService],
})
export class ExpenseRecordModule {}
