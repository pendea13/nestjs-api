import {Body, Controller, Get, Param, Post, Put, Query, UseGuards, UsePipes} from '@nestjs/common';
import {PostService} from "./post.service";
import {AuthGuard} from "../auth/auth.gaurd";
import {ValidationPipe} from "../shared/validation.pipe";
import {User} from "../user/user.decorator";
import {PostDto, PostResponseObject} from "./post.dto";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('post')
@Controller()
export class PostController {
    constructor(private postService: PostService) {
    }

    @ApiOkResponse( {type: PostResponseObject, isArray:true})
    @Get('api/posts')
    @UseGuards(new AuthGuard())
    showAllPosts(@Query('page') page?: number) {
        return this.postService.showAll(page);
    }

    @ApiOkResponse( {type: PostResponseObject})
    @ApiNotFoundResponse()
    @Get('api/post/:id')
    @UseGuards(new AuthGuard())
    show(@Param('id') id: string) {
        return this.postService.show(id);
    }

    @ApiCreatedResponse({
        type: PostResponseObject,
    })
    @ApiBadRequestResponse()
    @Post('api/post')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    create(@User('id') userId, @Body() data: PostDto) {
        return this.postService.create(userId, data);
    }

    @ApiOkResponse( {type: PostResponseObject})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @Put('api/post/:id')
    @UseGuards(new AuthGuard())
    @UsePipes(new ValidationPipe())
    update(@Param('id') id: string, @User('id') userId, @Body() data: PostDto) {
        return this.postService.update(id, userId, data);
    }
}
