import { Module } from '@nestjs/common';

import JwtHelpersModule from '../helpers/jwt.helpers.module';
import UtilsHelpersModule from '../helpers/utils.helpers.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    JwtHelpersModule,
    UtilsHelpersModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
