import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { AuthService } from './auth.service';

import { SignInDto } from '../users/users.entity';

@Controller('login')
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @ApiOperation({ summary: 'login' })
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ description: 'Login has been successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  signIn(@Body() signInDto: SignInDto) {
    const { email, password } = signInDto;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required.')
    }
    return this.authService.signIn(signInDto);
  }
}