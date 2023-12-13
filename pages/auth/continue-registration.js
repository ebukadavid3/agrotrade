import { useState } from "react"; 
import Head from "next/head";
import { TextField } from '@mui/material';
import { useFormik } from "formik";
import * as yup from 'yup';
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { db } from "@/config/firebase.config";
import { updateDoc } from "firebase/firestore";
import ActivityIndicator from "@/utilities/activityindicator";

const validationRules = yup.object().shape({
    firstName:yup.string().required('this field is compulsory').min(2,'must be at least 2 characters').max(25,'cannot be more than 25 characters'),
    lastName:yup.string().required('this field is compulsory').min(2,'must be at least 2 characters').max(25,'cannot be more than 25 characters'),
    address:yup.string().min(8,'must be at least 2 characters').max(60,'cannot be more than 25 characters'),
    compName:yup.string().required('this field is compulsory').min(6,'must be at least 2 characters').max(120,'cannot be more than 25 characters'),
});

export default function ContinueReg () {
    const [tab,setTab] = useState('buyer');
    const [showActivityIndicator,setShowActivityIndicator] = useState(false);
    const {data:session} = useSession();

    const router = useRouter();

    // update the user's record on the database to include his additional details
    //we will call this function when the user submits the form
    // update on firebase documentation: https://firebase.google.com/docs/firestore/manage-data/add-data?hl=en&authuser=0#update-data
    const handleUpdateUser = async (fName,lName,addr,acctType,cName) => {
        setShowActivityIndicator(true);//shows ActivityIndicator

        const userRef = doc(db,'users',session.uid);//session.uid have been configured on pages\api\auth\[...nextauth].js
        await updateDoc(userRef, {
            firstName:fName, //firstName will appear as a field name on firestore
            lastName:lName,
            address:addr,
            accountType:acctType,
            companyName:cName
        })
        .then(() => {
            setShowActivityIndicator(true);//stops ActivityIndicator
            router.push(`/${tab}`);//redirects to seller/buyer dashboard if successful
        })
        .catch(() => {
            setShowActivityIndicator(true);//stops ActivityIndicator
            console.error('operation failed');
        })
    }

    const {handleBlur,handleChange, handleSubmit,touched,errors,values} = useFormik({
        initialValues:{firstName:'',lastName:'',address:'',compName:''},
        onSubmit: () => {
            //call and use user update function
            handleUpdateUser(values.firstName,values.lastName,values.address,tab,values.compName)
        },
        validationSchema:validationRules,
    });

    return (
        <>
        <Head>
            <link rel="icon" href="/AGROTRADE.png" />
            <title>Continue Registration | AgroTrade</title>
        </Head>

        <main className="h-screen flex justify-center items-center py-20 px-3 md:px-0">
            <div className="w-full md:w-[420px] flex flex-col gap-3 border border-gray-300 rounded-md p-3">
                <div className="flex flex-col gap-5 md:gap-3">
                    { showActivityIndicator ? <ActivityIndicator/> : null }

                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl">Provide more information</h2>
                        <p className="text-xs text-green-600">Your account registration will be complete after this step</p>
                    </div>

                    <ul className="grid grid-cols-2">
                        <li 
                        className={`text-center font-bold pb-3 cursor-pointer ${tab == 'seller' ? styles.tabColor : null}`}
                        onClick={() => setTab('seller')}>Farmer</li>
                        <li 
                        className={`text-center font-bold pb-3 cursor-pointer ${tab == 'buyer' ? styles.tabColor : null}`}
                        onClick={() => setTab('buyer')}>Buyer</li>
                    </ul>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <TextField 
                            className="w-full" 
                            variant="outlined" 
                            label="first name"
                            id="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}/>
                            <small className="text-red-500">{touched && errors.firstName ? errors.firstName : null}</small>
                        </div>

                        <div className="mb-2">
                            <TextField 
                            className="w-full" 
                            variant="outlined" 
                            label="last name"
                            id="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}/>
                            <small className="text-red-500">{touched && errors.lastName ? errors.lastName : null}</small>
                        </div>

                        <div className="mb-2">
                            <TextField 
                            multiline={true} 
                            className="w-full" 
                            type="text" 
                            variant="outlined" 
                            label="address"
                            id="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}/>
                            <small className="text-red-500">{touched && errors.address ? errors.address : null}</small>
                        </div>

                        {tab == 'seller'
                        ? <div className="mb-2">
                            <TextField 
                            className="w-full" 
                            variant="outlined" 
                            label="company name"
                            id="compName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.compName}/>
                            <small className="text-red-500">{touched && errors.compName ? errors.compName : null}</small>
                        </div> 
                        : null}

                        <button 
                        type="submit"
                        className="h-[48px] w-full flex justify-center items-center bg-green-700 text-white text-xl rounded-md">Continue</button>
                    </form>
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
    } else {
        return {redirect:{destination:'/auth/signup',permanent:false}}
    }
    
    return {
        props:{
            session
        }
    }
}