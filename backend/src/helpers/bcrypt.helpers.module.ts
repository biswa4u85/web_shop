import { Module } from "@nestjs/common";

import { BcryptHelpersService } from "./bcrypt.helpers.service";

@Module({
    imports: [],
    controllers: [],
    providers: [BcryptHelpersService],
    exports: [BcryptHelpersService]
})

export default class BcryptHelpersModule { };