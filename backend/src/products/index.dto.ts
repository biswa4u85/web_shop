import { OmitType } from "@nestjs/swagger";

import ProductsEntity, {QuerysEntity} from "./products.entity";

export class ProductDto extends ProductsEntity { };

export class CreateProductDto extends OmitType(ProductDto, ['id']) { };
export class UpdateProductDto extends OmitType(ProductDto, ['id']) { };
export class QueryProductDto extends QuerysEntity { };