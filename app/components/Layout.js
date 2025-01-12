"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Nav from "./Nav";

export default function Layout({children}) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-red-600 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">
            Login With Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="bg-red-600 min-h-screen text-white flex">
      <Nav/>
      <div className="bg-white flex-grow text-black mt-2 mr-2 mb-0 p-10 rounded-lg p-4">

      <p>{children}</p>
      <button className="py-6 my-6" onClick={() => signOut()}>Sign out</button>
      </div>
  

    </div>
  
    </>
  );
}