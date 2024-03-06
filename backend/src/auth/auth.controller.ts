import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthService } from './auth.service';
import { AuthDto } from './index.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @ApiOperation({ summary: 'login' })
  @ApiBody({ type: AuthDto })
  @ApiOkResponse({ description: 'Login has been successfully' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}