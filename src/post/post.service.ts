import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {PostEntity} from "./post.entity";
import {PostDto, PostResponseObject} from "./post.dto";

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {
    }

    async showAll(page = 1,newest?: boolean): Promise<PostResponseObject[]>{
        const posts = await this.postRepository.find(
            {
                relations:['author'],
                take: 25,
                skip: 25 * (page - 1),
                order: newest && { created: 'DESC' }
            }
            );

        return posts.map(post => post.toResponseObject());
    }

    async show(id: string): Promise<PostResponseObject> {
        const post = await this.postRepository.findOne(
            {where:{id}, relations: ['author', 'comments', 'comments.author']}
            );

        return post.toResponseObject();
    }

    async create(userId: string, data: PostDto): Promise<PostResponseObject> {
        const user = await this.userRepository.findOne({where:{id: userId}});
        const post = await this.postRepository.create({...data, author: user});
        await this.postRepository.save(post);

        return post.toResponseObject();
    }

    async update(id: string, userId: string, data: Partial<PostDto>): Promise<PostResponseObject> {
        let post = await this.postRepository.findOne({where:{id, author:userId}});
        if(!post) {
            throw  new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        await this.postRepository.update({id}, data);

        post = await this.postRepository.findOne({where: {id},relations: ['author', 'comments', 'comments.author']});

        return post.toResponseObject();
    }
}
