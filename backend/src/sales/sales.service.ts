import { Injectable, NotFoundException } from '@nestjs/common';
import * as xlsx from 'xlsx';

import { CreateSaleDto, UpdateSaleDto, QuerySaleDto } from './sales.entity';

import { RepoHelpersService } from "../helpers/repo.helpers.service";

const resource = "sale";

@Injectable()
export class SalesService {


  constructor(
    private readonly repo: RepoHelpersService
  ) {

  }

  async getSales(querySaleDto: QuerySaleDto) {
    return await this.repo.getSales(querySaleDto);
  }

  async getSaleById(id: string) {
    return await this.repo.getSaleById(id);
  }

  async createSale(createProductDto: CreateSaleDto) {
    return await this.repo.createSale(createProductDto);
  }

  async updateSale(id: string, updateProductDto: UpdateSaleDto) {
    return await this.repo.updateSale(id, updateProductDto);
  }

  async removeSale(id: string) {
    return await this.repo.removeSale(id);
  }

  async importSales(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importSales(data);
  }

  async importSaleImages(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importSaleImages(data);
  }

}
