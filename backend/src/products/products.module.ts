import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

import { JwtService } from '../utils/jwt.service';
import { UtilsService } from '../utils/utils.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, JwtService, UtilsService],
})
export class ProductsModule { }
