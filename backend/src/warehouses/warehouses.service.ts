import { Injectable, NotFoundException } from '@nestjs/common';
import * as xlsx from 'xlsx';

import { CreateBrandDto, UpdateBrandDto, QueryBrandDto } from './brands.entity';

import { RepoHelpersService } from "../helpers/repo.helpers.service";

const resource = "product";

@Injectable()
export class BrandsService {


  constructor(
    private readonly repo: RepoHelpersService
  ) {

  }

  async getBrands(queryBrandDto: QueryBrandDto) {
    return await this.repo.getBrands(queryBrandDto);
  }

  async getProductById(id: string) {
    return await this.repo.getProductById(id);
  }

  async createProduct(createProductDto: CreateBrandDto) {
    return await this.repo.createProduct(createProductDto);
  }

  async updateProduct(id: string, updateProductDto: UpdateBrandDto) {
    return await this.repo.updateProduct(id, updateProductDto);
  }

  async removeProduct(id: string) {
    return await this.repo.removeProduct(id);
  }

  async importBrands(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importBrands(data);
  }

  async importProductImages(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importProductImages(data);
  }

}
