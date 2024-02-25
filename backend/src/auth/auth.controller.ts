import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
}