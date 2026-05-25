import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/src/lib/dbConnect";
import bcrypt from "bcryptjs";
import UserModel from "@/src/modules/User";
import credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                Email:{label:"Email", type: "text", placeholder:"Enter your email"},
                password:{label:"Password",type:"password",placeholder:"Enter your password"}
        },
        async authorize(credentials:any):Promise<any>{
            await dbConnect();
             try {
                const user = await UserModel.findOne({
                    $or: [
                        { email: credentials.identifier },
                        { username: credentials.identifier }
                    ]
                });
                if (!user) {
                    throw new Error("No user found with the provided email or username");
                }
                if (!user.isVerified) {
                    throw new Error("Please verify your email before logging in");
                }
                const isPasswordcorrect = await bcrypt.compare(credentials.password, user.password);
                if (isPasswordcorrect) {
                    return user;
                } else {
                    throw new Error("Invalid password");
                }
            } catch (error: any) {
                console.error("Error during authentication:", error);
                return null;
            }

         }
})
    ],
    callbacks:{
       
       async jwt({token, user}){
       if (user) {
             token._id = user._id.toString();
             token.verified = user.isVerified;
             token.acceptingMessages = user.isAcceptingMessages;
             token.username = user.username;
}

return token;
         },
          async session({session, token}){
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }

            return session;
        },
    },
    pages:{
        signIn:"/sign-in",
    },
    session:{
        strategy:"jwt",
    },
    secret:process.env.NEXTAUTH_SECRET,
}
