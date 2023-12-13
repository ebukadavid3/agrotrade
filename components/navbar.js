import Link from "next/link"
import Image from "next/image"
import { Montserrat } from "next/font/google"
import { useSession } from "next-auth/react"

const montserrat_500 = Montserrat({
    subsets: ["latin"],
    weight: '500'
}) 

const GeneralNav = () => {
    return (
        <ul className="flex flex-row items-center gap-12">
            <li>
                <Link href='/'>
                    <Image width={38} height={38} src='/AGROTRADE.png' alt="logo"/>
                </Link>
            </li>
            <li className={`${montserrat_500.className} hidden md:flex text-green-700 hover:text-yellow-700`}>
                <Link href='/'>Home</Link>
            </li>
            <li className={`${montserrat_500.className} hidden md:flex text-green-700 hover:text-yellow-700`}>
                <Link href='/about-us'>About Us</Link>
            </li>
            <li className={`${montserrat_500.className} hidden md:flex text-green-700 hover:text-yellow-700`}>
                <Link href='/contact-us'>Contact Us</Link>
            </li>
            <li className={`${montserrat_500.className} text-green-700 hover:text-yellow-700`}>
                <Link href='/products'>Products</Link>
            </li>
        </ul>
    )
}

const SellerNav = () => {
    return (
        <ul className="flex flex-row items-center gap-12">
            <li>
                <Link href='/'>
                    <Image width={38} height={38} src='/AGROTRADE.png' alt="logo"/>
                </Link>
            </li>
            <li className={`${montserrat_500.className} hidden md:flex text-green-700 hover:text-yellow-700`}>
                <Link href='/seller'>Dashboard</Link>
            </li>
            <li className={`${montserrat_500.className} hidden md:flex text-green-700 hover:text-yellow-700`}>
                <Link href='/seller/create'>Create</Link>
            </li>
        </ul>
)}

export default function NavBar () {
    const {data:session} = useSession();

    return (
        <div>
            <nav className={`h-[58px] flex items-center px-4 sm:px-20 justify-between ${session?.user_data.accountType == 'seller' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <div className="w-full flex flex-row justify-between items-center">
                   
                    {session?.user_data.accountType == 'seller' ? <SellerNav/> : <GeneralNav/>}

                    {session
                    ? <Link href='/profile'>
                        <Image 
                        width={48} 
                        height={48} 
                        src={session?.user.image} 
                        alt="profile image" 
                        className="rounded-full"/>
                    </Link>
                    : <Link href='/auth/signup'>Sign up</Link>}
                </div>
            </nav>

            <div className="grid grid-cols-3">
                <div className="h-[4px] bg-green-500"></div>
                <div className="h-[4px] bg-yellow-500"></div>
                <div className="h-[4px] bg-red-500"></div>
            </div>
        </div>
    )
}