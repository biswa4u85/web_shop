import { Controller, Get, Post, Body, Patch, Param, Query, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiConsumes } from "@nestjs/swagger";
import { FileInterceptor } from '@nestjs/platform-express';

import { ProductsService } from './products.service';
import { ProductDto, CreateProductDto, UpdateProductDto, QueryProductDto } from './index.dto';
import { Request } from "express";

import { JwtHelpersService } from "../helpers/jwt.helpers.service";

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(
    private readonly jwt: JwtHelpersService,
    private readonly productsService: ProductsService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Creates a new product' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateProductDto })
  @ApiOkResponse({ type: ProductDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Req() request: Request, @Body() createProductDto: CreateProductDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'show all product' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ProductDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findAll(@Req() request: Request, @Query() queryProductDto: QueryProductDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.productsService.findAll(queryProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'show product details' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ProductDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findOne(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponse({ type: ProductDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async update(@Req() request: Request, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'product has been Delete.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async remove(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.productsService.remove(id);
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
  @ApiOkResponse({ description: 'Products are Imported susscfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(FileInterceptor('file'))
  async importData(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.productsService.importData(file);
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
  async importImages(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.productsService.importImages(file);
  }
}