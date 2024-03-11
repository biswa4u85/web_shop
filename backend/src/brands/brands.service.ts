import { Injectable, NotFoundException } from '@nestjs/common';
import * as xlsx from 'xlsx';

import { CreateBrandDto, UpdateBrandDto, QueryBrandDto } from './brands.entity';

import { RepoHelpersService } from "../helpers/repo.helpers.service";

const resource = "brand";

@Injectable()
export class BrandsService {


  constructor(
    private readonly repo: RepoHelpersService
  ) {

  }

  async getBrands(queryBrandDto: QueryBrandDto) {
    return await this.repo.getBrands(queryBrandDto);
  }

  async getBrandById(id: string) {
    return await this.repo.getBrandById(id);
  }

  async createBrand(createBrandDto: CreateBrandDto) {
    return await this.repo.createBrand(createBrandDto);
  }

  async updateBrand(id: string, updateBrandDto: UpdateBrandDto) {
    return await this.repo.updateBrand(id, updateBrandDto);
  }

  async removeBrand(id: string) {
    return await this.repo.removeBrand(id);
  }

  async importBrands(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importBrands(data);
  }

  async importBrandImages(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importBrandImages(data);
  }

}
