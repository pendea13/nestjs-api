import {Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, UpdateDateColumn} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {UserResponseObject} from "../user/user.dto";
import {CommentResponseObject} from "./comment.dto";

@Entity('comment')
export class CommentEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("varchar")
    description: string;

    @ManyToOne(type => UserEntity, author => author.comments)
    author: UserEntity;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    toResponseObject(): CommentResponseObject {
        return {...this, author: this.author.toResponseObject()};
    }
}