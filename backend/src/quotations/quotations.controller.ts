import { Controller, Get, Post, Body, Patch, Param, Query, Delete, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ApiTags, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse, ApiConsumes } from "@nestjs/swagger";
import { Request } from "express";
import { FileInterceptor } from '@nestjs/platform-express';

import { QuotationsService } from './quotations.service';

import { GetQuotationsDto, QuotationDto, CreateQuotationDto, UpdateQuotationDto, QueryQuotationDto } from './quotations.entity';

import { JwtHelpersService } from "../helpers/jwt.helpers.service";

@Controller('quotations')
@ApiTags('Quotations')
export class QuotationsController {
  constructor(
    private readonly jwt: JwtHelpersService,
    private readonly QuotationsService: QuotationsService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Creates a new Quotation' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: CreateQuotationDto })
  @ApiOkResponse({ type: QuotationDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createQuotation(@Req() request: Request, @Body() createQuotationDto: CreateQuotationDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.QuotationsService.createQuotation(createQuotationDto);
  }

  @Get()
  @ApiOperation({ summary: 'show all Quotation' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: GetQuotationsDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getQuotations(@Req() request: Request, @Query() queryQuotationDto: QueryQuotationDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.QuotationsService.getQuotations(queryQuotationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'show Quotation details' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ type: QuotationDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getQuotationById(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.QuotationsService.getQuotationById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Quotation' })
  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateQuotationDto })
  @ApiOkResponse({ type: QuotationDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async updateQuotation(@Req() request: Request, @Param('id') id: string, @Body() updateQuotationDto: UpdateQuotationDto) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.QuotationsService.updateQuotation(id, updateQuotationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Quotation' })
  @ApiBearerAuth('JWT-auth')
  @ApiOkResponse({ description: 'Quotation has been Delete.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async removeQuotation(@Req() request: Request, @Param('id') id: string) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.QuotationsService.removeQuotation(id);
  }

  @Post('/import')
  @ApiOperation({ summary: 'Import Quotation' })
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
  @ApiOkResponse({ description: 'Quotations are Imported susscfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseInterceptors(FileInterceptor('file'))
  async importQuotations(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.QuotationsService.importQuotations(file);
  }

  @Post('/import_img')
  @ApiOperation({ summary: 'Import quotation' })
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
  async importQuotationImages(@Req() request: Request, @UploadedFile() file: Object) {
    await this.jwt.verifyToken(request?.headers?.authorization, 'admin');
    return this.QuotationsService.importQuotationImages(file);
  }
}