import dbConnect from "@/src/lib/dbConnect";
import userModel from "@/src//modules/User";
import {z} from "zod";
import {usernameValidation} from "@/src/schemas/signUpSchema";

const  UsernameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request: Request){
    try{
        const {searchParams} = new URL(request.url);
        const queryParams ={
            username:searchParams.get("username") 
        } 
const result = UsernameQuerySchema.safeParse(queryParams);
   console.log(result);//todo remove this log
      if(!result.success){
        const usernameError = result.error.format().username?._errors || [];
        return Response.json({
            success:false,
            message:usernameError?.length>0 ? usernameError.join(', ') : "Invalid username format.", errors:usernameError},
            {status:400});
      }
      const {username} = result.data;
      const existingVerifiedUser = await userModel.findOne({username, isVerified:true});
      if(existingVerifiedUser){
        return Response.json({
            success:false,
            message:"Username is already taken by a verified user. Please choose a different username."
        },{
            status:409 })
      }
      return Response.json({
            success:true,
            message:"Username is available."
        },{
            status:200 })
       


    }
    catch(error){
        console.log("Error checking username uniqueness:", error);
        return Response.json({success:false,message:"An error occurred while checking username uniqueness.  Please try again later."
        },{status:500})
    }

}
