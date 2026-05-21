import { Schema, Document } from "mongoose";
export interface Message extends Document{
    content: string;
    createdAt: Date;
}
const MessageSchema = new Schema<Message>({
    content:{
        type:String,
        required:true
    },

        createdAt:{
            type:Date,
            required:true,
            default:Date.now
        }
    

})
export interface User extends Document{
    username: string;
    email:string;
    password:string;
    verifyCode:string;
    verifyCodeExpiration:Date;
    messages:Message[];
}
const UserSchema = new Schema<User>({
    username:{
        type:String,
        unique:true,
        required:[true,"Username is required"],
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    verifyCode:{
        type:String,
        required:[true,"Verify code is required"]
    },
    verifyCodeExpiration:{
        type:Date,
        required:[true,"Verify code expiration is required"]
    },
    messages:{
        type:[MessageSchema],
        required:[true,"Messages are required"]
    }
})        