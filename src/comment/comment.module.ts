import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CommentEntity} from "./comment.entity";
import {UserEntity} from "../user/user.entity";
import {UserService} from "../user/user.service";

@Module({
  imports:[TypeOrmModule.forFeature([CommentEntity, UserEntity])],
  providers: [CommentService, UserService],
  controllers: [CommentController]
})
export class CommentModule {}
