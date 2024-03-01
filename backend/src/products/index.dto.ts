import { PartialType } from '@nestjs/mapped-types';

class CreateProductDto {
    status: Boolean
    sku: Number
    language: String
    categories: String
    title: String
    description: String
    images: String
    tags: String
    price: String
    weight: Number
    taxValue: Number
    ean: Number
    supplierRef: String
    brand: String
    size: String
    sizeMixed: String
    colors: String
    dogJacketType: String
    supplier: String
    dogJacketSize: String
    location: String
}

class UpdateProductDto extends PartialType(CreateProductDto) { }

class QueryProductDto {
    skip: Number
    take: Number
    search: Number
}

export {
    CreateProductDto,
    UpdateProductDto,
    QueryProductDto,
}