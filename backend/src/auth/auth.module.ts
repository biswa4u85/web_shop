import { Module } from '@nestjs/common';

import RepoHelpersModule from "../helpers/repo.helpers.module";
import BcryptHelpersModule from "../helpers/bcrypt.helpers.module";
import JwtHelpersModule from "../helpers/jwt.helpers.module";

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    BcryptHelpersModule,
    RepoHelpersModule,
    JwtHelpersModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
