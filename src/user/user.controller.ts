import {Body, Controller, Get, Param, Post, UseGuards, UsePipes} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDto} from "./user.dto";
import {AuthGuard} from "../auth/auth.gaurd";
import {User} from "./user.decorator";
import {ValidationPipe} from "../shared/validation.pipe";

@Controller()
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    login(@Body() data: UserDto) {
        return this.userService.login(data);
    }

    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() data: UserDto) {
        return this.userService.register(data);
    }

    @Get('api/users')
    @UseGuards(new AuthGuard())
    showAllUsers(@User() user) {
        return this.userService.showAll();
    }

    @Get('api/users/:username')
    showOneUser(@Param('username') username: string) {
        return this.userService.read(username);
    }

    @Get('auth/whoami')
    @UseGuards(new AuthGuard())
    showMe(@User('username') username: string) {
        return this.userService.read(username);
    }
}
