 import dbconnect from "@/src/lib/dbConnect"
import userModel from "@/src/modules/User";
import {Message} from "@/src/modules/User";

export async function POST(request: Request) {
    await dbconnect();

    try {
        const data = await request.json();
        const { username, content } = data;

        if (!username || !content) {
            return Response.json({
                success: false,
                message: "Username and content are required" 
            }, { status: 400 });
        }

        const user = await userModel.findOne({ username });
        if (!user) {
            return Response.json({
                success: false,
                message: "User not found"
            }, { status: 404 });
        }

        if (!user.isAcceptingMessages) {
            return Response.json({
                success: false,
                message: "User does not accept messages"
            }, { status: 403 });
        }

        const newMessage = {
            createdAt: new Date(),
            content,
        };
        user.messages.push(newMessage as Message);
        await user.save();

        return Response.json({
            success: true,
            message: "Message prepared",
            data: newMessage
        }, { status: 201 });
    } catch (error) {
        console.error("Error in POST /api/send-message:", error);
        return Response.json({
            success: false,
            message: "Internal server error"
        }, { status: 500 });
    }
}
