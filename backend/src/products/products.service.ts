import { Injectable, NotFoundException } from '@nestjs/common';
import * as xlsx from 'xlsx';

import { CreateProductDto, UpdateProductDto, QueryProductDto } from './products.entity';

import { RepoHelpersService } from "../helpers/repo.helpers.service";

const resource = "product";

@Injectable()
export class ProductsService {


  constructor(
    private readonly repo: RepoHelpersService
  ) {

  }

  async getProducts(queryProductDto: QueryProductDto) {
    return await this.repo.getProducts(queryProductDto);
  }

  async getProductById(id: string) {
    return await this.repo.getProductById(id);
  }

  async createProduct(createProductDto: CreateProductDto) {
    return await this.repo.createProduct(createProductDto);
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    return await this.repo.updateProduct(id, updateProductDto);
  }

  async removeProduct(id: string) {
    return await this.repo.removeProduct(id);
  }

  async importProducts(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importProducts(data);
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
