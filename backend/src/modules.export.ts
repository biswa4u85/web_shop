import JwtHelpersModule from "./helpers/jwt.helpers.module";
import BcryptHelpersModule from "./helpers/bcrypt.helpers.module";
import UtilsHelpersModule from "./helpers/utils.helpers.module";
import RepoHelpersModule from "./helpers/repo.helpers.module";

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { BrandsModule } from './brands/brands.module';
import { CategoriesModule } from './categories/categories.module';
import { QuotationsModule } from './quotations/quotations.module';
import { SalesModule } from './sales/sales.module';
import { PurchasesModule } from './purchases/purchases.module';
import { StoresModule } from './stores/stores.module';
import { SuppliersModule } from './suppliers/suppliers.module';

export const modules = [
    JwtHelpersModule,
    BcryptHelpersModule,
    UtilsHelpersModule,
    RepoHelpersModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    BrandsModule,
    CategoriesModule,
    QuotationsModule,
    SalesModule,
    PurchasesModule,
    StoresModule,
    SuppliersModule
];