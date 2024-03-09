import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './index.dto';

import { UtilsHelpersService } from '../helpers/utils.helpers.service';

@Injectable()
export class UsersService {

  private prisma

  constructor(
    private readonly utils: UtilsHelpersService
  ) {
    this.prisma = this.utils.getPrismaClient();
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
