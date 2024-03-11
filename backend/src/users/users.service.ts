import { Injectable, BadRequestException } from '@nestjs/common';

import { CreateUserDto, QueryUsersDto } from './users.dto';

import { BcryptHelpersService } from '../helpers/bcrypt.helpers.service';
import { RepoHelpersService } from "../helpers/repo.helpers.service";


import { utils } from '../helpers/utils.helpers.service';

@Injectable()
export class UsersService {

  constructor(
    private readonly bcrypt: BcryptHelpersService,
    private readonly repo: RepoHelpersService
  ) {

  }

  async getUsers(queryUsersDto: QueryUsersDto) {
    return await this.repo.getUsers(queryUsersDto);
  }

  async getUserById(id: string) {
    return await this.repo.getUserById(id);
  }

  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await this.bcrypt.hashString(createUserDto.password);
    if (!hashedPassword) {
      throw new BadRequestException('Password could not be hashed.');
    }
    createUserDto['password'] = hashedPassword
    const user = await utils.convertLanguage(createUserDto, ['name'])
    return await this.repo.createUser(user);
  }

  async updateUser(id: string, createUserDto: CreateUserDto) {
    if (createUserDto.password) {
      const hashedPassword = await this.bcrypt.hashString(createUserDto.password);
      if (!hashedPassword) {
        throw new BadRequestException('Password could not be hashed.');
      }
      createUserDto['password'] = hashedPassword
    }
    const user = await utils.updateLanguage(createUserDto, ['name'], 'en')
    return await this.repo.updateUser(id, user);
  }

  async removeUser(id: string) {
    return await this.repo.removeUser(id);
  }

}
