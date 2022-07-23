import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BusinessesController } from './controller/businesses.controller';
import { BusinessesService } from './service/businesses.service';
import { Business } from '../entities/business.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Business])],
  controllers: [BusinessesController],
  providers: [BusinessesService],
})
export class BusinessesModule {}
