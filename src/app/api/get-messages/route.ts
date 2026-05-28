import {getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbConnect";
import userModel from "@/src/modules/User";
import { User } from "next-auth";
import mongoose from "mongoose";


export async function GET(request: Request) {

    await dbConnect();
    const session = await getServerSession(authOptions);

    if(!session || !session.user) {
        return Response.json({
            message: "Unauthorized"
        }, { status: 401 });
    }

    const userId = new mongoose.Types.ObjectId(session.user._id);
    try{
        const user = await userModel.aggregate([
            { $match: { _id: userId } },
            { $unwind:'$messages' },
            { $sort: { 'messages.createdAt': -1 } }, 
            {$group: {
                _id: '$_id',
                messages: { $push: '$messages' },
            }},
            { $project: { _id: 1, messages: 1 } }
        ]);
        if (!user || user.length === 0) {
            return Response.json({
                success: false,
                message: "No messages found"
            }, { status: 404 });
        }
         return Response.json({
                success: true,
                message: user[0].messages
            }, { status: 200 });

    }catch(error) {
        return Response.json({
            success: false,
            message: "Error fetching messages"
        }, { status: 500 });
    }

}