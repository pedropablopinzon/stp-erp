import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BusinessUserController } from './controller/business-user.controller';
import { BusinessUserService } from './service/business-user.service';
import { BusinessUser } from '../entities/businessUser.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessUser])],
  controllers: [BusinessUserController],
  providers: [BusinessUserService],
})
export class BusinessUserModule {}
