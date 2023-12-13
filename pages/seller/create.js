import { useState } from "react";
import Head from "next/head";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { SellerSideTabs } from "@/components/sellerSideTabs";
import { useFormik } from "formik";
import * as yup from 'yup';
import { TextField } from "@mui/material";
import { db,storage } from "@/config/firebase.config";
import { addDoc,collection,updateDoc,doc } from "firebase/firestore";
import { ref, uploadString,getDownloadURL } from "firebase/storage";
import ActivityIndicator from "@/utilities/activityindicator";
import CustomDialog from "@/utilities/customDialog";

const validationRules = yup.object().shape({
    title:yup.string().required().min(16),
    description:yup.string().required().min(300),
    availability:yup.number().required(),
    price:yup.number().required().min(100),
});


export default function SellerDasboard() {
    const [showActivityIndicator,setShowActivityIndicator] = useState(false);
    const [selectedFile,setSelectedFile] = useState(null);

    //CONFIRMATION DIALOG >>>> START
    const [openDialog, setOpenDialog] = useState(false);
    const handleClickOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);
    //CONFIRMATION DIALOG >>>> END

    //get image file and convert to base64 string
    const imageToPost = (e) => {
        const reader = new FileReader();

        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readEvent) => {
            setSelectedFile(readEvent.target.result);
        }
    }

    // create post to firestore
    const handleCreateProduct = async (title,description,availability,price) => {
        setShowActivityIndicator(true);

        const docRes = await addDoc(collection(db,'products'),{
            title:title,
            description:description,
            availability:availability,
            price:price,
            timeCreated:new Date().getTime(),
        });

        const imageRef = ref(storage,`products/${docRes.id}/image`);

        await uploadString(imageRef,selectedFile,'data_url')
        .then(async () => {
            const imgUrl = await getDownloadURL(imageRef);
            updateDoc(doc(db,'products',docRes.id),{
                imageUrl:imgUrl,
            });

            setShowActivityIndicator(false);
            handleClickOpenDialog();
        })
        .catch((e) => {
            setShowActivityIndicator(false);
            console.error(e);
        })
    }

    const {handleBlur,handleChange,handleSubmit,touched,errors,values} = useFormik({
        initialValues:{title:'',description:'',availability:'',price:''},
        onSubmit: () => {
            if (selectedFile) {
                handleCreateProduct(values.title,values.description,values.availability,values.price)
            } else {
                alert('Please upload an image')
            }
        },
        validationSchema:validationRules,
    });

    return (
        <>
        <Head>
            <link rel="icon" href="/AGROTRADE.png" />
            <title>Create Product | AgroTrade</title>
        </Head>
        <main className="h-auto lg:h-screen py-12 px-3 md:px-16">
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <article className="col-span-3 border border-gray-300 rounded-md p-3">
                    { showActivityIndicator ? <ActivityIndicator/> : null }

                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <TextField 
                            className="w-full" 
                            variant="outlined" 
                            label="Title"
                            id="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}/>
                            <small className="text-red-500">{touched && errors.title ? errors.title : null}</small>
                        </div>

                        <div className="mb-2">
                            <TextField 
                            multiline={true}
                            className="w-full" 
                            variant="outlined" 
                            label="Description"
                            id="description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}/>
                            <small className="text-red-500">{touched && errors.description ? errors.description : null}</small>
                        </div>

                        <div className="mb-2">
                            <TextField 
                            type="number"
                            className="w-full" 
                            variant="outlined" 
                            label="Availability"
                            id="availability"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.availability}/>
                            <small className="text-red-500">{touched && errors.availability ? errors.availability : null}</small>
                        </div>

                        <div className="mb-2">
                            <TextField 
                            className="w-full" 
                            type="number" 
                            variant="outlined" 
                            label="Price"
                            id="price"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}/>
                            <small className="text-red-500">{touched && errors.price ? errors.price : null}</small>
                        </div>

                        <div className="mb-2 flex flex-col">
                            <label className="mb-1">Upload product picture</label>
                            <input 
                            type="file" 
                            accept='image/*'
                            onChange={imageToPost}/>
                        </div>

                        <button 
                        type="submit"
                        className="h-[48px] w-full flex justify-center items-center bg-green-700 text-white text-xl rounded-md">Continue</button>
                    </form>
                </article>

                <SellerSideTabs/>
            </section>
        </main>

        <CustomDialog 
        openProp={openDialog} 
        handleCloseProp={handleCloseDialog} 
        title='Confirmation'>
            <p>Product listing was successfully created</p>
        </CustomDialog>
        </>
    )
}

export async function getServerSideProps (context) {
    const session = await getServerSession(context.req,context.res,authOptions);
    if (session) {
        if (session.user_data?.accountType != 'seller') {
            return {redirect:{destination:'/',permanent:false}}
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