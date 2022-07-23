import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Business } from '@stp-erp/data';
import { BusinessesController } from './controller/businesses.controller';
import { BusinessesService } from './service/businesses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Business])],
  controllers: [BusinessesController],
  providers: [BusinessesService],
})
export class BusinessesModule {}
