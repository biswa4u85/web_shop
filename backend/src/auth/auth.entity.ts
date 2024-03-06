import { Entity, Column } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { utils } from '../utils/utils.service';

@Entity({ name: 'auth' })
export default class AuthEntity {

    @ApiProperty(utils.getApiProperty('email'))
    @Column({ name: 'email', type: 'string' })
    email: string;

    @ApiProperty(utils.getApiProperty('password'))
    @Column({ name: 'password', type: 'string' })
    password: string;
}