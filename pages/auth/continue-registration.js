import { useState } from "react"; 
import Head from "next/head";
import { TextField } from '@mui/material';
import { useFormik } from "formik";
import * as yup from 'yup';

const validationRules = yup.object().shape({
    firstName:yup.string().required('This field is compulsory').min(2,'Must be at least 2 characters').max(25,'Cannot be more than 25 characters'),
    lastName:yup.string().required('This field is compulsory').min(2,'Must be at least 2 characters').max(25,'Cannot be more than 25 characters'),
    address:yup.string().min(8,'Must be at least 8 characters').max(120,'Cannot be more than 25 characters'),
});

export default function ContinueReg () {
    const [tab,setTab] = useState('buyer')

    const {handleBlur,handleChange,handleSubmit,touched,errors,values} = useFormik ({
        initialValues: {firstName: '',lastName:'',address:'',compName:''},
        onSubmit: (value) => {
            console.log(value.firstName)
        },
        validationSchema:validationRules,
    })
    return (
        <>
        <Head>
            <title>Continue Registration | AgroTrade</title>
        </Head>
        <main className="h-screen flex justify-center items-center">
            <div className="w-full md:w-[420px] flex flex-col gap-3 border border-gray-300 ronded-md p-3">

                <div className="flex flex-col gap5 md:gap-3">
                    <div>
                        <h2 className="text-2xl">Provide more information</h2>
                        <p className="text-xs text-green-600">Your account Registration will be complete after this step</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <TextField id="firstName" className="w-full"  variant="outlined" label="First Name"onChange={handleChange} onBlur={handleBlur} value={values.firstName}/>
                            <small className="text-red-500">{touched && errors.firstName ? errors.firstName : null}</small>
                        </div>

                        <div className="mb-2">
                            <TextField id="lastName" className="w-full" variant="outlined" label="Last Name" onChange={handleChange} onBlur={handleBlur} value={values.lastName}/>
                            <small className="text-red-500">{touched && errors.lastName ? errors.lastName : null}</small>
                        </div>

                        <div className="mb-2">
                            <TextField id="address" multiline={true} className="w-full" type="text" variant="outlined" label="address" onChange={handleChange} onBlur={handleBlur} value={values.address}/>
                            <small className="text-red-500">{touched && errors.address ? errors.address : null}</small>
                        </div>

                        {/* {tab == 'farmer'
                        ? <div className="mb-2">
                            <TextField id="compName" className="w-full" variant="outlined" label="company name" onChange={handleChange} onBlur={handleBlur} value={values.compName}/>
                            <small className="text-red-500">{touched && errors.compName ? errors.compName : null}</small>
                        </div>
                        : null} */}

                         <button type="submit" className="h-[48px] w-full flex justify-center items-center bg-green-700 text-white text-xl rounded-md">Continue</button>
                    </form>
                </div>
            </div>
        </main>
        </>
    )
}


const styles = {
    tabColor: 'border-b-4 border-green-600'
}