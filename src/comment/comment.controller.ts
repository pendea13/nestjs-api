import {Body, Controller, Get, Param, Post, Put, Query, UseGuards, UsePipes} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {AuthGuard} from "../auth/auth.gaurd";
import {User} from "../user/user.decorator";
import {CommentDto, CommentResponseObject} from "./comment.dto";
import {CommentService} from "./comment.service";
import {ValidationPipe} from "../shared/validation.pipe";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";
import {PostResponseObject} from "../post/post.dto";

@ApiBearerAuth()
@ApiTags('comment')
@Controller('api/comment')
export class CommentController {
    constructor(
        private userService: UserService,
        private commentService: CommentService
    ) {
    }

    @ApiCreatedResponse({type:CommentResponseObject})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @Post(':postId')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    create(@User('id') userId, @Param('postId') postId: string, @Body() data: CommentDto) {
        return this.commentService.create(userId, postId, data);
    }

    @ApiOkResponse( {type: CommentResponseObject, isArray:true})
    @Get()
    @UseGuards(new AuthGuard())
    showAll(@Query('page') page?: number){
        return this.commentService.showAll(page);
    }

    @ApiOkResponse( {type: CommentResponseObject})
    @ApiNotFoundResponse()
    @Get(':id')
    show(@Param('id') id: string){
        return this.commentService.show(id);
    }

    @ApiOkResponse( {type: CommentResponseObject})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @Put(':id')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: string, @User('id') userId, @Body() data: CommentDto) {
        return this.commentService.update(id, userId, data);
    }
}
