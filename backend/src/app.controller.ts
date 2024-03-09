import { Controller, Get } from '@nestjs/common';
import { ApiTags } from "@nestjs/swagger";
import { AppService } from './app.service';

@Controller()
@ApiTags('Apis')
export class AppController {
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly appService: AppService) { }

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }
}