import {getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbConnect";
import userModel from "@/src/modules/User";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return Response.json({
            message: "Unauthorized"
        }, { status: 401 });
    }

    const user = session.user as User;
    const userId = user._id;
    const acceptMessages = await request.json();

    try{
        const updatedUser = await userModel.findByIdAndUpdate(userId,
            { isAcceptingMessages: acceptMessages }, 
            { new: true });
        if (!updatedUser) {
            return Response.json({
                message: "User not found"

            }, { status: 404 });

        }
        return Response.json({
            success: true,
            message: "Accept messages updated successfully",
            updatedUser 
        }, { status: 200 });
    }
    catch(error) { 
        console.log("Error updating acceptMessages:", error);
        return Response.json({
            message: "Unauthorized"
        }, { status: 500 });
    }
}

export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user as User;
    if(!session || !session.user) {
        return Response.json({
            message: "Unauthorized"
        }, { status: 401 });
    }

    const userId = user._id;
   try{
     const foundUser = await userModel.findById(userId);
     if (!foundUser) {
        return Response.json({
            success: false,
            message: "User not found"
        }, { status: 401 });
    }
     return Response.json({
            success: true,
            isAcceptingMessages: foundUser.isAcceptingMessages,
            message: "User found",
            user: foundUser
        }, { status: 200 });
   }
    catch(error) {
        console.log("Error fetching user:", error);
        return Response.json({
            message: "Unauthorized"
        }, { status: 500 });

    }

}


