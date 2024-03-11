import { Injectable, NotFoundException } from '@nestjs/common';
import * as xlsx from 'xlsx';

import { createCategoryDto, UpdateCategoryDto, QueryCategoryDto } from './categories.entity';

import { RepoHelpersService } from "../helpers/repo.helpers.service";

const resource = "category";

@Injectable()
export class CategoriesService {


  constructor(
    private readonly repo: RepoHelpersService
  ) {

  }

  async getCategories(queryCategoryDto: QueryCategoryDto) {
    return await this.repo.getCategories(queryCategoryDto);
  }

  async getCategoryById(id: string) {
    return await this.repo.getCategoryById(id);
  }

  async createCategory(createCategoryDto: createCategoryDto) {
    return await this.repo.createCategory(createCategoryDto);
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.repo.updateCategory(id, updateCategoryDto);
  }

  async removeCategory(id: string) {
    return await this.repo.removeCategory(id);
  }

  async importCategories(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importCategories(data);
  }

  async importCategoryImages(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importCategoryImages(data);
  }

}
