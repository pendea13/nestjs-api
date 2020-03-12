import {IsNotEmpty, IsString} from "class-validator";
import {CommentEntity} from "../comment/comment.entity";
import {UserResponseObject} from "../user/user.dto";

export class PostDto {

    @IsNotEmpty()
    @IsString()
    title:string;

    @IsNotEmpty()
    @IsString()
    description:string;
}
export class PostResponseObject {

    id: string;

    title: string;

    description: string;

    author: UserResponseObject;

    comments?: CommentEntity[];

    updated: Date;

    created: Date;
}
