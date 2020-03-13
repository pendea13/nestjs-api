import * as mongoose from 'mongoose';
import * as bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({

    username: String,

    password: String,

    // posts: [PostSchema],

    // comments: [CommentSchema],

    isActive: Boolean,

    created: Date,

    updated: Date,
});

UserSchema.pre('save', async function (next) {
// Hash the password before saving the user model
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next()
});
