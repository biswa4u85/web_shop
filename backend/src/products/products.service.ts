import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto, QueryProductDto } from './index.dto';
import * as xlsx from 'xlsx';

import { UtilsHelpersService } from '../helpers/utils.helpers.service';
const resource = "product";

@Injectable()
export class ProductsService {

  private prisma

  constructor(
    private readonly utils: UtilsHelpersService
  ) {
    this.prisma = this.utils.getPrismaClient();
  }

  async findAll(queryProductDto: QueryProductDto) {
    try {
      let { skip, take, search } = queryProductDto
      skip = skip ? +skip : 0
      take = take ? +take : 100
      search = search ? +search : null
      let where: any = {}
      if (search) {
        if (Number.isNaN(search)) {
          throw new NotFoundException(`Record Not Found`);
        } else {
          where['OR'] = [
            { sku: search },
            { ean: String(search) },
            { supplierRef: String(search) },
            { scanCode: String(search) },
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
      await error
    }
  }

  async findOne(id: string) {
    try {
      const single = await this.prisma[resource].findUnique({ where: { id } });
      return single;
    } catch (error) {
      await error
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      return this.prisma[resource].create({ data: createProductDto });
    } catch (error) {
      await error
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
      await error
    }
  }

  async remove(id: string) {
    try {
      const single = await this.prisma[resource].delete({
        where: { id }
      });
      return single;
    } catch (error) {
      await error
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
          item.ean = String(item.ean)
          const ifExist = await this.prisma[resource].findUnique({ where: { sku: item.sku } });
          if (ifExist) {
            await this.prisma[resource].update({ where: { sku: item.sku }, data: item });
          } else {
            await this.prisma[resource].create({ data: item });
          }
        }
      }
      return 'Data processed successfully';
    } catch (error) {
      console.log(error)
      await error
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
          await this.prisma[resource].update({
            where: { sku: item.sku }, data: {
              ean: String(item.ean),
              scanCode: item.scanCode,
              purchasePrice: String(item.purchasePrice),
              price: String(item.webshopPrice),
              images: item['Main image']
            }
          });
        }
      }
      return 'Images processed successfully';
    } catch (error) {
      console.log(error)
      await error
    }
  }
}
