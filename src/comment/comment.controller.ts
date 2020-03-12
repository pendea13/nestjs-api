import {Body, Controller, Get, Param, Post, Put, Query, UseGuards, UsePipes} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {AuthGuard} from "../auth/auth.gaurd";
import {User} from "../user/user.decorator";
import {CommentDto} from "./comment.dto";
import {CommentService} from "./comment.service";
import {ValidationPipe} from "../shared/validation.pipe";

@Controller('api/comment')
export class CommentController {
    constructor(
        private userService: UserService,
        private commentService: CommentService
    ) {
    }

    @Post(':postId')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    create(@User('id') userId, @Param('postId') postId: string, @Body() data: CommentDto) {
        return this.commentService.create(userId, postId, data);
    }

    @Get()
    @UseGuards(new AuthGuard())
    showAll(@Query('page') page?: number){
        return this.commentService.showAll(page);
    }

    @Get(':id')
    show(@Param('id') id: string){
        return this.commentService.show(id);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: string, @User('id') userId, @Body() data: CommentDto) {
        return this.commentService.update(id, userId, data);
    }
}
