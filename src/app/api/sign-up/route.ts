import dbConnect from "@/src/lib/dbConnect"; 
import bcrypt from "bcryptjs";
import {sendVerificationEmail} from "@/src/helpers/sendVerificationEmail";
import UserModel from "@/src/modules/User";

export async function POST(request: Request) {

  try {
    await dbConnect();  
    const { username, email, password } = await request.json();
    const exixtingVerifiedByUserModel = await UserModel.findOne({username,isverified: true})
    if(exixtingVerifiedByUserModel){
        return Response.json(
            {
                success: false,
                message:"Username is already taken. Please choose a different username."
            },
            { status: 400 })
    }
   const existingUserByEmail = await UserModel.findOne({email})
   const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
   if (existingUserByEmail){
    if(existingUserByEmail.isVerified){
        return Response.json({
                success: false,
                message:"Email is already registered. Please use a different email address."
            },
            { status: 400 })
             }
             else{
                existingUserByEmail.username = username;
                const hashedPassword =  await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 1);
                existingUserByEmail.verifyCodeExpiration = expiryDate;
                await existingUserByEmail.save(); 
             }
}
else{
   const hashedPassword =  await bcrypt.hash(password, 10);
   const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    const newUser =new UserModel({
         username,
         email,
         password : hashedPassword,
         verifyCode,
         verifyCodeExpiration: expiryDate,
         isVerified:false,
         isAcceptingMessages:false,
         messages:[]

    })
  await newUser.save();
}
//send verification email
  const emailResponse = await sendVerificationEmail(
    email,
    verifyCode,
    username);
if(!emailResponse.success){
    return Response.json(
        {
            success: false,
            message:emailResponse.message
        },
        { status: 500 }
    )

}
return Response.json(
        {
            success: true,
            message:"User registered successfully. Please check your email for the verification code."
        },
        { status: 201}
    )

}
catch (error) {
    console.error("Error during sign-up:", error);
    return Response.json (
        {
            success: false,
            message:" An error occurred during sign-up. Please try again later."
        },
        { status: 500}
    )
  }     

}

