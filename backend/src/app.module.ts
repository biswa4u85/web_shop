import { Module } from '@nestjs/common';
import * as multr from 'multer';
import { MulterModule } from '@nestjs/platform-express';

import { AppController } from './app.controller';

import { modules } from './modules.export';

import { AppService } from './app.service';

@Module({
  imports: [
    MulterModule.register({
      storage: multr.memoryStorage(),
    }),
    ...modules
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
