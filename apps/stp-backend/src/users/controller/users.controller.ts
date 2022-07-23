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
import { CreateUserDto, UpdateUserDto } from '../../dtos/users.dto';
import { UsersService } from '../service/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async read(@Req() request: Request, @Param() params) {
    const user = await getUserFromToken(request);
    return this.usersService.read(user.uid, params.id);
  }

  @Get()
  async readAll(@Req() request: Request) {
    const user = await getUserFromToken(request);
    return await this.usersService.readAll(user.uid);
  }

  @Post()
  async create(@Body() payload: CreateUserDto, @Req() request: Request) {
    const user = await getUserFromToken(request);
    return this.usersService.create(user.uid, payload);
  }

  @Patch(':id')
  async update(
    @Body() payload: UpdateUserDto,
    @Req() request: Request,
    @Param() params
  ) {
    const user = await getUserFromToken(request);
    return this.usersService.update(user.uid, params.id, payload);
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Param() params) {
    const user = await getUserFromToken(request);
    return this.usersService.delete(user.uid, params.id);
  }
}
