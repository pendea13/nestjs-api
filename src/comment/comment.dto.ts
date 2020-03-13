import {IsNotEmpty} from "class-validator";
import {UserResponseObject} from "../user/user.dto";
import {ApiProperty} from "@nestjs/swagger";

export class CommentDto {

    @ApiProperty()
    @IsNotEmpty()
    description:string;
}

export class CommentResponseObject {

    id?: string;

    description: string;

    author: UserResponseObject;

    updated: Date;

    created: Date;
}
