import { Injectable, NotFoundException } from '@nestjs/common';
import * as xlsx from 'xlsx';

import { CreatePurchaseDto, UpdatePurchaseDto, QueryPurchaseDto } from './purchases.entity';

import { RepoHelpersService } from "../helpers/repo.helpers.service";

const resource = "purchase";

@Injectable()
export class PurchasesService {


  constructor(
    private readonly repo: RepoHelpersService
  ) {

  }

  async getPurchases(queryPurchaseDto: QueryPurchaseDto) {
    return await this.repo.getPurchases(queryPurchaseDto);
  }

  async getPurchaseById(id: string) {
    return await this.repo.getPurchaseById(id);
  }

  async createPurchase(createPurchaseDto: CreatePurchaseDto) {
    return await this.repo.createPurchase(createPurchaseDto);
  }

  async updatePurchase(id: string, updateProductDto: UpdatePurchaseDto) {
    return await this.repo.updatePurchase(id, updateProductDto);
  }

  async removePurchase(id: string) {
    return await this.repo.removePurchase(id);
  }

  async importPurchases(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importPurchases(data);
  }

  async importPurchaseImages(file: any) {
    if (!file) throw new NotFoundException(`No file provided`);

    // Parse the Excel file
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    return await this.repo.importPurchaseImages(data);
  }

}
