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

import { CreateProgressLogDto, UpdateProgressLogDto } from '@stp-erp/data';
import { getUserFromToken } from '../../auth/auth';
import { ProgressLogService } from '../service/progress-log.service';

@Controller('progress-log')
export class ProgressLogController {
  constructor(private readonly progressLogService: ProgressLogService) {}

  @Get(':id')
  async read(@Req() request: Request, @Param() params) {
    const user = await getUserFromToken(request);
    return this.progressLogService.read(user.uid, params.id);
  }

  @Get()
  async readAll(@Req() request: Request) {
    const user = await getUserFromToken(request);
    return await this.progressLogService.readAll(user.uid);
  }

  @Post()
  async create(@Body() payload: CreateProgressLogDto, @Req() request: Request) {
    const user = await getUserFromToken(request);
    return this.progressLogService.create(user.uid, payload);
  }

  @Patch(':id')
  async update(
    @Body() payload: UpdateProgressLogDto,
    @Req() request: Request,
    @Param() params
  ) {
    const user = await getUserFromToken(request);
    return this.progressLogService.update(user.uid, params.id, payload);
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Param() params) {
    const user = await getUserFromToken(request);
    return this.progressLogService.delete(user.uid, params.id);
  }
}
