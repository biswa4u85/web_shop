import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto, QueryProductDto } from './index.dto';
import * as xlsx from 'xlsx';

import { UtilsService } from '../utils/utils.service';

@Injectable()
export class ProductsService {

  private prisma

  constructor(private readonly utilsService: UtilsService) {
    this.prisma = this.utilsService.getPrismaClient();
  }

  async findAll(queryProductDto: QueryProductDto) {
    try {
      let { skip, take, ean } = queryProductDto
      skip = +skip ?? 0
      take = +take ?? 100
      let where: any = {}
      if (ean) {
        ean = +ean ?? null
        if (Number.isNaN(ean)) {
          throw new NotFoundException(`Record Not Found`);
        } else {
          where['ean'] = +ean
        }
      }
      const count = await this.prisma.product.count({
        where
      })
      const data = await this.prisma.product.findMany({
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
      const single = await this.prisma.product.findUnique({ where: { id } });
      return single;
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }

  async create(createProductDto: CreateProductDto) {
    try {
      return this.prisma.product.create({ data: createProductDto });
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const single = await this.prisma.product.update({
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
      const single = await this.prisma.product.delete({
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
        const ifExist = await this.prisma.product.findUnique({ where: { ean: item.ean } });
        if (ifExist) {
          await this.prisma.product.update({ where: { ean: item.ean }, data: item });
        } else {
          await this.prisma.product.create({ data: item });
        }
      }
      return 'Data processed successfully';
    } catch (error) {
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
        const ifExist = await this.prisma.product.findUnique({ where: { ean: item.ean } });
        if (ifExist) {
          await this.prisma.product.update({ where: { ean: item.ean }, data: { images: item['Main image'] } });
        }
      }
      return 'Images processed successfully';
    } catch (error) {
      await this.utilsService.throwErrors(error);
    }
  }
}
