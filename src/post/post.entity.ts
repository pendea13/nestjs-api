import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {CommentEntity} from "../comment/comment.entity";
import {PostResponseObject} from "./post.dto";

@Entity('post')
export class PostEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar",
        length: 75
    })
    title: string;

    @Column({
        type: "varchar",
        length: 255
    })
    description: string;

    @ManyToOne(type => UserEntity, author => author.posts)
    author: UserEntity;

    @OneToMany(type => CommentEntity, comment => comment.post)
    comments: CommentEntity[];

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    toResponseObject(): PostResponseObject {
        return {
            ...this,
            author: this.author.toResponseObject(),
            comments: this.comments !== undefined ? this.comments.map(comment => comment.toResponseObject()) : []
        };
    }
}
