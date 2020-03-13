import { Model } from 'mongoose';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {UserDto, UserResponseObject} from "./user.dto";
import {UserInterface} from "./user.interface";

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User')
            private userModel: Model<UserInterface>,
    ) {
    }

    async login(data: UserDto): Promise<UserResponseObject> {
        const {username, password} = data;
        const user = this.userModel.findOne({username, isActive: true});
        if(!user || !(await user.comparePassword(password))) {
            throw new HttpException('Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return user.toResponseObject(true);
    }

    async showAll(): Promise<UserResponseObject[]> {
        const users = await this.userModel.find();
        return users.map(user => user.toResponseObject());
    }

    async register(data: UserDto): Promise<UserResponseObject> {
        const {username} = data;
        let user = await this.userModel.findOne({where:{username}});
        if (user) {
            throw new HttpException('User already exist',
                HttpStatus.BAD_REQUEST,
            );
        }
        user = await this.userModel.create(data);
        await this.userModel.save(user);

        return user.toResponseObject();
    }

    async read(username: string) {
        const user = await this.userModel.findOne({
            where: { username }
        });
        return user.toResponseObject();
    }
}
