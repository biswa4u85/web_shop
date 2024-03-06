import { Entity, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { utils } from '../utils/utils.service';

@Entity({ name: 'users' })
export default class UsersEntity {

    @ApiProperty(utils.getApiProperty('userId'))
    @Column({ name: 'id', type: 'string' })
    id: string;

    @ApiProperty(utils.getApiProperty('name'))
    @Column({ name: 'name', type: 'string' })
    name: string;

    @ApiProperty(utils.getApiProperty('email'))
    @Column({ name: 'email', type: 'string' })
    email: string;

    @ApiProperty(utils.getApiProperty('password'))
    @Column({ name: 'password', type: 'string' })
    password: string;

    @ApiProperty(utils.getApiProperty('role'))
    @Column({ name: 'role', type: 'string' })
    role: string;

    @ApiProperty(utils.getApiProperty('image'))
    @Column({ name: 'image', type: 'string' })
    image: string;
}