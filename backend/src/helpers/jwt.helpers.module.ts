import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { JwtHelpersService } from "./jwt.helpers.service";

@Module({
    imports: [
        JwtModule.register({
            secret: 'bFd1e9fSw8O4imm24cqibh0i6GBimmFn6jJyprogmved',
        }),
    ],
    controllers: [],
    providers: [JwtHelpersService],
    exports: [JwtHelpersService]
})

export default class JwtHelpersModule { };