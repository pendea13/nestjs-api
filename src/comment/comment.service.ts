import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CommentEntity} from "./comment.entity";
import {UserResponseObject} from "../user/user.dto";
import {CommentDto, CommentResponseObject} from "./comment.dto";
import {UserEntity} from "../user/user.entity";

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private commentRepository: Repository<CommentEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {
    }

    async showAll(page = 1,newest?: boolean): Promise<CommentResponseObject[]> {
        const comments = await this.commentRepository.find(
            {
                relations: ['author'],
                take: 25,
                skip: 25 * (page - 1),
                order: newest && { created: 'DESC' },
            }
            );
        return comments.map( comment => comment.toResponseObject());
    }

    async show(id: string): Promise<CommentResponseObject> {
        const comment = await this.commentRepository.findOne({where:{id}, relations: ['author']});
        return comment.toResponseObject();
    }

    /**
     *
     * @param userId
     * @param data
     */
    async create(userId: string, data: CommentDto): Promise<CommentResponseObject> {
        const user = await this.userRepository.findOne({where:{id: userId}});
        const comment = await this.commentRepository.create({...data, author: user});
        await this.commentRepository.save(comment);

        return comment.toResponseObject();
    }

    /**
     * @param id
     * @param userId
     * @param data
     */
    async update(id: string, userId: string, data: CommentDto) {
        let comment = await this.commentRepository.findOne({where:{id, author:userId},relations: ['author']});
        if(!comment) {
            throw  new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        await this.commentRepository.update({id}, data);

        comment = await this.commentRepository.findOne({where: {id},relations: ['author']});

        return comment.toResponseObject();
    }
}
