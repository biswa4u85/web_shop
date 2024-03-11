import { Injectable, NotFoundException } from '@nestjs/common';
import * as xlsx from 'xlsx';

import { CreateStoreDto, UpdateStoreDto, QueryStoreDto } from './stores.entity';

import { RepoHelpersService } from "../helpers/repo.helpers.service";

const resource = "store";

@Injectable()
export class StoresService {


  constructor(
    private readonly repo: RepoHelpersService
  ) {

  }

  async getStores(queryStoreDto: QueryStoreDto) {
    return await this.repo.getStores(queryStoreDto);
  }

  async getStoreById(id: string) {
    return await this.repo.getStoreById(id);
  }

  async createStore(createProductDto: CreateStoreDto) {
    return await this.repo.createStore(createProductDto);
  }

  async updateStore(id: string, updateProductDto: UpdateStoreDto) {
    return await this.repo.updateStore(id, updateProductDto);
  }

  async removeStore(id: string) {
    return await this.repo.removeStore(id);
  }

  async importStores(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importStores(data);
  }

  async importStoreImages(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importStoreImages(data);
  }

}
