import { OmitType, ApiProperty } from "@nestjs/swagger";

import { utils } from '../helpers/utils.helpers.service';

export class UserDto {
    @ApiProperty(utils.getApiProperty('userId'))
    id: string;

    @ApiProperty(utils.getApiProperty('name'))
    name: string;

    @ApiProperty(utils.getApiProperty('email'))
    email: string;

    @ApiProperty(utils.getApiProperty('isEmailVerified'))
    isEmailVerified: boolean;

    @ApiProperty(utils.getApiProperty('role'))
    role: string;

    @ApiProperty(utils.getApiProperty('image'))
    image: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id', 'name']) {

    @ApiProperty(utils.getApiProperty('nameNew'))
    name: string;

    @ApiProperty(utils.getApiProperty('password'))
    password: string;
};

export class QueryGetUsersDto {
    @ApiProperty(utils.getApiProperty('skip'))
    skip: number;

    @ApiProperty(utils.getApiProperty('take'))
    take: number;
};

export class QueryUsersDto {
    @ApiProperty(utils.getApiProperty('skip'))
    skip: number;

    @ApiProperty(utils.getApiProperty('take'))
    take: number;
};

export class GetUsersDto {
    @ApiProperty({ required: true })
    count: number;

    @ApiProperty({ type: UserDto, isArray: true })
    data: UserDto[];
};

export class SignInDto {
    @ApiProperty(utils.getApiProperty('email'))
    email: string;

    @ApiProperty(utils.getApiProperty('password'))
    password: string;
}

export class SignInResponseDto extends UserDto {
    @ApiProperty({
        description: 'The auth token containing userId',
        example: 'jwt_token'
    })
    token: string;
};