import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Status } from '../entities/status.entity';
import { StatusModule } from '../status/status.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tenant1',
      entities: [Status],
      synchronize: false,
    }),
    StatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
