import {Document} from 'mongoose';

export interface UserInterface extends Document {

    readonly username: string,

    readonly password: string,

    // readonly posts: [PostSchema],

    // readonly comments: [CommentSchema],

    readonly isActive: boolean,

    readonly created: Date,

    readonly updated: Date,
}
