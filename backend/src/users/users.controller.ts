import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { ApiTags, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Request } from "express";

import { UsersService } from './users.service';

import { UserDto, GetUsersDto, CreateUserDto, QueryUsersDto } from './users.dto';

import { JwtHelpersService } from "../helpers/jwt.helpers.service";

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly jwt: JwtHelpersService,
    private readonly usersService: UsersService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createUser(@Req() request: Request, @Body() createUserDto: CreateUserDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'show all user' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: GetUsersDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getUsers(@Req() request: Request, @Query() queryUsersDto: QueryUsersDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.usersService.getUsers(queryUsersDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'show user details' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getUserById(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateUser(@Req() request: Request, @Param('id') id: string, @Query('lang') lang: "en", @Body() createUserDto: CreateUserDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.usersService.updateUser(id, createUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'User has been Delete.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async removeUser(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.usersService.removeUser(id);
  }
}
