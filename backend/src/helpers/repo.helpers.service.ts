import { Injectable, NotFoundException } from '@nestjs/common';

import { utils } from './utils.helpers.service';

import { GetUsersDto, UsersDto, QueryUsersDto } from '../users/users.entity';
import { GetProductsDto, ProductDto, QueryProductDto } from '../products/products.entity';
import { GetCategoriesDto, CategoryDto, QueryCategoryDto } from '../categories/categories.entity';
import { GetPurchasesDto, PurchaseDto, QueryPurchaseDto } from '../purchases/purchases.entity';
import { GetQuotationsDto, QuotationDto, QueryQuotationDto } from '../quotations/quotations.entity';
import { GetSalesDto, SaleDto, QuerySaleDto } from '../sales/sales.entity';
import { GetStoresDto, StoreDto, QueryStoreDto } from '../stores/stores.entity';
import { GetSuppliersDto, SupplierDto, QuerySupplierDto } from '../suppliers/suppliers.entity';
import { GetBrandsDto, BrandDto, QueryBrandDto } from '../brands/brands.entity';

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

    createUser(data: Object): Promise<UsersDto> {
        return this.prisma[this.resource].create({ data });
    }

    getUserById(id: string): Promise<UsersDto | null | undefined> {
        return this.prisma[this.resource].findUnique({ where: { id } });
    }

    getUserByEmail(email: string): Promise<UsersDto | null | undefined> {
        return this.prisma[this.resource].findUnique({ where: { email } });
    }

    updateUser(id: string, data: Object): Promise<UsersDto | null | undefined> {
        return this.prisma[this.resource].update({ where: { id }, data });
    }

    removeUser(id: string): Promise<UsersDto | null | undefined> {
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

export class PureCategoriesService {

    private prisma;
    private resource = "category";

    constructor(
    ) {
        this.prisma = utils.getPrismaClient();
    }

    async getCategories(query: QueryCategoryDto): Promise<GetCategoriesDto> {
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
                    { supplierRef: String(search) },
                    { scanCode: String(search) },
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

    createCategory(data: Object): Promise<CategoryDto> {
        return this.prisma[this.resource].create({ data });
    }

    getCategoryById(id: string): Promise<CategoryDto | null | undefined> {
        return this.prisma[this.resource].findUnique({ where: { id } });
    }

    updateCategory(id: string, data: Object): Promise<CategoryDto | null | undefined> {
        return this.prisma[this.resource].update({ where: { id }, data });
    }

    removeCategory(id: string): Promise<CategoryDto | null | undefined> {
        return this.prisma[this.resource].delete({ where: { id } });
    }

    async importCategories(data: any): Promise<string> {
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

    async importCategoryImages(data: any): Promise<string> {
        try {
            // You can now process the 'data' as needed
            for (let item of data) {
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
            return 'Images processed successfully';
        } catch (error) {
            console.log(error)
            await error
        }
    }

}

export class PurePurchasesService {

    private prisma;
    private resource = "purchase";

    constructor(
    ) {
        this.prisma = utils.getPrismaClient();
    }

    async getPurchases(query: QueryPurchaseDto): Promise<GetPurchasesDto> {
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
                    { supplierRef: String(search) },
                    { scanCode: String(search) },
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

    createPurchase(data: Object): Promise<PurchaseDto> {
        return this.prisma[this.resource].create({ data });
    }

    getPurchaseById(id: string): Promise<PurchaseDto | null | undefined> {
        return this.prisma[this.resource].findUnique({ where: { id } });
    }

    updatePurchase(id: string, data: Object): Promise<PurchaseDto | null | undefined> {
        return this.prisma[this.resource].update({ where: { id }, data });
    }

    removePurchase(id: string): Promise<PurchaseDto | null | undefined> {
        return this.prisma[this.resource].delete({ where: { id } });
    }

    async importPurchases(data: any): Promise<string> {
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

    async importPurchaseImages(data: any): Promise<string> {
        try {
            // You can now process the 'data' as needed
            for (let item of data) {
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
            return 'Images processed successfully';
        } catch (error) {
            console.log(error)
            await error
        }
    }

}

export class PureQuotationsService {

    private prisma;
    private resource = "quotation";

    constructor(
    ) {
        this.prisma = utils.getPrismaClient();
    }

    async getQuotations(query: QueryQuotationDto): Promise<GetQuotationsDto> {
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
                    { supplierRef: String(search) },
                    { scanCode: String(search) },
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

    createQuotation(data: Object): Promise<QuotationDto> {
        return this.prisma[this.resource].create({ data });
    }

    getQuotationById(id: string): Promise<QuotationDto | null | undefined> {
        return this.prisma[this.resource].findUnique({ where: { id } });
    }

    updateQuotation(id: string, data: Object): Promise<QuotationDto | null | undefined> {
        return this.prisma[this.resource].update({ where: { id }, data });
    }

    removeQuotation(id: string): Promise<QuotationDto | null | undefined> {
        return this.prisma[this.resource].delete({ where: { id } });
    }

    async importQuotations(data: any): Promise<string> {
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

    async importQuotationImages(data: any): Promise<string> {
        try {
            // You can now process the 'data' as needed
            for (let item of data) {
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
            return 'Images processed successfully';
        } catch (error) {
            console.log(error)
            await error
        }
    }

}

export class PureSalesService {

    private prisma;
    private resource = "brand";

    constructor(
    ) {
        this.prisma = utils.getPrismaClient();
    }

    async getSales(query: QuerySaleDto): Promise<GetSalesDto> {
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
                    { supplierRef: String(search) },
                    { scanCode: String(search) },
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

    createSale(data: Object): Promise<SaleDto> {
        return this.prisma[this.resource].create({ data });
    }

    getSaleById(id: string): Promise<SaleDto | null | undefined> {
        return this.prisma[this.resource].findUnique({ where: { id } });
    }

    updateSale(id: string, data: Object): Promise<SaleDto | null | undefined> {
        return this.prisma[this.resource].update({ where: { id }, data });
    }

    removeSale(id: string): Promise<SaleDto | null | undefined> {
        return this.prisma[this.resource].delete({ where: { id } });
    }

    async importSales(data: any): Promise<string> {
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

    async importSaleImages(data: any): Promise<string> {
        try {
            // You can now process the 'data' as needed
            for (let item of data) {
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
            return 'Images processed successfully';
        } catch (error) {
            console.log(error)
            await error
        }
    }

}

export class PureStoresService {

    private prisma;
    private resource = "brand";

    constructor(
    ) {
        this.prisma = utils.getPrismaClient();
    }

    async getStores(query: QueryStoreDto): Promise<GetStoresDto> {
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
                    { supplierRef: String(search) },
                    { scanCode: String(search) },
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

    createStore(data: Object): Promise<StoreDto> {
        return this.prisma[this.resource].create({ data });
    }

    getStoreById(id: string): Promise<StoreDto | null | undefined> {
        return this.prisma[this.resource].findUnique({ where: { id } });
    }

    updateStore(id: string, data: Object): Promise<StoreDto | null | undefined> {
        return this.prisma[this.resource].update({ where: { id }, data });
    }

    removeStore(id: string): Promise<StoreDto | null | undefined> {
        return this.prisma[this.resource].delete({ where: { id } });
    }

    async importStores(data: any): Promise<string> {
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

    async importStoreImages(data: any): Promise<string> {
        try {
            // You can now process the 'data' as needed
            for (let item of data) {
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
            return 'Images processed successfully';
        } catch (error) {
            console.log(error)
            await error
        }
    }

}

export class PureSuppliersService {

    private prisma;
    private resource = "brand";

    constructor(
    ) {
        this.prisma = utils.getPrismaClient();
    }

    async getSuppliers(query: QuerySupplierDto): Promise<GetSuppliersDto> {
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
                    { supplierRef: String(search) },
                    { scanCode: String(search) },
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

    createSupplier(data: Object): Promise<SupplierDto> {
        return this.prisma[this.resource].create({ data });
    }

    getSupplierById(id: string): Promise<SupplierDto | null | undefined> {
        return this.prisma[this.resource].findUnique({ where: { id } });
    }

    updateSupplier(id: string, data: Object): Promise<SupplierDto | null | undefined> {
        return this.prisma[this.resource].update({ where: { id }, data });
    }

    removeSupplier(id: string): Promise<SupplierDto | null | undefined> {
        return this.prisma[this.resource].delete({ where: { id } });
    }

    async importSuppliers(data: any): Promise<string> {
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

    async importSupplierImages(data: any): Promise<string> {
        try {
            // You can now process the 'data' as needed
            for (let item of data) {
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
            return 'Images processed successfully';
        } catch (error) {
            console.log(error)
            await error
        }
    }

}

export class PureBrandsService {

    private prisma;
    private resource = "brand";

    constructor(
    ) {
        this.prisma = utils.getPrismaClient();
    }

    async getBrands(query: QueryBrandDto): Promise<GetBrandsDto> {
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
                    { supplierRef: String(search) },
                    { scanCode: String(search) },
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

    createBrand(data: Object): Promise<BrandDto> {
        return this.prisma[this.resource].create({ data });
    }

    getBrandById(id: string): Promise<BrandDto | null | undefined> {
        return this.prisma[this.resource].findUnique({ where: { id } });
    }

    updateBrand(id: string, data: Object): Promise<BrandDto | null | undefined> {
        return this.prisma[this.resource].update({ where: { id }, data });
    }

    removeBrand(id: string): Promise<BrandDto | null | undefined> {
        return this.prisma[this.resource].delete({ where: { id } });
    }

    async importBrands(data: any): Promise<string> {
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

    async importBrandImages(data: any): Promise<string> {
        try {
            // You can now process the 'data' as needed
            for (let item of data) {
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
        private readonly pureProductsService: PureProductsService,
        private readonly pureCategoriesService: PureCategoriesService,
        private readonly purePurchasesService: PurePurchasesService,
        private readonly pureQuotationsService: PureQuotationsService,
        private readonly pureSalesService: PureSalesService,
        private readonly pureStoresService: PureStoresService,
        private readonly pureSuppliersService: PureSuppliersService,
        private readonly pureBrandsService: PureBrandsService,
    ) { }

    // Users
    createUser(record: Object): Promise<UsersDto> {
        return this.pureUsersService.createUser(record);
    }

    getUsers(query: QueryUsersDto): Promise<GetUsersDto> {
        return this.pureUsersService.getUsers(query);
    }

    getUserById(id: string): Promise<UsersDto> {
        return this.pureUsersService.getUserById(id);
    }

    getUserByEmail(email: string): Promise<UsersDto> {
        return this.pureUsersService.getUserByEmail(email);
    }

    updateUser(id: string, record: Object): Promise<UsersDto> {
        return this.pureUsersService.updateUser(id, record);
    }

    removeUser(id: string): Promise<UsersDto> {
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

    // Categories
    createCategory(record: Object): Promise<CategoryDto> {
        return this.pureCategoriesService.createCategory(record);
    }

    getCategories(query: QueryCategoryDto): Promise<GetCategoriesDto> {
        return this.pureCategoriesService.getCategories(query);
    }

    getCategoryById(id: string): Promise<CategoryDto> {
        return this.pureCategoriesService.getCategoryById(id);
    }

    updateCategory(id: string, record: Object): Promise<CategoryDto> {
        return this.pureCategoriesService.updateCategory(id, record);
    }

    removeCategory(id: string): Promise<CategoryDto> {
        return this.pureCategoriesService.removeCategory(id);
    }

    importCategories(data: any): Promise<string> {
        return this.pureCategoriesService.importCategories(data);
    }

    importCategoryImages(data: any): Promise<string> {
        return this.pureCategoriesService.importCategoryImages(data);
    }


    // Purchases
    createPurchase(record: Object): Promise<PurchaseDto> {
        return this.purePurchasesService.createPurchase(record);
    }

    getPurchases(query: QueryPurchaseDto): Promise<GetPurchasesDto> {
        return this.purePurchasesService.getPurchases(query);
    }

    getPurchaseById(id: string): Promise<PurchaseDto> {
        return this.purePurchasesService.getPurchaseById(id);
    }

    updatePurchase(id: string, record: Object): Promise<PurchaseDto> {
        return this.purePurchasesService.updatePurchase(id, record);
    }

    removePurchase(id: string): Promise<PurchaseDto> {
        return this.purePurchasesService.removePurchase(id);
    }

    importPurchases(data: any): Promise<string> {
        return this.purePurchasesService.importPurchases(data);
    }

    importPurchaseImages(data: any): Promise<string> {
        return this.purePurchasesService.importPurchaseImages(data);
    }


    // Quotations
    createQuotation(record: Object): Promise<QuotationDto> {
        return this.pureQuotationsService.createQuotation(record);
    }

    getQuotations(query: QueryQuotationDto): Promise<GetQuotationsDto> {
        return this.pureQuotationsService.getQuotations(query);
    }

    getQuotationById(id: string): Promise<QuotationDto> {
        return this.pureQuotationsService.getQuotationById(id);
    }

    updateQuotation(id: string, record: Object): Promise<QuotationDto> {
        return this.pureQuotationsService.updateQuotation(id, record);
    }

    removeQuotation(id: string): Promise<QuotationDto> {
        return this.pureQuotationsService.removeQuotation(id);
    }

    importQuotations(data: any): Promise<string> {
        return this.pureQuotationsService.importQuotations(data);
    }

    importQuotationImages(data: any): Promise<string> {
        return this.pureQuotationsService.importQuotationImages(data);
    }

    // Sales
    createSale(record: Object): Promise<SaleDto> {
        return this.pureSalesService.createSale(record);
    }

    getSales(query: QuerySaleDto): Promise<GetSalesDto> {
        return this.pureSalesService.getSales(query);
    }

    getSaleById(id: string): Promise<SaleDto> {
        return this.pureSalesService.getSaleById(id);
    }

    updateSale(id: string, record: Object): Promise<SaleDto> {
        return this.pureSalesService.updateSale(id, record);
    }

    removeSale(id: string): Promise<SaleDto> {
        return this.pureSalesService.removeSale(id);
    }

    importSales(data: any): Promise<string> {
        return this.pureSalesService.importSales(data);
    }

    importSaleImages(data: any): Promise<string> {
        return this.pureSalesService.importSaleImages(data);
    }


    // Stores
    createStore(record: Object): Promise<StoreDto> {
        return this.pureStoresService.createStore(record);
    }

    getStores(query: QueryStoreDto): Promise<GetStoresDto> {
        return this.pureStoresService.getStores(query);
    }

    getStoreById(id: string): Promise<StoreDto> {
        return this.pureStoresService.getStoreById(id);
    }

    updateStore(id: string, record: Object): Promise<StoreDto> {
        return this.pureStoresService.updateStore(id, record);
    }

    removeStore(id: string): Promise<StoreDto> {
        return this.pureStoresService.removeStore(id);
    }

    importStores(data: any): Promise<string> {
        return this.pureStoresService.importStores(data);
    }

    importStoreImages(data: any): Promise<string> {
        return this.pureStoresService.importStoreImages(data);
    }

    // Suppliers
    createSupplier(record: Object): Promise<SupplierDto> {
        return this.pureSuppliersService.createSupplier(record);
    }

    getSuppliers(query: QuerySupplierDto): Promise<GetSuppliersDto> {
        return this.pureSuppliersService.getSuppliers(query);
    }

    getSupplierById(id: string): Promise<SupplierDto> {
        return this.pureSuppliersService.getSupplierById(id);
    }

    updateSupplier(id: string, record: Object): Promise<SupplierDto> {
        return this.pureSuppliersService.updateSupplier(id, record);
    }

    removeSupplier(id: string): Promise<SupplierDto> {
        return this.pureSuppliersService.removeSupplier(id);
    }

    importSuppliers(data: any): Promise<string> {
        return this.pureSuppliersService.importSuppliers(data);
    }

    importSupplierImages(data: any): Promise<string> {
        return this.pureSuppliersService.importSupplierImages(data);
    }

    // Brands
    createBrand(record: Object): Promise<BrandDto> {
        return this.pureBrandsService.createBrand(record);
    }

    getBrands(query: QueryBrandDto): Promise<GetBrandsDto> {
        return this.pureBrandsService.getBrands(query);
    }

    getBrandById(id: string): Promise<BrandDto> {
        return this.pureBrandsService.getBrandById(id);
    }

    updateBrand(id: string, record: Object): Promise<BrandDto> {
        return this.pureBrandsService.updateBrand(id, record);
    }

    removeBrand(id: string): Promise<BrandDto> {
        return this.pureBrandsService.removeBrand(id);
    }

    importBrands(data: any): Promise<string> {
        return this.pureBrandsService.importBrands(data);
    }

    importBrandImages(data: any): Promise<string> {
        return this.pureBrandsService.importBrandImages(data);
    }






};



