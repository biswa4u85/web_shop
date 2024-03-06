import { Entity } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { utils } from '../utils/utils.service';

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