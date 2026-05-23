import {resend} from "../lib/resend";
import VerificationEmail from "../../emails/verificationEmail";
import {apiResponse} from "../types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
):Promise<apiResponse> {
    try{
        await resend.emails.send({ 
            from: "onboarding@resend.dev",
            to: email,
            subject: "Mern-Stack || Verify your email address",
            react: VerificationEmail({username, otp: verifyCode})
        });
 return {
            success: true,
            message: "Verification email sent successfully"
        };
    }
    catch(error) {
        console.error("Error sending verification email:", error);
        return {
            success: false,
            message: "Failed to send verification email"
        };
    }
}
