import { Controller, Get, Post, Body, Patch, Param, Query, Delete, Req, Res, ParseIntPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request, Response } from "express";

import { JwtService } from '../utils/jwt.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly jwtService: JwtService, private readonly productsService: ProductsService) { }

  @Post()
  async create(@Req() request: Request, @Body() createProductDto: CreateProductDto) {
    await this.jwtService.verifyToken(request?.headers?.authorization);
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(@Req() request: Request, @Query('skip', ParseIntPipe) skip: number = 0, @Query('take', ParseIntPipe) take: number = 100, @Query('sku') sku: string = '') {
    await this.jwtService.verifyToken(request?.headers?.authorization);
    return this.productsService.findAll(skip, take, sku);
  }

  @Get(':id')
  async findOne(@Req() request: Request, @Param('id') id: string) {
    await this.jwtService.verifyToken(request?.headers?.authorization);
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(@Req() request: Request, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    await this.jwtService.verifyToken(request?.headers?.authorization);
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Req() request: Request, @Param('id') id: string) {
    await this.jwtService.verifyToken(request?.headers?.authorization);
    return this.productsService.remove(id);
  }

  @Post('/import')
  @UseInterceptors(FileInterceptor('file'))
  async importData(@Req() request: Request, @UploadedFile() file: any) {
    await this.jwtService.verifyToken(request?.headers?.authorization);
    return this.productsService.importData(file);
  }

  @Post('/import_img')
  @UseInterceptors(FileInterceptor('file'))
  async importImages(@Req() request: Request, @UploadedFile() file: any) {
    await this.jwtService.verifyToken(request?.headers?.authorization);
    return this.productsService.importImages(file);
  }
}