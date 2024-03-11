import { Controller, Get, Post, Body, Patch, Param, Query, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiConsumes } from "@nestjs/swagger";
import { Request } from "express";
import { FileInterceptor } from '@nestjs/platform-express';

import { CategoriesService } from './categories.service';

import { GetCategoriesDto, CategoryDto, createCategoryDto, UpdateCategoryDto, QueryCategoryDto } from './categories.entity';

import { JwtHelpersService } from "../helpers/jwt.helpers.service";

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
  constructor(
    private readonly jwt: JwtHelpersService,
    private readonly categoriesService: CategoriesService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Creates a new category' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: createCategoryDto })
  @ApiOkResponse({ type: CategoryDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createCategory(@Req() request: Request, @Body() createCategoryDto: createCategoryDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'show all category' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: GetCategoriesDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getCategories(@Req() request: Request, @Query() queryCategoryDto: QueryCategoryDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.categoriesService.getCategories(queryCategoryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'show category details' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: CategoryDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getCategoryById(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.categoriesService.getCategoryById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update category' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateCategoryDto })
  @ApiOkResponse({ type: CategoryDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateCategory(@Req() request: Request, @Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete category' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'category has been Delete.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async removeCategory(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.categoriesService.removeCategory(id);
  }

  @Post('/import')
  @ApiOperation({ summary: 'Import category' })
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
  @ApiOkResponse({ description: 'Categories are Imported susscfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(FileInterceptor('file'))
  async importCategories(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.categoriesService.importCategories(file);
  }

  @Post('/import_img')
  @ApiOperation({ summary: 'Import category' })
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
  async importCategoryImages(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.categoriesService.importCategoryImages(file);
  }
}