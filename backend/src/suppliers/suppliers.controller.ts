import { Controller, Get, Post, Body, Patch, Param, Query, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiConsumes } from "@nestjs/swagger";
import { Request } from "express";
import { FileInterceptor } from '@nestjs/platform-express';

import { SuppliersService } from './suppliers.service';

import { GetSuppliersDto, SupplierDto, CreateSupplierDto, UpdateSupplierDto, QuerySupplierDto } from './suppliers.entity';

import { JwtHelpersService } from "../helpers/jwt.helpers.service";

@Controller('brands')
@ApiTags('Brands')
export class SuppliersController {
  constructor(
    private readonly jwt: JwtHelpersService,
    private readonly suppliersService: SuppliersService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Creates a new supplier' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateSupplierDto })
  @ApiOkResponse({ type: SupplierDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createSupplier(@Req() request: Request, @Body() createSupplierDto: CreateSupplierDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.suppliersService.createSupplier(createSupplierDto);
  }

  @Get()
  @ApiOperation({ summary: 'show all suppliers' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: GetSuppliersDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getSuppliers(@Req() request: Request, @Query() querySupplierDto: QuerySupplierDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.suppliersService.getSuppliers(querySupplierDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'show supplier details' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: SupplierDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getSupplierById(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.suppliersService.getSupplierById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update supplier' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateSupplierDto })
  @ApiOkResponse({ type: SupplierDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateSupplier(@Req() request: Request, @Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.suppliersService.updateSupplier(id, updateSupplierDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete supplier' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'supplier has been Delete.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async removeSupplier(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.suppliersService.removeSupplier(id);
  }

  @Post('/import')
  @ApiOperation({ summary: 'Import supplier' })
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
  @ApiOkResponse({ description: 'Suppliers are Imported susscfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(FileInterceptor('file'))
  async importSuppliers(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.suppliersService.importSuppliers(file);
  }

  @Post('/import_img')
  @ApiOperation({ summary: 'Import supplier' })
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
  async importSupplierImages(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.suppliersService.importSupplierImages(file);
  }
}