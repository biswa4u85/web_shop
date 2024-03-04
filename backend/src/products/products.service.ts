import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto, QueryProductDto } from './index.dto';
import * as xlsx from 'xlsx';

import { UtilsService } from '../utils/utils.service';
const resource = "product";

@Injectable()
export class ProductsService {

  private prisma

  constructor(private readonly utilsService: UtilsService) {
    this.prisma = this.utilsService.getPrismaClient();
  }

  async findAll(queryProductDto: QueryProductDto) {
    try {
      let { skip, take, search } = queryProductDto
      skip = skip ? +skip : 0
      take = take ? +take : 100
      let where: any = {}
      if (search) {
        search = search ? +search : null
        if (Number.isNaN(search)) {
          throw new NotFoundException(`Record Not Found`);
        } else {
          where['OR'] = [
            { sku: search },
            { ean: search }
          ]
        }
      }
      const count = await this.prisma[resource].count({
        where
      })
      const data = await this.prisma[resource].findMany({
        skip,
        take,
        where
      });
      if (!data) throw new NotFoundException(`Record Not Found`);
      return { count, data }
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }

  async findOne(id: string) {
    try {
      const single = await this.prisma[resource].findUnique({ where: { id } });
      return single;
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      return this.prisma[resource].create({ data: createProductDto });
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const single = await this.prisma[resource].update({
        where: { id },
        data: updateProductDto

      });
      return single;
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }

  async remove(id: string) {
    try {
      const single = await this.prisma[resource].delete({
        where: { id }
      });
      return single;
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }

  async importData(file: any) {
    try {
      if (!file) throw new NotFoundException(`No file provided`);

      // Parse the Excel file
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // You can now process the 'data' as needed
      for (let item of data) {
        if (item.language == "nl_NL") {
          const ifExist = await this.prisma[resource].findUnique({ where: { ean: item.ean } });
          if (ifExist) {
            await this.prisma[resource].update({ where: { ean: item.ean }, data: item });
          } else {
            await this.prisma[resource].create({ data: item });
          }
        }
      }
      return 'Data processed successfully';
    } catch (error) {
      console.log(error)
      await this.utilsService.throwErrors(error);
    }
  }

  async importImages(file: any) {
    try {
      if (!file) throw new NotFoundException(`No file provided`);

      // Parse the Excel file
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const data: any = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      // You can now process the 'data' as needed
      for (let item of data) {
        const ifExist = await this.prisma[resource].findUnique({ where: { sku: item.sku } });
        if (ifExist) {
          await this.prisma[resource].update({ where: { sku: item.sku }, data: { 
            scanCode: item.scanCode,
            purchasePrice: String(item.purchasePrice),
            price: String(item.webshopPrice),
            images: item['Main image']
           } });
        }
      }
      return 'Images processed successfully';
    } catch (error) {
      console.log(error)
      await this.utilsService.throwErrors(error);
    }
  }
}
