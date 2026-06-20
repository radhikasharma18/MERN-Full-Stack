"use client"; 
import react from "react";
import link from "next/link";
import {useSession ,signOut} from "next-auth/react";
import {User} from "next-auth";
import { Button } from "./ui/button";



const Navbar = () => {
const {data:session} = useSession();
const user:User =  session?.user as User;
    return (
        <nav className="navbar">
           <div>
             <a href="#">Mystry Messages</a>
             {session ? (
               <div>
                 <p>Welcome, {user.username||user.name||user.email}!</p>
                 <button onClick={() => signOut()}>Sign Out</button>
               </div>
             ):(<link href="/sign-in" ><Button>Login</Button></link>)}
           </div>
           
             
        </nav>
    )   

}
export default Navbar;