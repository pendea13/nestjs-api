import {IsNotEmpty} from "class-validator";
import {UserResponseObject} from "../user/user.dto";
import {ApiProperty} from "@nestjs/swagger";

export class CommentDto {

    @ApiProperty()
    @IsNotEmpty()
    description: string;
}

export class CommentResponseObject {

    @ApiProperty()
    id?: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    author: UserResponseObject;

    @ApiProperty()
    updated: Date;

    @ApiProperty()
    created: Date;
}
