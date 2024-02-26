import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return `Welcome to Webshop ${process.env.APP_ENV?.toLowerCase()} server!`
  }
}