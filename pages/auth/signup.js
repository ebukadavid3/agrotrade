import { useState,useContext } from "react";
import { AppContext } from "@/config/global"; 
import Head from "next/head";
import Image from "next/image";
import { TextField } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { useFormik } from "formik";
import { signIn } from 'next-auth/react'
import { useSession } from "next-auth/react";

export default function Signup () {
    const [tab,setTab] = useState('buyer');
    const {accountType,setAccountType}  = useContext(AppContext);
    const {data:session} = useSession();

    const {handleBlur,handleChange,handleSubmit,touched,errors} = useFormik ({
        initialValues: {},
        onSubmit: () => {},
        validateSchema:null,
    })
    return (
        <>
        <Head>
            <title>Signup | AgroTrade</title>
        </Head>
        <main className="h-screen lg:h-auto flex justify-center items-center py-20 px-3 md:px-0">
            <div className="w-full md:w-[420px] flex flex-col gap-3 border border-gray-300 ronded-md p-3">
                <Image
                width={400}
                height={200}
                className="rounded-t-md"
                src='/farm-trade.jpg' alt="farm trade"/>

                <div className="flex flex-col gap5 md:gap-3">
                    <ul className="grid grid-cols-2">
                        <li
                    className={`text-center font-bold pb-3 cursor-pointer ${tab == 'farmer' ? styles.tabColor : null}`}
                        onClick={() => setTab('farmer')}>Farmer</li>
                        <li
                    className={`text-center font-bold pb-3 cursor-pointer ${tab == 'buyer' ? styles.tabColor : null}`}
                        onClick={() => setTab('buyer')}>Buyer</li>
                    </ul>

                    <div>
                        <h2 className="text-2xl">{`Register a ${tab}'s account`}</h2>
                        <p className="text-xs text-green-600">Fill the form below to create a buyer account</p>
                    </div>

                    <form>
                        <div className="mb-2">
                            <TextField className="w-full" type="email" variant="outlined" label="email"/>
                        </div>
                        <button className="h-[48px] w-full flex justify-center items-center bg-green-700 text-white text-xl rounded-md">Register</button>
                    </form>

                    {/* OR seperator */}
                                        <div className="separator"> <span className='text-gray-400 my-3'>OR</span> </div>


                    {/* Social Signup */}
                    <div className="flex flex-col gap-3">
                        <button
                        onClick={() => signIn('google')}
                         className="h-[48px] w-full flex justify-center items-center border border-slate-400 rounded-md text-slate-900">
                            <FcGoogle className="text-3xl mr-3"/>Signup up with Google</button>
                        <button
                         className="h-[48px] flex justify-center items-center border border-slate-400 rounded-md text-slate-900">
                            <FaApple className="text-3xl mr-3"/>Signup up with Apple</button>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}


const styles = {
    tabColor: 'border-b-4 border-green-600'
}