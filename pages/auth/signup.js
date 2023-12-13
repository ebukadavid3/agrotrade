import { useContext } from "react";
import { AppContext } from "@/config/global"; 
import Head from "next/head";
import Image from "next/image";
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { useFormik } from "formik";
import { signIn } from 'next-auth/react'
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export default function Signup () {
    const {accountType,setAccountType} = useContext(AppContext);

    const {handleBlur,handleChange,handleSubmit,touched,errors} = useFormik({
        initialValues:{},
        onSubmit: () => {},
    });

    return (
        <>
        <Head>
            <link rel="icon" href="/AGROTRADE.png" />
            <title>Signup | AgroTrade</title>
        </Head>
        <main className="h-screen lg:h-auto flex justify-center items-center py-20 px-3 md:px-0">
            <div className="w-full md:w-[420px] flex flex-col gap-3 border border-gray-300 rounded-md p-3">
                <Image 
                width={400} 
                height={120} 
                className="rounded-t-md"
                src='/farm-trade.jpg' alt="farm trade"/>

                <div className="flex flex-col gap-5 md:gap-3">
                    <div className="flex flex-col gap-3">
                        <button 
                        onClick={() => signIn('google')}
                        className="h-[48px] flex justify-center items-center border border-slate-400 rounded-md text-slate-900">
                            <FcGoogle className="text-3xl mr-2"/> Sign up with Google
                        </button>
                        <button 
                        className="h-[48px] flex justify-center items-center border border-slate-400 rounded-md text-slate-900">
                            <FaApple className="text-3xl mr-2"/> Sign up with Apple
                        </button>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}

const styles = {
    tabColor:'border-b-4 border-green-600'
}

export async function getServerSideProps (context) {
    const session = await getServerSession(context.req,context.res,authOptions);
    if (session) {
        if (session.user_data?.accountType == 'seller') {
            return {redirect:{destination:'/seller',permanent:false}}
        } 
        else if (session.user_data?.accountType == 'buyer') {
            return {redirect:{destination:'/buyer',permanent:false}}
        } 
        else {
            return {redirect:{destination:'/auth/continue-registration',permanent:false}}
        } 
    }
    
    return {
        props:{
            session:JSON.parse(JSON.stringify(session))
        }
    }
}