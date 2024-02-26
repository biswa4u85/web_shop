import { PartialType } from '@nestjs/mapped-types';

class CreateUserDto {

}

class UpdateUserDto extends PartialType(CreateUserDto) {

}

export {
    CreateUserDto,
    UpdateUserDto
}