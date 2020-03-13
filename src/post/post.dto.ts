import {IsNotEmpty, IsString} from "class-validator";
import {CommentEntity} from "../comment/comment.entity";
import {UserResponseObject} from "../user/user.dto";
import {ApiProperty} from "@nestjs/swagger";

export class PostDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
}

export class PostResponseObject {

    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    author: UserResponseObject;

    @ApiProperty()
    comments?: CommentEntity[];

    @ApiProperty()
    updated: Date;

    @ApiProperty()
    created: Date;
}
