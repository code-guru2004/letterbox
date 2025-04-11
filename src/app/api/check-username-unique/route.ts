import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";

import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const UsernameQuesrySchema = z.object({
    username: usernameValidation,

})

export async function GET(req:Request) {
    
    await dbConnect();

    try {   
    
        // http://localhost:3000/api/check-username-unique?username=nayan
        const {searchParams} = new URL(req.url);
        // console.log(searchParams); //{ 'username' => 'test01' }
        
        const queryParam = { username: searchParams.get('username') }
        //console.log(queryParam.username);

        const result = UsernameQuesrySchema.safeParse(queryParam);
        console.log("result",result); // result->➡️ {success-true/false , data: { username: 'nayan' } , error: [Getter]}

        if(!result.success) {
            const usernameError = result.error.format().username?._errors || [];
            // [
            //     'Username must be atleast 3 characters',
            //     'Username must be atmost 20 characters'
            // ]


            // console.log(usernameError);
            return Response.json({
                success : false,
                message : 'Username must be 3-20 characters long and contain only letters, numbers, or underscores'
            },{
                status : 400
            })
        }

        const { username } = result.data; //data: { username: 'nayan' }
        const isExistUsername = await UserModel.findOne({
                username,
                isVerified: true
            });
        if(isExistUsername){
            return Response.json({
                success: false,
                message: 'Ohh! username is already taken'
            },{
                status : 400
            })
        }
        return Response.json({
            success: true,
            message: 'Valid Username'
        },{
            status : 200
        })

    } catch (error) {
        console.error("Error in check username",error);

        return Response.json({
            success: false,
            message:"Error in checking username"
        },{status:500})
    }
}
