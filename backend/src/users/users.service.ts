import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, QueryUserDto } from './index.dto';

import { UtilsHelpersService } from '../helpers/utils.helpers.service';

const resource = "user";

@Injectable()
export class UsersService {

  private prisma

  constructor(
    private readonly utils: UtilsHelpersService
  ) {
    this.prisma = this.utils.getPrismaClient();
  }


  async findAll(queryUserDto: QueryUserDto) {
    try {
      let { skip, take, search } = queryUserDto
      skip = skip ? +skip : 0
      take = take ? +take : 100
      search = search ? +search : null
      let where: any = {}
      if (search) {
        if (Number.isNaN(search)) {
          throw new NotFoundException(`Record Not Found`);
        } else {
          where['OR'] = [
            { sku: search },
            { ean: String(search) },
            { supplierRef: String(search) },
            { scanCode: String(search) },
          ]
        }
      }
      const count = await this.prisma[resource].count({
        where
      })
      const data = await this.prisma[resource].findMany({
        skip,
        take,
        where
      });
      if (!data) throw new NotFoundException(`Record Not Found`);
      return { count, data }
    } catch (error) {
      await error
    }
  }

  async findOne(id: string) {
    try {
      const single = await this.prisma[resource].findUnique({ where: { id } });
      return single;
    } catch (error) {
      await error
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return this.prisma[resource].create({ data: createUserDto });
    } catch (error) {
      await error
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const single = await this.prisma[resource].update({
        where: { id },
        data: updateUserDto

      });
      return single;
    } catch (error) {
      await error
    }
  }

  async remove(id: string) {
    try {
      const single = await this.prisma[resource].delete({
        where: { id }
      });
      return single;
    } catch (error) {
      await error
    }
  }


  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

}
