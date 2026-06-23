"use client"; 
import react from "react";
import Link from "next/link";
import {useSession ,signOut} from "next-auth/react";
import {User} from "next-auth";
import { Button } from "./ui/button";



const Navbar = () => {
const {data:session} = useSession();
const user:User =  session?.user as User;
    return (
        <nav className="p-4 md:p-6 shadow-md ">
           <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
             <a className="text-xl font-bold mb-4 md:mb-0" href="#">
               Mystery Messages
             </a>
             {session ? (
               <div>
                 <p className="mr-4">Welcome, {user.username||user.name||user.email}!</p>
                 <button className="w-full md:w-auto bg-black hover:bg-black/50 text-white font-bold py-2 px-4 rounded" onClick={() => signOut()}>Sign Out</button>
               </div>
             ):(
             <Link href="/sign-in" >
                <Button className="bg-black hover:bg-black/50 text-white">Log In</Button>
                </Link>)}
           </div>
           
             
        </nav>
    )   

}
export default Navbar;