import JwtHelpersModule from "./helpers/jwt.helpers.module";
import BcryptHelpersModule from "./helpers/bcrypt.helpers.module";
import UtilsHelpersModule from "./helpers/utils.helpers.module";

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

export const modules = [
    JwtHelpersModule,
    BcryptHelpersModule,
    UtilsHelpersModule,
    AuthModule,
    UsersModule,
    ProductsModule,
];