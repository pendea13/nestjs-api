import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CommentModule } from './comment/comment.module';
import {APP_FILTER, APP_INTERCEPTOR} from "@nestjs/core";
import {HttpErrorFilter} from "./shared/http-error.filter";
import {LoggingInterceptor} from "./shared/logging.interceptor";
import { PostModule } from './post/post.module';

@Module({
  imports: [
      CommentModule,
      UserModule,
    TypeOrmModule.forRoot(),
    CommentModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService,
      {
      provide:APP_FILTER,
      useClass:HttpErrorFilter
      },
      {
          provide: APP_INTERCEPTOR,
          useClass: LoggingInterceptor,
      }
  ],
})
export class AppModule {}
