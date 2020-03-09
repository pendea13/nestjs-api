import {Body, Controller, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {AuthGuard} from "../auth/auth.gaurd";
import {User} from "../user/user.decorator";
import {CommentDto} from "./comment.dto";
import {CommentService} from "./comment.service";

@Controller('api/comment')
export class CommentController {
    constructor(
        private userService: UserService,
        private commentService: CommentService
    ) {
    }

    @Post()
    @UseGuards(new AuthGuard())
    create(@User('id') userId, @Body() data: CommentDto) {
        return this.commentService.create(userId, data);
    }

    @Get()
    showAll(){
        return this.commentService.showAll();
    }

    @Get(':id')
    show(@Param('id') id: string){
        return this.commentService.show(id);
    }

    @Put(':id')
    @UseGuards(new AuthGuard())
    update(@Param('id') id: string, @User('id') userId, @Body() data: CommentDto) {
        return this.commentService.update(id, userId, data);
    }
}
