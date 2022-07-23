import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExpenseRecordController } from './controller/expense-record.controller';
import { ExpenseRecordService } from './service/expense-record.service';
import { ExpenseRecord } from '../entities/expenseRecord.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExpenseRecord])],
  controllers: [ExpenseRecordController],
  providers: [ExpenseRecordService],
})
export class ExpenseRecordModule {}
