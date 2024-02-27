import { Module } from '@nestjs/common';
import * as multr from 'multer';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [MulterModule.register({
    storage: multr.memoryStorage(),
  }),
    UsersModule, AuthModule, ProductsModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
