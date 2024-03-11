import { Module } from '@nestjs/common';

import JwtHelpersModule from '../helpers/jwt.helpers.module';
import RepoHelpersModule from '../helpers/repo.helpers.module';

import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';

@Module({
  imports: [
    JwtHelpersModule,
    RepoHelpersModule
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService],
})
export class SuppliersModule { }
