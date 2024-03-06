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

    getApiProperty(propertyName: string): Object {
        interface ApiProperties {
            [key: string]: Object;
        };

        const apiProperties: ApiProperties = {
            userId: {
                description: 'User ID',
                example: "1234"
            },
            role: {
                description: 'User Role',
                default: 'user'
            },
            productId: {
                description: 'Product ID',
                example: "1234"
            },
            stores: {
                description: 'Stores',
                example: [
                    {
                        location: "string",
                        qty: "string",
                        laps: "string"
                    }
                ]
            }
        };

        return apiProperties[propertyName];
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

export const utils = new UtilsService();