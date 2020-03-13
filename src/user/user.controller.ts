import {Body, Controller, Get, Param, Post, UseGuards, UsePipes} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDto, UserResponseObject} from "./user.dto";
import {AuthGuard} from "../auth/auth.gaurd";
import {User} from "./user.decorator";
import {ValidationPipe} from "../shared/validation.pipe";
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";

@ApiTags('user')
@Controller()
export class UserController {
    constructor(private userService: UserService) {
    }

    @ApiOkResponse( {type:UserResponseObject})
    @ApiNotFoundResponse()
    @ApiBadRequestResponse()
    @Post('auth/login')
    @UsePipes(new ValidationPipe())
    login(@Body() data: UserDto) {
        return this.userService.login(data);
    }

    @ApiCreatedResponse({
        type: UserResponseObject,
    })
    @ApiBadRequestResponse()
    @Post('auth/register')
    @UsePipes(new ValidationPipe())
    register(@Body() data: UserDto) {
        return this.userService.register(data);
    }

    @ApiBearerAuth()
    @ApiOkResponse( {type: UserResponseObject, isArray:true})
    @Get('api/users')
    @UseGuards(new AuthGuard())
    showAllUsers(@User() user) {
        return this.userService.showAll();
    }
    @ApiOkResponse( {type: UserResponseObject})
    @ApiNotFoundResponse()
    @Get('api/users/:username')
    showOneUser(@Param('username') username: string) {
        return this.userService.read(username);
    }

    @ApiBearerAuth()
    @ApiOkResponse( {type: UserResponseObject})
    @Get('auth/whoami')
    @UseGuards(new AuthGuard())
    showMe(@User('username') username: string) {
        return this.userService.read(username);
    }
}
