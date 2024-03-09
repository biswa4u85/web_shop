import { Module } from "@nestjs/common";

import { UtilsHelpersService } from "./utils.helpers.service";

@Module({
    imports: [],
    controllers: [],
    providers: [UtilsHelpersService],
    exports: [UtilsHelpersService]
})

export default class UtilsHelpersModule { };