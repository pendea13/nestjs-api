import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
      CommentModule,
      UserModule,
    TypeOrmModule.forRoot(),
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
