import { Module } from '@nestjs/common';

import JwtHelpersModule from '../helpers/jwt.helpers.module';
import UtilsHelpersModule from '../helpers/utils.helpers.module';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtHelpersModule,
    UtilsHelpersModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
