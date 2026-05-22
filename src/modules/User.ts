import mongoose, { Schema, Document } from "mongoose";
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
    isVerified:boolean;
    isAcceptingMessages:boolean;
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
        required:[true,"Email is required"],
        match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,"Please provide a valid email address"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    verifyCode:{
        type:String,
        required:[true,"Verify code is required"]
    },
     isVerified:{
        type:Boolean,
        default:false
    },
      isAcceptingMessages:{
        type:Boolean,
        default:true
    },
    verifyCodeExpiration:{
        type:Date,
        required:[true,"Verify code expiration is required"]
    },
    messages:[MessageSchema]
})   

const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>("User",UserSchema);

export default UserModel;