import { Injectable } from "@nestjs/common";

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
                example: ''
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
            name: {
                description: 'Name',
                example: {
                    en: "en name",
                    fr: "fr name"
                }
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

    convertLanguage = async (body: any, langs: any, list: any) => {
        // let lists = await langsModel.find()
        // let langs = lists.map(item => JSON.parse(JSON.stringify(item.code)));
        for (let item of list) {
            body[item] = langs.reduce((acc, key) => {
                acc[key] = body[item];
                return acc;
            }, {});
        }
        return body;
    };

    updateLanguage = (body: any, set: any, list: any, lang: any) => {
        for (let item of list) {
            if (typeof body[item] == "string") {
                set[`${item}.${lang}`] = body[item];
                delete body[item];
            }
        }
        return { ...body, $set: set };
    };
}

export const utils = new UtilsHelpersService();