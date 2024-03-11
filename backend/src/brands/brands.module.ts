import { Module } from '@nestjs/common';

import JwtHelpersModule from '../helpers/jwt.helpers.module';
import RepoHelpersModule from '../helpers/repo.helpers.module';

import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

@Module({
  imports: [
    JwtHelpersModule,
    RepoHelpersModule
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule { }
