import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";

import { PrismaClient } from '@prisma/client';

@Injectable()
export class UtilsHelpersService {
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
            skip: {
                description: 'skip',
                example: 0
            },
            take: {
                description: 'take',
                example: 100
            },
            search: {
                description: 'search',
                required: false,
                example: null
            },
            email: {
                description: 'email',
                example: "a1@admin.com"
            },
            password: {
                description: 'email',
                example: "Demo@123"
            },
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
}

export const utils = new UtilsHelpersService();