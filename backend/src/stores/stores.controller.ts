import { Controller, Get, Post, Body, Patch, Param, Query, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiConsumes } from "@nestjs/swagger";
import { Request } from "express";
import { FileInterceptor } from '@nestjs/platform-express';

import { StoresService } from './stores.service';

import { GetStoresDto, StoreDto, CreateStoreDto, UpdateStoreDto, QueryStoreDto } from './stores.entity';

import { JwtHelpersService } from "../helpers/jwt.helpers.service";

@Controller('stores')
@ApiTags('Stores')
export class StoresController {
  constructor(
    private readonly jwt: JwtHelpersService,
    private readonly storesService: StoresService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Creates a new store' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateStoreDto })
  @ApiOkResponse({ type: StoreDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createStore(@Req() request: Request, @Body() createStoreDto: CreateStoreDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.storesService.createStore(createStoreDto);
  }

  @Get()
  @ApiOperation({ summary: 'show all store' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: GetStoresDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getStores(@Req() request: Request, @Query() queryStoreDto: QueryStoreDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.storesService.getStores(queryStoreDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'show store details' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: StoreDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getStoreById(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.storesService.getStoreById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update store' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateStoreDto })
  @ApiOkResponse({ type: StoreDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateStore(@Req() request: Request, @Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.storesService.updateStore(id, updateStoreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete store' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'product has been Delete.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async removeStore(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.storesService.removeStore(id);
  }

  @Post('/import')
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
  @ApiOkResponse({ description: 'Stores are Imported susscfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(FileInterceptor('file'))
  async importStores(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.storesService.importStores(file);
  }

  @Post('/import_img')
  @ApiOperation({ summary: 'Import store' })
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
  async importStoreImages(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.storesService.importStoreImages(file);
  }
}