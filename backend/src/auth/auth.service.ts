import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from './index.dto';
import * as bcrypt from 'bcryptjs';

import { JwtHelpersService } from '../helpers/jwt.helpers.service';
import { UtilsHelpersService } from '../helpers/utils.helpers.service';

@Injectable()
export class AuthService {

  private prisma

  constructor(
    private readonly jwt: JwtHelpersService,
    private readonly utils: UtilsHelpersService
  ) {
    this.prisma = this.utils.getPrismaClient();
  }

  async login(authDto: AuthDto) {
    const { email, password } = authDto;

    //check if user is exit
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException(`Record Not Found`);

    //check if password is correct
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) throw new NotFoundException("Invalid password");

    //create token data
    const tokenData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      image: user.image,
    }
    //create token
    const token = await this.jwt.generateToken(tokenData, "1d")
    user['token'] = token
    delete user.password
    return user
  }

}
