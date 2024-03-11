import { Module } from '@nestjs/common';

import JwtHelpersModule from '../helpers/jwt.helpers.module';
import RepoHelpersModule from '../helpers/repo.helpers.module';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [
    JwtHelpersModule,
    RepoHelpersModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule { }
