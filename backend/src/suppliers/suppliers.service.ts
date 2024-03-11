import { Injectable, NotFoundException } from '@nestjs/common';
import * as xlsx from 'xlsx';

import { CreateSupplierDto, UpdateSupplierDto, QuerySupplierDto } from './suppliers.entity';

import { RepoHelpersService } from "../helpers/repo.helpers.service";

const resource = "product";

@Injectable()
export class SuppliersService {


  constructor(
    private readonly repo: RepoHelpersService
  ) {

  }

  async getSuppliers(querySupplierDto: QuerySupplierDto) {
    return await this.repo.getSuppliers(querySupplierDto);
  }

  async getSupplierById(id: string) {
    return await this.repo.getSupplierById(id);
  }

  async createSupplier(createProductDto: CreateSupplierDto) {
    return await this.repo.createSupplier(createProductDto);
  }

  async updateSupplier(id: string, updateProductDto: UpdateSupplierDto) {
    return await this.repo.updateSupplier(id, updateProductDto);
  }

  async removeSupplier(id: string) {
    return await this.repo.removeSupplier(id);
  }

  async importSuppliers(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importSuppliers(data);
  }

  async importSupplierImages(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importSupplierImages(data);
  }

}
