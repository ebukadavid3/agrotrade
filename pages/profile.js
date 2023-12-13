import Head from "next/head";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function Profile() {
    return (
        <>
        <Head>
            <link rel="icon" href="/AGROTRADE.png" />
            <title>Profile | AgroTrade</title>
        </Head>
        <main className="h-screen flex justify-center items-center py-20 px-3 md:px-0">
            <div>
                <Button 
                variant="outlined"
                onClick={() => signOut()}>Sign me out</Button>
            </div>
        </main>
        </>
    )
}

export async function getServerSideProps (context) {
    const session = await getServerSession(context.req,context.res,authOptions);
    if (!session) {
        return {redirect:{destination:'/auth/signup',permanent:false}}
    } 
    
    return {
        props:{
            session:JSON.parse(JSON.stringify(session))
        }
    }
}