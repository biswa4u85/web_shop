import { Module } from '@nestjs/common';

import JwtHelpersModule from '../helpers/jwt.helpers.module';
import UtilsHelpersModule from '../helpers/utils.helpers.module';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    JwtHelpersModule,
    UtilsHelpersModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
