import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDto} from "./user.dto";
import {AuthGuard} from "../auth/auth.gaurd";
import {User} from "./user.decorator";

@Controller()
export class UserController {
    constructor(private userService: UserService) {
    }

    @Post('login')
    login(@Body() data: UserDto) {
        return this.userService.login(data);
    }

    @Post('register')
    register(@Body() data: UserDto) {
        return this.userService.register(data);
    }

    @Get('api/users')
    @UseGuards(new AuthGuard())
    showAllUsers(@User() user) {
        return this.userService.showAll();
    }
}
