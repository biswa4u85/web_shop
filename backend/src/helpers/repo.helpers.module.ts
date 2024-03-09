import { Module } from "@nestjs/common";

import { RepoHelpersService, PureUsersService, PureProductsService } from "./repo.helpers.service";

@Module({
    imports: [],
    controllers: [],
    providers: [
        RepoHelpersService,
        PureUsersService,
        PureProductsService
    ],
    exports: [RepoHelpersService]
})

export default class RepoHelpersModule { }