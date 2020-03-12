import {Body, Controller, Get, Param, Post, Put, Query, UseGuards, UsePipes} from '@nestjs/common';
import {PostService} from "./post.service";
import {AuthGuard} from "../auth/auth.gaurd";
import {ValidationPipe} from "../shared/validation.pipe";
import {User} from "../user/user.decorator";
import {PostDto} from "./post.dto";

@Controller()
export class PostController {
    constructor(private postService: PostService) {
    }

    @Get('api/posts')
    @UseGuards(new AuthGuard())
    showAllPosts(@Query('page') page?: number) {
        return this.postService.showAll(page);
    }

    @Get('api/post/:id')
    @UseGuards(new AuthGuard())
    show(@Param('id') id: string) {
        return this.postService.show(id);
    }

    @Post('api/post')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    create(@User('id') userId, @Body() data: PostDto) {
        return this.postService.create(userId, data);
    }

    @Put('api/post/:id')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: string, @User('id') userId, @Body() data: PostDto) {
        return this.postService.update(id, userId, data);
    }
}
