import dbConnect from "@/src/lib/dbConnect";
import userModel from "@/src//modules/User";



export async function POST(request: Request){
    await dbConnect();
    try{
        const {username, code} =  await request.json();  
        const decodedUsername = decodeURIComponent(username) 
        const user = await userModel.findOne({username:decodedUsername, verifyCode:code})

    if(!user){
        return Response.json({
            success:false,
            message:"Invalid verification code or username."

        },{status:400})
     }
     const isCodeValid = user.verifyCode === code;
     const isCodeNotExpired = new Date(user.verifyCodeExpiration) > new Date();

     if(isCodeValid && !isCodeNotExpired){
        user.isVerified = true;
        user.verifyCode = "";
        await user.save();
        return Response.json({
            success:true,
            message:"Your account has been successfully verified. You can now log in."
        },{status:200})
     }
     else if(!isCodeNotExpired){
        return Response.json({
            success:false,
            message:"Verification code has expired. Please request a new code."
        },{status:400})
     }
     else{
        return Response.json({
            success:false,
            message:"invalid verfication code. Please check the code and try again."
        },{status:400})
     }

        }


            catch(error){
        console.log("Error verifying code:",error);
        return Response.json(
            {
            success:false,
            message:"An error occurred while verifying the code. Please try again later."
        },{
            status:500
        })
    }
}


