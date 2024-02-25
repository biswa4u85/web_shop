import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";

import { PrismaClient } from '@prisma/client';

@Injectable()
export class UtilsService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    getPrismaClient(): PrismaClient {
        return this.prisma;
    }

    async throwErrors(error: any) {
        if (error instanceof UnauthorizedException) {
            throw new UnauthorizedException(error);
        } else if (error instanceof NotFoundException) {
            throw new NotFoundException(error);
        } else if (error instanceof ConflictException) {
            throw new ConflictException(error);
        } else {
            throw new BadRequestException(error);
        }
    }
}