// import dbConnect from "@/lib/dbConnect";
// import UserModel from "@/model/user.model";
// import bcrypt from "bcryptjs";

// import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

// export async function POST(req: Request) {
//   await dbConnect();

//   try {
//     const { username, email, password } = await req.json();
    
//     const existingVerifiedUserByUsername = await UserModel.findOne({
//       username,
//       isVerified: true,
//     });

//     if (existingVerifiedUserByUsername) {
//       return Response.json(
//         {
//           success: false,
//           message: "username is already exist",
//         },
//         { status: 400 }
//       );
//     }

//     let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
//     const existingUserByEmail = await UserModel.findOne({email})

//     if (existingUserByEmail) {
//       if(existingUserByEmail.isVerified){
//         return Response.json(
//           {
//             success: false,
//             message: 'User already exists with this email',
//           },
//           { status: 400 }
//         );
//       } else {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         existingUserByEmail.password = hashedPassword;
//         existingUserByEmail.verifyCode = verifyCode;
//         existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
//         await existingUserByEmail.save();
//       }
//     } else {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const expiryDate = new Date();
//         expiryDate.setHours(expiryDate.getHours() + 1);
//         const newUser = new UserModel({
//           username: username, //message content
//           email: email,
//           password: hashedPassword,
//           verifyCode,
//           verifyCodeExpiry: expiryDate,
//           isVerified: false,
//           isAcceptingMessage: true,
//           messages: [],
//         });
//         await newUser.save();
//       }
//       // send verification email
//       const EmailResponse = await sendVerificationEmail(
//         email,
//         username,
//         verifyCode
//       );

//       if (!EmailResponse.success) {
//         return Response.json(
//           {
//             success: false,
//             message: EmailResponse.message,
//           },
//           { status: 500 }
//         );
//       }

//       return Response.json(
//         {
//           success: true,
//           message: "User register successfully. Please verify user.",
//         },
//         { status: 201 }
//       );
    
//   } catch (error) {
//     console.error("Error Registering user", error);
//     return Response.json(
//       {
//         success: false,
//         message: "Error in Sign-up user",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const existingVerifiedUserByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUserByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: 'User already exists with this email',
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
          username: username, //message content
          email: email,
          password: hashedPassword,
          verifyCode,
          verifyCodeExpiry: expiryDate,
          isVerified: false,
          isAcceptingMessage: true,
          messages: [],
      });

      await newUser.save();
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
