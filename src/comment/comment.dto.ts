import {IsNotEmpty} from "class-validator";
import {UserResponseObject} from "../user/user.dto";

export class CommentDto {

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