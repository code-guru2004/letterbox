import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/user.model";
import { User } from "next-auth";

export async function POST(req: Request) {
    await dbConnect();
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
    const userID = user._id;
    const { acceptingMessage } = await req.json(); //true or false
    
    
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userID,
            { isAcceptingMessage: acceptingMessage },
            { new: true }
          );
        //console.log(updatedUser);
        
        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                {
                    status: 401,
                }
            );
        }

        return Response.json(
            {
                success: true,
                message: "Toggle successfully",
                updatedUser
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Failed to toggle user accepting message", error);
        return Response.json(
            {
                success: false,
                message: "Error updating message acceptance status",
            },
            {
                status: 500,
            }
        );
    }
}

export async function GET( req: Request ) {
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
    const userID = user._id;
    try {
        const user = await UserModel.findById(userID);
        if( !user ){
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                {
                    status: 404,
                }
            );
        }
        return Response.json(
            {
                success: true,
                message: "User Found",
                isAcceptingMessage : user.isAcceptingMessage
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("No updated user", error);
        return Response.json(
            {
                success: false,
                message: "Something went wrong in finding user",
            },
            {
                status: 500,
            }
        );
    }

}
