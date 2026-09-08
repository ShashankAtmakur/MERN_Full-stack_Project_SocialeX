import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profilePic: {
        type: String
    },
    about: {
        type: String
    },
    posts: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    notifications: {
        type: [{
            type: { type: String, required: true },
            message: { type: String, required: true },
            actorId: String,
            actorName: String,
            createdAt: { type: Date, default: Date.now },
            read: { type: Boolean, default: false }
        }],
        default: []
    }
});

const User = mongoose.model("users", userSchema);
export default User;