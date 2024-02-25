import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UtilsService } from '../utils/utils.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UtilsService],
})
export class AuthModule { }
