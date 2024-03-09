import { Controller, Get, Post, Body, Patch, Param, Query, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiConsumes } from "@nestjs/swagger";
import { Request } from "express";
import { FileInterceptor } from '@nestjs/platform-express';

import { ProductsService } from './products.service';

import { GetProductsDto, ProductDto, CreateProductDto, UpdateProductDto, QueryProductDto } from './products.entity';

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
  async createProduct(@Req() request: Request, @Body() createProductDto: CreateProductDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'show all product' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: GetProductsDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getProducts(@Req() request: Request, @Query() queryProductDto: QueryProductDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.productsService.getProducts(queryProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'show product details' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ProductDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getProductById(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.productsService.getProductById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateProductDto })
  @ApiOkResponse({ type: ProductDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateProduct(@Req() request: Request, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'product has been Delete.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async removeProduct(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.productsService.removeProduct(id);
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
  async importProducts(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.productsService.importProducts(file);
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
    return this.productsService.importProductImages(file);
  }
}