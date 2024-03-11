import { Module } from '@nestjs/common';

import JwtHelpersModule from '../helpers/jwt.helpers.module';
import RepoHelpersModule from '../helpers/repo.helpers.module';

import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';

@Module({
  imports: [
    JwtHelpersModule,
    RepoHelpersModule
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule { }
