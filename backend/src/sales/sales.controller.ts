import { Controller, Get, Post, Body, Patch, Param, Query, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiConsumes } from "@nestjs/swagger";
import { Request } from "express";
import { FileInterceptor } from '@nestjs/platform-express';

import { SalesService } from './sales.service';

import { GetSalesDto, SaleDto, CreateSaleDto, UpdateSaleDto, QuerySaleDto } from './sales.entity';

import { JwtHelpersService } from "../helpers/jwt.helpers.service";

@Controller('sales')
@ApiTags('Sales')
export class SalesController {
  constructor(
    private readonly jwt: JwtHelpersService,
    private readonly salesService: SalesService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Creates a new sale' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateSaleDto })
  @ApiOkResponse({ type: SaleDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createSale(@Req() request: Request, @Body() createSaleDto: CreateSaleDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.salesService.createSale(createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'show all sales' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: GetSalesDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getSales(@Req() request: Request, @Query() querySaleDto: QuerySaleDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.salesService.getSales(querySaleDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'show sale details' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: SaleDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getSaleById(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.salesService.getSaleById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update sale' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateSaleDto })
  @ApiOkResponse({ type: SaleDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateSale(@Req() request: Request, @Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.salesService.updateSale(id, updateSaleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete sale' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'sale has been Delete.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async removeSale(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.salesService.removeSale(id);
  }

  @Post('/import')
  @ApiOperation({ summary: 'Import sale' })
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({ description: 'sales are Imported susscfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(FileInterceptor('file'))
  async importSales(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.salesService.importSales(file);
  }

  @Post('/import_img')
  @ApiOperation({ summary: 'Import product' })
  @ApiBearerAuth('JWT-auth')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({ description: 'Images are Imported susscfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(FileInterceptor('file'))
  async importSaleImages(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.salesService.importSaleImages(file);
  }
}