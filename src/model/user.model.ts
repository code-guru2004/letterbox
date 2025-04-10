import mongoose,{Schema,Document} from "mongoose";

// Message Schema
export interface Message extends Document{
    content: string, //message content
    createdAt: Date
}

const MessageSchema : Schema<Message> = new Schema({
    content: {
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    }
});

// User Schema
export interface User extends Document{
    username: string, //message content
    email: string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    isVerified:boolean,
    isAcceptingMessage:boolean,
    messages: Message[] //Message type array - content , createdAt
}

const UserSchema : Schema<User> = new Schema({
    username: {
        type:String,
        required:[true , 'Username is required'],
        trim:true,
        unique:true
    },
    email:{
        type: String,
        required: [true,'email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password:{
        type: String,
        required: true
    },
    verifyCode:{
        type: String,
        required: [true,"Please Provide Verification Code"]
    },
    verifyCodeExpiry:{
        type: Date,
        required:[true,'Verify code expiry is required']
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAcceptingMessage:{
        type:Boolean,
        default:true
    },
    messages:{
        type: [MessageSchema]
    }
});

const UserModel = (mongoose.models.Use as mongoose.Model<User>) ||  mongoose.model<User>('User',UserSchema);

export default UserModel;