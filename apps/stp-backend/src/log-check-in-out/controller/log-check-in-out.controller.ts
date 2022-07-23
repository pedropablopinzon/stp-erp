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
  CreateLogCheckInOutDto,
  UpdateLogCheckInOutDto,
} from '../../dtos/logCheckInOut.dto';
import { LogCheckInOutService } from '../service/log-check-in-out.service';

@Controller('log-check-in-out')
export class LogCheckInOutController {
  constructor(private readonly logCheckInOutService: LogCheckInOutService) {}

  @Get(':id')
  async read(@Req() request: Request, @Param() params) {
    const user = await getUserFromToken(request);
    return this.logCheckInOutService.read(user.uid, params.id);
  }

  @Get()
  async readAll(@Req() request: Request) {
    const user = await getUserFromToken(request);
    return await this.logCheckInOutService.readAll(user.uid);
  }

  @Post()
  async create(
    @Body() payload: CreateLogCheckInOutDto,
    @Req() request: Request
  ) {
    const user = await getUserFromToken(request);
    return this.logCheckInOutService.create(user.uid, payload);
  }

  @Patch(':id')
  async update(
    @Body() payload: UpdateLogCheckInOutDto,
    @Req() request: Request,
    @Param() params
  ) {
    const user = await getUserFromToken(request);
    return this.logCheckInOutService.update(user.uid, params.id, payload);
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Param() params) {
    const user = await getUserFromToken(request);
    return this.logCheckInOutService.delete(user.uid, params.id);
  }
}
