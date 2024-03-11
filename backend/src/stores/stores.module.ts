import { Module } from '@nestjs/common';

import JwtHelpersModule from '../helpers/jwt.helpers.module';
import RepoHelpersModule from '../helpers/repo.helpers.module';

import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';

@Module({
  imports: [
    JwtHelpersModule,
    RepoHelpersModule
  ],
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule { }
