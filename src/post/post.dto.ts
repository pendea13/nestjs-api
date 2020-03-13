import {IsNotEmpty, IsString} from "class-validator";
import {CommentEntity} from "../comment/comment.entity";
import {UserResponseObject} from "../user/user.dto";
import {ApiProperty} from "@nestjs/swagger";

export class PostDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title:string;

    @ApiProperty()
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
