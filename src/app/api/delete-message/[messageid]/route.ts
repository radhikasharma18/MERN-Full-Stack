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

    if (!session || !session.user) {
        return Response.json({
            message: "Unauthorized"
        }, { status: 401 });
    }

    const user = session.user as User;
    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        await UserModel.updateOne(
            { _id: userId },
            { $pull: { messages: { _id: new mongoose.Types.ObjectId(params.messageid) } } }
        );
        const { messageid } = params;

        const dbUser = await userModel.findById(userId);
        if (!dbUser) {
            return Response.json({
                message: "User not found"
            }, { status: 404 });
        }

        const messageIndex = dbUser.messages.findIndex((msg: any) => msg._id.toString() === messageid);
        if (messageIndex === -1) {
            return Response.json({
                message: "Message not found"
            }, { status: 404 });
        }

        dbUser.messages.splice(messageIndex, 1);
        await dbUser.save();

            return Response.json({
                message: "Message deleted successfully"
            }, { status: 200 });
        } catch (error) {
            return Response.json({
                message: "Error deleting message"
            }, { status: 500 });
        }

}