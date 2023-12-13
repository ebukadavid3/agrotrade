import Head from "next/head";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { SellerSideTabs } from "@/components/sellerSideTabs";

export default function SellerDasboard() {
    return (
        <>
        <Head>
            <link rel="icon" href="/AGROTRADE.png" />
            <title>Seller Dashboard | AgroTrade</title>
        </Head>
        <main className="h-auto lg:h-screen py-12 px-3 md:px-16">
            <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <article className="col-span-3 border border-gray-300 rounded-md p-3">
                    <h3>Recent purchases</h3>
                </article>

                <SellerSideTabs/>
            </section>
        </main>
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