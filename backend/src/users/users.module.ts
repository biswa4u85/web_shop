import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { UtilsService } from '../utils/utils.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UtilsService],
})
export class UsersModule { }
