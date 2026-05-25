'use client';
import {useSession,signIn, signOut} from 'next-auth/react';

export default function page() {
    const {data:session} = useSession();
  return (  
    <div>
        <h1>Sign In Page</h1>
        {session ? (
            <div>
                <p>Welcome, {session.user?.name}</p>
                <button onClick={() => signOut()}>Sign Out</button>
            </div>  
        ) : (
            <div>
                <p>You are not signed in.</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded"  onClick={() => signIn()}>Sign In</button>
            </div>
        )}
    </div>
  )
}