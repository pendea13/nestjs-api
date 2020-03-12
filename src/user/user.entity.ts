import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    BeforeInsert,
    OneToMany,
    UpdateDateColumn
} from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {UserResponseObject} from "./user.dto";
import {CommentEntity} from "../comment/comment.entity";
import {PostEntity} from "../post/post.entity";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar",
        length: 75,
        unique: true
    })
    username: string;

    @Column('text')
    password: string;

    @OneToMany(type => PostEntity, post => post.author)
    posts: PostEntity[];

    @OneToMany(type => CommentEntity, comment => comment.author)
    comments: CommentEntity[];

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    created: Date;

    @UpdateDateColumn()
    updated: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    toResponseObject(showToken = false) {
        const { id, created, username } = this;
        const responseObject: UserResponseObject = { id, created, username };
        if(showToken) {
            responseObject.token = this.token;
        }
        return responseObject;
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }

    private get token() {
        const {id,username} = this;
        return jwt.sign({
            id,
            username
        }, process.env.SECRET,
            { expiresIn: '7d'},
            )
    }
}
