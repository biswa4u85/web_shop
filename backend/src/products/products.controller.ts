import { Controller, Get, Post, Body, Patch, Param, Query, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiQuery, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { FileInterceptor } from '@nestjs/platform-express';

import { ProductsService } from './products.service';
import { ProductDto, CreateProductDto, UpdateProductDto, QueryProductDto } from './index.dto';
import { Request, Response } from "express";

import { JwtService } from '../utils/jwt.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly jwtService: JwtService, private readonly productsService: ProductsService) { }

  @Post()
  @ApiOperation({ summary: 'Creates a new product' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateProductDto })
  @ApiOkResponse({ description: 'product has been successfully created.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async create(@Req() request: Request, @Body() createProductDto: CreateProductDto) {
    await this.jwtService.verifyToken(request?.headers?.authorization);
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'show all product' })
  @ApiBearerAuth('JWT-auth')
  @ApiQuery({ type: QueryProductDto })
  @ApiOkResponse({ type: ProductDto, isArray: true })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findAll(@Req() request: Request, @Query() queryProductDto: QueryProductDto) {
    await this.jwtService.verifyToken(request?.headers?.authorization);
    return this.productsService.findAll(queryProductDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'show product details' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: ProductDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findOne(@Req() request: Request, @Param('id') id: string) {
    await this.jwtService.verifyToken(request?.headers?.authorization);
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
    await this.jwtService.verifyToken(request?.headers?.authorization);
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'product has been Delete.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async remove(@Req() request: Request, @Param('id') id: string) {
    await this.jwtService.verifyToken(request?.headers?.authorization);
    return this.productsService.remove(id);
  }

  @Post('/import')
  @UseInterceptors(FileInterceptor('file'))
  async importData(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwtService.verifyToken(request?.headers?.authorization);
    return this.productsService.importData(file);
  }

  @Post('/import_img')
  @UseInterceptors(FileInterceptor('file'))
  async importImages(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwtService.verifyToken(request?.headers?.authorization);
    return this.productsService.importImages(file);
  }
}