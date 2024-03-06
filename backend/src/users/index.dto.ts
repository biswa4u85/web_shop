import { OmitType } from "@nestjs/swagger";

import UsersEntity from "./users.entity";

export class UserDto extends UsersEntity { };

export class CreateUserDto extends OmitType(UserDto, ['id']) { };
export class UpdateUserDto extends OmitType(UserDto, ['id']) { };