import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/model/user.model";
import mongoose from "mongoose";

export async function DELETE(
    request: Request,
    { params }: { params: { messageid: string } }
  ) {
    await dbConnect();
    console.log(request);
    
    const messageId = params.messageid;
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User; //TypeScript type assertion => In next-auth, the session.user is typed very loosely (as DefaultUser), which may not include extra fields you added (like _id, username,isAcceptingMessage,isVerified ).

    if (!session || !session?.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticated",
            },
            {
                status: 401,
            }
        );
    }
    const userID = new mongoose.Types.ObjectId(user._id); //👍tips
    try {
        const updateResult = await UserModel.updateOne(
            { _id: userID },
            { $pull: { messages: { _id: messageId } } }
        );
        if(updateResult.modifiedCount == 0) {
            return Response.json(
                {
                    success: false,
                    message: "Message not found or already deleted",
                },
                {
                    status: 404,
                }
            );
        }
        return Response.json(
            {
                success: true,
                message: "Message deleted",
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error in message deleting route",error);
        return Response.json(
            {
                success: false,
                message: "Error in deleting message",
            },
            {
                status: 500,
            }
        );
    }
}