import { OmitType, ApiProperty } from "@nestjs/swagger";

import { utils } from '../helpers/utils.helpers.service';

export class UsersDto {
    @ApiProperty(utils.getApiProperty('userId'))
    id: string;

    @ApiProperty(utils.getApiProperty('nameNew'))
    name: string;

    @ApiProperty(utils.getApiProperty('email'))
    email: string;

    @ApiProperty(utils.getApiProperty('password'))
    password: string;

    @ApiProperty(utils.getApiProperty('isEmailVerified'))
    isEmailVerified: boolean;

    @ApiProperty(utils.getApiProperty('role'))
    role: string;

    @ApiProperty(utils.getApiProperty('image'))
    image: string;

    @ApiProperty(utils.getApiProperty('image'))
    token: string;
}

export class CreateUserDto extends OmitType(UsersDto, ['id']) { };
export class UpdateUserDto extends OmitType(UsersDto, ['id']) { };

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

    @ApiProperty({ type: UsersDto, isArray: true })
    data: UsersDto[];
};

export class SignInDto {
    @ApiProperty(utils.getApiProperty('email'))
    email: string;

    @ApiProperty(utils.getApiProperty('password'))
    password: string;
}

export class SignInResponseDto extends UsersDto {
    @ApiProperty({
        description: 'The auth token containing userId',
        example: 'jwt_token'
    })
    token: string;
};