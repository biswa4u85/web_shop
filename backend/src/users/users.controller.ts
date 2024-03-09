import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { UsersService } from './users.service';
import { UserDto, CreateUserDto, UpdateUserDto } from './index.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'show all user' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: UserDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'show user details' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: UserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'User has been Delete.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
