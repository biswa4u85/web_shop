import { Module } from '@nestjs/common';

import JwtHelpersModule from '../helpers/jwt.helpers.module';
import BcryptHelpersModule from '../helpers/bcrypt.helpers.module';
import RepoHelpersModule from '../helpers/repo.helpers.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    JwtHelpersModule,
    BcryptHelpersModule,
    RepoHelpersModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }
