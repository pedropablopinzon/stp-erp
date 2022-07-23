import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { getUserFromToken } from '../../auth/auth';
import {
  CreateExpenseRecordDto,
  UpdateExpenseRecordDto,
} from '../../dtos/expenseRecord.dto';
import { ExpenseRecordService } from '../service/expense-record.service';

@Controller('expense-record')
export class ExpenseRecordController {
  constructor(private readonly expenseRecordService: ExpenseRecordService) {}

  @Get(':id')
  async read(@Req() request: Request, @Param() params) {
    const user = await getUserFromToken(request);
    return this.expenseRecordService.read(user.uid, params.id);
  }

  @Get()
  async readAll(@Req() request: Request) {
    const user = await getUserFromToken(request);
    return await this.expenseRecordService.readAll(user.uid);
  }

  @Post()
  async create(
    @Body() payload: CreateExpenseRecordDto,
    @Req() request: Request
  ) {
    const user = await getUserFromToken(request);
    return this.expenseRecordService.create(user.uid, payload);
  }

  @Patch(':id')
  async update(
    @Body() payload: UpdateExpenseRecordDto,
    @Req() request: Request,
    @Param() params
  ) {
    const user = await getUserFromToken(request);
    return this.expenseRecordService.update(user.uid, params.id, payload);
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Param() params) {
    const user = await getUserFromToken(request);
    return this.expenseRecordService.delete(user.uid, params.id);
  }
}
