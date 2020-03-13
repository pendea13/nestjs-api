import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UserDto {

    @ApiProperty()
    @IsNotEmpty()
    username:string;

    @ApiProperty()
    @IsNotEmpty()
    password:string;
}

export class UserResponseObject {

    @ApiProperty()
    id: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    created: Date;

    @ApiProperty()
    token?: string;
}
