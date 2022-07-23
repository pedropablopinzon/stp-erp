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
  CreateBusinessUserDto,
  UpdateBusinessUserDto,
} from '../../dtos/businessUser.dto';
import { BusinessUserService } from '../service/business-user.service';

@Controller('business-user')
export class BusinessUserController {
  constructor(private readonly businessUserService: BusinessUserService) {}

  @Get(':id')
  async read(@Req() request: Request, @Param() params) {
    const user = await getUserFromToken(request);
    return this.businessUserService.read(user.uid, params.id);
  }

  @Get()
  async readAll(@Req() request: Request) {
    const user = await getUserFromToken(request);
    return await this.businessUserService.readAll(user.uid);
  }

  @Post()
  async create(
    @Body() payload: CreateBusinessUserDto,
    @Req() request: Request
  ) {
    const user = await getUserFromToken(request);
    return this.businessUserService.create(user.uid, payload);
  }

  @Patch(':id')
  async update(
    @Body() payload: UpdateBusinessUserDto,
    @Req() request: Request,
    @Param() params
  ) {
    const user = await getUserFromToken(request);
    return this.businessUserService.update(user.uid, params.id, payload);
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Param() params) {
    const user = await getUserFromToken(request);
    return this.businessUserService.delete(user.uid, params.id);
  }
}
