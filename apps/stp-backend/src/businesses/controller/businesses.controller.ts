import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { getUserFromToken } from '../../auth/auth';
import { CreateBusinessDto, UpdateBusinessDto } from '../../dtos/businesses.dto';
import { BusinessesService } from '../service/businesses.service';

@Controller('businesses')
export class BusinessesController {
  constructor(private readonly businessesService: BusinessesService) {}

  @Get(':id')
  async read(@Req() request: Request, @Param() params) {
    const user = await getUserFromToken(request);
    return this.businessesService.read(user.uid, params.id);
  }

  @Get()
  async readAll(
    @Req() request: Request,
  ) {
    const user = await getUserFromToken(request);
    return await this.businessesService.readAll(user.uid);
  }

  @Post()
  async create(@Body() payload: CreateBusinessDto, @Req() request: Request) {
    const user = await getUserFromToken(request);
    return this.businessesService.create(user.uid, payload);
  }

  @Patch(':id')
  async update(
    @Body() payload: UpdateBusinessDto,
    @Req() request: Request,
    @Param() params
  ) {
    const user = await getUserFromToken(request);
    return this.businessesService.update(user.uid, params.id, payload);
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Param() params) {
    const user = await getUserFromToken(request);
    return this.businessesService.delete(user.uid, params.id);
  }
}
