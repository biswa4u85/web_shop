import { Controller, Get, Post, Body, Patch, Param, Query, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiConsumes } from "@nestjs/swagger";
import { Request } from "express";
import { FileInterceptor } from '@nestjs/platform-express';

import { PurchasesService } from './purchases.service';

import { GetPurchasesDto, PurchaseDto, CreatePurchaseDto, UpdatePurchaseDto, QueryPurchaseDto } from './purchases.entity';

import { JwtHelpersService } from "../helpers/jwt.helpers.service";

@Controller('purchases')
@ApiTags('Purchases')
export class PurchasesController {
  constructor(
    private readonly jwt: JwtHelpersService,
    private readonly purchasesService: PurchasesService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Creates a new purchase' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreatePurchaseDto })
  @ApiOkResponse({ type: PurchaseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createPurchase(@Req() request: Request, @Body() createPurchaseDto: CreatePurchaseDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.purchasesService.createPurchase(createPurchaseDto);
  }

  @Get()
  @ApiOperation({ summary: 'show all purchase' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: GetPurchasesDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getPurchases(@Req() request: Request, @Query() queryPurchaseDto: QueryPurchaseDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.purchasesService.getPurchases(queryPurchaseDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'show purchase details' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: PurchaseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getPurchaseById(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.purchasesService.getPurchaseById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update purchase' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdatePurchaseDto })
  @ApiOkResponse({ type: PurchaseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updatePurchase(@Req() request: Request, @Param('id') id: string, @Body() updatePurchaseDto: UpdatePurchaseDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.purchasesService.updatePurchase(id, updatePurchaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete purchase' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'purchase has been Delete.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async removePurchase(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.purchasesService.removePurchase(id);
  }

  @Post('/import')
  @ApiOperation({ summary: 'Import purchase' })
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
  @ApiOkResponse({ description: 'Purchases are Imported susscfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(FileInterceptor('file'))
  async importPurchases(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.purchasesService.importPurchases(file);
  }

  @Post('/import_img')
  @ApiOperation({ summary: 'Import purchases' })
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
  async importPurchaseImages(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.purchasesService.importPurchaseImages(file);
  }
}