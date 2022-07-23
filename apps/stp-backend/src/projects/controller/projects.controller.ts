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

import { CreateProjectDto, UpdateProjectDto } from '@stp-erp/data';
import { getUserFromToken } from '../../auth/auth';
import { ProjectsService } from '../service/projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get(':id')
  async read(@Req() request: Request, @Param() params) {
    const user = await getUserFromToken(request);
    return this.projectsService.read(user.uid, params.id);
  }

  @Get()
  async readAll(@Req() request: Request) {
    const user = await getUserFromToken(request);
    return await this.projectsService.readAll(user.uid);
  }

  @Post()
  async create(@Body() payload: CreateProjectDto, @Req() request: Request) {
    const user = await getUserFromToken(request);
    return this.projectsService.create(user.uid, payload);
  }

  @Patch(':id')
  async update(
    @Body() payload: UpdateProjectDto,
    @Req() request: Request,
    @Param() params
  ) {
    const user = await getUserFromToken(request);
    return this.projectsService.update(user.uid, params.id, payload);
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Param() params) {
    const user = await getUserFromToken(request);
    return this.projectsService.delete(user.uid, params.id);
  }
}
