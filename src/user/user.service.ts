import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from "./user.entity";
import {Repository} from  "typeorm";
import {UserDto, UserResponseObject} from "./user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
            private userRepository: Repository<UserEntity>,
    ) {
    }

    async login(data: UserDto): Promise<UserResponseObject> {
        const {username, password} = data;
        const user = await this.userRepository.findOne({where:{username, isActive: true},});
        if(!user || !(await user.comparePassword(password))) {
            throw new HttpException('Invalid username/password',
                HttpStatus.BAD_REQUEST,
            );
        }
        return user.toResponseObject(true);
    }

    async showAll(): Promise<UserResponseObject[]> {
        const users = await this.userRepository.find();
        return users.map(user => user.toResponseObject());
    }

    async register(data: UserDto): Promise<UserResponseObject> {
        const {username} = data;
        let user = await this.userRepository.findOne({where:{username}});
        if (user) {
            throw new HttpException('User already exist',
                HttpStatus.BAD_REQUEST,
            );
        }
        user = await this.userRepository.create(data);
        await this.userRepository.save(user);

        return user.toResponseObject();
    }

    async read(username: string) {
        const user = await this.userRepository.findOne({
            where: { username },
            relations: ['comments'],
        });
        return user.toResponseObject();
    }
}
