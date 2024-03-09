import { Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { utils } from '../helpers/utils.helpers.service';

@Entity({ name: 'users' })
export default class UsersEntity {

    @ApiProperty(utils.getApiProperty('userId'))
    id: string;

    @ApiProperty(utils.getApiProperty('name'))
    name: string;

    @ApiProperty(utils.getApiProperty('email'))
    email: string;

    @ApiProperty(utils.getApiProperty('password'))
    password: string;

    @ApiProperty(utils.getApiProperty('role'))
    role: string;

    @ApiProperty(utils.getApiProperty('image'))
    image: string;
}

export class QuerysEntity {

    @ApiProperty(utils.getApiProperty('skip'))
    skip: number;

    @ApiProperty(utils.getApiProperty('take'))
    take: number;

    @ApiProperty(utils.getApiProperty('search'))
    search: Number
}