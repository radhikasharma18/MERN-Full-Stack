import {getServerSession} from "next-auth";
import {authOptions} from "../../auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbConnect";
import userModel from "@/src/modules/User";
import { User } from "next-auth";
import mongoose from "mongoose";
import UserModel from "@/src/modules/User";


export async function DELETE(request: Request,{params}: { params: { messageid: string } }) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const messageId = params.messageid;
   

    if (!session || !session.user) {
        return Response.json({
            message: "Unauthorized"
        }, { status: 401 });
    }
    try{
        // remove message from user's messages array
        const userId = (session.user as any).id || (session.user as any)._id;
        const filter = { _id: new mongoose.Types.ObjectId(userId) };
        // assume messages stored as ObjectId references; adjust if messages are subdocs
        const update = { $pull: { messages: new mongoose.Types.ObjectId(messageId) } };

        const res = await UserModel.updateOne(filter, update);
        if (res.modifiedCount === 0) {
            return Response.json({ message: "Message not found or not deleted" }, { status: 404 });
        }

        return Response.json({ message: "Message deleted" }, { status: 200 });

    } catch (error) {
        return Response.json({ message: "Server error" , error: String(error) }, { status: 500 });
    }

  

}