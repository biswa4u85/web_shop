import { Injectable, NotFoundException } from '@nestjs/common';
import * as xlsx from 'xlsx';

import { CreateQuotationDto, UpdateQuotationDto, QueryQuotationDto } from './quotations.entity';

import { RepoHelpersService } from "../helpers/repo.helpers.service";

const resource = "quotation";

@Injectable()
export class QuotationsService {


  constructor(
    private readonly repo: RepoHelpersService
  ) {

  }

  async getQuotations(queryQuotationDto: QueryQuotationDto) {
    return await this.repo.getQuotations(queryQuotationDto);
  }

  async getQuotationById(id: string) {
    return await this.repo.getQuotationById(id);
  }

  async createQuotation(createProductDto: CreateQuotationDto) {
    return await this.repo.createQuotation(createProductDto);
  }

  async updateQuotation(id: string, updateProductDto: UpdateQuotationDto) {
    return await this.repo.updateQuotation(id, updateProductDto);
  }

  async removeQuotation(id: string) {
    return await this.repo.removeQuotation(id);
  }

  async importQuotations(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importQuotations(data);
  }

  async importQuotationImages(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importQuotationImages(data);
  }

}
