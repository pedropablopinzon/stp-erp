import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';

import { CreateStatusDto, UpdateStatusDto } from '../../dtos/status.dto';
import { StatusService } from '../service/status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get(':id')
  async read(@Req() request: Request, @Param() params) {
    return this.statusService.findOne(parseInt(params.id));
  }

  @Get()
  async readAll(
    @Req() request: Request,
    @Query('businessId') businessId: string
  ) {
    return await this.statusService.findAll();
  }

  @Post()
  async create(@Body() payload: CreateStatusDto, @Req() request: Request) {
    return this.statusService.create(payload);
  }

  @Patch(':id')
  async update(
    @Body() payload: UpdateStatusDto,
    @Req() request: Request,
    @Param() params
  ) {
    return this.statusService.update(params.id, payload);
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Param() params) {
    return this.statusService.delete(parseInt(params.id));
  }
}
