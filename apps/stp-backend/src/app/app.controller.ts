import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post()
  addData() {
    return this.appService.addData();
  }

  @Patch(':id')
  updateData(@Param() params, @Body() data) {
    return this.appService.updateData(params.id, data);
  }

  @Delete(':id')
  deleteData(@Param() params) {
    return this.appService.deleteData(params.id);
  }
}
