import { Controller, Get, Post, Body, Patch, Param, Query, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiConsumes } from "@nestjs/swagger";
import { Request } from "express";
import { FileInterceptor } from '@nestjs/platform-express';

import { BrandsService } from './brands.service';

import { GetBrandsDto, BrandDto, CreateBrandDto, UpdateBrandDto, QueryBrandDto } from './brands.entity';

import { JwtHelpersService } from "../helpers/jwt.helpers.service";

@Controller('brands')
@ApiTags('Brands')
export class BrandsController {
  constructor(
    private readonly jwt: JwtHelpersService,
    private readonly brandsService: BrandsService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Creates a new product' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateBrandDto })
  @ApiOkResponse({ type: BrandDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createProduct(@Req() request: Request, @Body() createBrandDto: CreateBrandDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.brandsService.createProduct(createBrandDto);
  }

  @Get()
  @ApiOperation({ summary: 'show all product' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: GetBrandsDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getBrands(@Req() request: Request, @Query() queryBrandDto: QueryBrandDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.brandsService.getBrands(queryBrandDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'show product details' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: BrandDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getProductById(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.brandsService.getProductById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateBrandDto })
  @ApiOkResponse({ type: BrandDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateProduct(@Req() request: Request, @Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.brandsService.updateProduct(id, updateBrandDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'product has been Delete.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async removeProduct(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.brandsService.removeProduct(id);
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
  @ApiOkResponse({ description: 'Brands are Imported susscfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(FileInterceptor('file'))
  async importBrands(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.brandsService.importBrands(file);
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
  async importProductImages(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.brandsService.importProductImages(file);
  }
}