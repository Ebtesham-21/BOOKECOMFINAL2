"use client";

import { useSession } from "next-auth/react";
import Layout from "./components/Layout";


export default function ClientComponent() {
  const {data: session} = useSession();

 return(
  <Layout>
    <div className="font-bold text-2xl flex justify-between ">
      Admin: {session?.user?.name}
      <div>
         <img src={session?.user?.image} alt={session?.user?.name} className=" w-16 h-16 rounded-full" />
      </div>
      <span className="py-1 px-2">

      </span>
     
    </div>
  </Layout>
 );
}