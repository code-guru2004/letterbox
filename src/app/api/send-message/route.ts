import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { Message } from "@/model/user.model";


export async function POST(req: Request) {
    await dbConnect();

    const { username, content } = await req.json();
    console.log(username, content);
    
    try {
        const user = await UserModel.findOne({username});
        console.log(user);
        
        if(!user){
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

        // is user accesting message
        if( !user?.isAcceptingMessage ) {
            return Response.json(
                {
                    success: false,
                    message: "User is not accepting message",
                },
                {
                    status: 403,
                }
            );
        }

        const newMessage = {content,createdAt:new Date()}

        user.messages.push(newMessage as Message)
        await user.save();

        return Response.json(
            {
                success: true,
                message: "Message send successfully",
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error in sending message",error)
        return Response.json(
            {
                success: false,
                message: "Something went wrong",
            },
            {
                status: 500,
            }
        );
    }
}