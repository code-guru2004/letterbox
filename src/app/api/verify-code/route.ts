import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";



export async function POST(req : Request) {
    await dbConnect();

    try {
        const {username,code} = await req.json();
        //console.log(username,code);
        
        //const decodedUSername = decodeURIComponent(username);

        const userData = await UserModel.findOne({
            username
        });

        if( !userData ) {
            return Response.json({
                success: false,
                message: "User not found"
            },{
                status : 500
            })
        }
        if(userData?.isVerified){
            return Response.json({
                success: false,
                message: "User is already verified"
            },{
                status : 400
            })
        }
        const isCodeValid = userData?.verifyCode === code;
        const isCodeNOTExpired = userData?.verifyCodeExpiry > new Date();

        if( isCodeValid && isCodeNOTExpired ) {
            userData.isVerified = true;
            await userData.save();

            return Response.json({
                success: true,
                message: "User verification done"
            },{
                status : 200
            })
        }
        else if(!isCodeNOTExpired){
            return Response.json({
                success: false,
                message: "Opps! Verification code has expired."
            },{
                status : 400
            })
        }else{
            return Response.json({
                success: false,
                message: "Verification code is wrong."
            },{
                status : 400
            })
        }


    } catch (error) {
        console.error("Opps! Some Error found in verifying user",error)
        return Response.json({
            success: false,
            message: "Something went wrong in verifying user"
        },{
            status : 500
        })
    }
}