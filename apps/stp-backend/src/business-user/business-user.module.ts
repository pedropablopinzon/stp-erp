import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BusinessUser } from '@stp-erp/data';
import { BusinessUserController } from './controller/business-user.controller';
import { BusinessUserService } from './service/business-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([BusinessUser])],
  controllers: [BusinessUserController],
  providers: [BusinessUserService],
})
export class BusinessUserModule {}
