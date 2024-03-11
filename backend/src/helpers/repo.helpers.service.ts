import { Injectable, NotFoundException } from '@nestjs/common';

import { utils } from './utils.helpers.service';

import { UserDto, GetUsersDto, QueryUsersDto } from '../users/users.dto';
import { GetProductsDto, ProductDto, QueryProductDto } from '../products/products.entity';

export class PureUsersService {

    private prisma;
    private resource = "user";

    constructor(
    ) {
        this.prisma = utils.getPrismaClient();
    }

    async getUsers(query: QueryUsersDto): Promise<GetUsersDto> {
        let { skip, take } = query
        skip = skip ? +skip : 0
        take = take ? +take : 100
        let where: any = {}
        let count = await this.prisma[this.resource].count({
            where
        })
        let data = await this.prisma[this.resource].findMany({
            skip,
            take
        });
        return { count, data }
    }

    createUser(data: Object): Promise<UserDto> {
        return this.prisma[this.resource].create({ data });
    }

    getUserById(id: string): Promise<UserDto | null | undefined> {
        return this.prisma[this.resource].findUnique({ where: { id } });
    }

    getUserByEmail(email: string): Promise<UserDto | null | undefined> {
        return this.prisma[this.resource].findUnique({ where: { email } });
    }

    updateUser(id: string, data: Object): Promise<UserDto | null | undefined> {
        return this.prisma[this.resource].update({ where: { id }, data });
    }

    removeUser(id: string): Promise<UserDto | null | undefined> {
        return this.prisma[this.resource].delete({ where: { id } });
    }


}

export class PureProductsService {

    private prisma;
    private resource = "product";

    constructor(
    ) {
        this.prisma = utils.getPrismaClient();
    }

    async getProducts(query: QueryProductDto): Promise<GetProductsDto> {
        let { skip, take, search } = query
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
                    { title: String(search) },
                    // { barcode: String(search) },
                    { scanCode: String(search) },
                    { supplierRef: String(search) },
                    { brand: String(search) },
                    { supplier: String(search) },
                ]
            }
        }
        let count = await this.prisma[this.resource].count({
            where
        })
        let data = await this.prisma[this.resource].findMany({
            skip,
            take,
            where
        });
        return { count, data }
    }

    createProduct(data: Object): Promise<ProductDto> {
        return this.prisma[this.resource].create({ data });
    }

    getProductById(id: string): Promise<ProductDto | null | undefined> {
        return this.prisma[this.resource].findUnique({ where: { id } });
    }

    updateProduct(id: string, data: Object): Promise<ProductDto | null | undefined> {
        return this.prisma[this.resource].update({ where: { id }, data });
    }

    removeProduct(id: string): Promise<ProductDto | null | undefined> {
        return this.prisma[this.resource].delete({ where: { id } });
    }

    async importProducts(data: any): Promise<string> {
        try {
            // You can now process the 'data' as needed
            for (let item of data) {
                if (item.language == "nl_NL") {
                    item.ean = String(item.ean)
                    const ifExist = await this.prisma[this.resource].findUnique({ where: { sku: item.sku } });
                    if (ifExist) {
                        await this.prisma[this.resource].update({ where: { sku: item.sku }, data: item });
                    } else {
                        await this.prisma[this.resource].create({ data: item });
                    }
                }
            }
            return 'Data processed successfully';
        } catch (error) {
            console.log(error)
            await error
        }
    }

    async importProductImages(data: any): Promise<string> {
        try {
            // You can now process the 'data' as needed
            for (let item of data) {
                if (item.sku) {
                    const ifExist = await this.prisma[this.resource].findUnique({ where: { sku: item.sku } });
                    if (ifExist) {
                        await this.prisma[this.resource].update({
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
            }
            return 'Images processed successfully';
        } catch (error) {
            console.log(error)
            await error
        }
    }

}


@Injectable()
export class RepoHelpersService {
    constructor(
        private readonly pureUsersService: PureUsersService,
        private readonly pureProductsService: PureProductsService
    ) { }

    // Users
    createUser(record: Object): Promise<UserDto> {
        return this.pureUsersService.createUser(record);
    }

    getUsers(query: QueryUsersDto): Promise<GetUsersDto> {
        return this.pureUsersService.getUsers(query);
    }

    getUserById(id: string): Promise<UserDto> {
        return this.pureUsersService.getUserById(id);
    }

    getUserByEmail(email: string): Promise<UserDto> {
        return this.pureUsersService.getUserByEmail(email);
    }

    updateUser(id: string, record: Object): Promise<UserDto> {
        return this.pureUsersService.updateUser(id, record);
    }

    removeUser(id: string): Promise<UserDto> {
        return this.pureUsersService.removeUser(id);
    }

    // Products
    createProduct(record: Object): Promise<ProductDto> {
        return this.pureProductsService.createProduct(record);
    }

    getProducts(query: QueryProductDto): Promise<GetProductsDto> {
        return this.pureProductsService.getProducts(query);
    }

    getProductById(id: string): Promise<ProductDto> {
        return this.pureProductsService.getProductById(id);
    }

    updateProduct(id: string, record: Object): Promise<ProductDto> {
        return this.pureProductsService.updateProduct(id, record);
    }

    removeProduct(id: string): Promise<ProductDto> {
        return this.pureProductsService.removeProduct(id);
    }

    importProducts(data: any): Promise<string> {
        return this.pureProductsService.importProducts(data);
    }

    importProductImages(data: any): Promise<string> {
        return this.pureProductsService.importProductImages(data);
    }

};



