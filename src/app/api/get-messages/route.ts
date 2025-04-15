import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import UserModel from "@/model/user.model";

export async function GET(req: Request) {
    await dbConnect();
    console.log(req);
    
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User; //TypeScript type assertion => In next-auth, the session.user is typed very loosely (as DefaultUser), which may not include extra fields you added (like _id, username,isAcceptingMessage,isVerified ).

    if (!session || !session?.user) {
        return Response.json(
            {
                success: false,
                message: "User not found in session or session does not exists",
            },
            {
                status: 401,
            }
        );
    }
    const userID = new mongoose.Types.ObjectId(user._id); //👍tips
    
    try {
        
        const user = await UserModel.aggregate([
            { $match: { _id: userID } },
            { $unwind: "$messages" },
            { $sort: { "messages.createdAt": -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ]).exec(); 
        
        if (!user || user?.length == 0) {
            return Response.json(
                {
                    success: false,
                    message: "Something went wrong in finding user",
                },
                {
                    status: 401,
                }
            );
        }

        return Response.json(
            {
                success: true,
                messages:user[0].messages,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.log(error);
        
        return Response.json(
            {
                success: false,
                message: "Internal server error",
            },
            {
                status: 500,
            }
        );
    }
}
