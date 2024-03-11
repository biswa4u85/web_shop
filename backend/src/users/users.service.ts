import { Injectable } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto, QueryUsersDto } from './users.entity';

import { RepoHelpersService } from "../helpers/repo.helpers.service";

import { utils } from '../helpers/utils.helpers.service';

@Injectable()
export class UsersService {

  constructor(
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
    const user = utils.convertLanguage(createUserDto, ['en', 'fr'], ['name'])
    console.log(user)
    return await this.repo.createUser(user);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    return await this.repo.updateUser(id, updateUserDto);
  }

  async removeUser(id: string) {
    return await this.repo.removeUser(id);
  }

}
