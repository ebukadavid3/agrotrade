import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";

export default function Footer () {
    return (
        <footer className="h-auto md:h-[60px] flex flex-col md:flex-row md:justify-between gap-3 md:gap-0 items-center bg-lime-900 px-20 py-4 md:py-0">
            <ul className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
                <li><Link href="#"><FaInstagram className="text-lime-300 text-3xl"/></Link></li>
                <li><Link href="#"><FaYoutube className="text-lime-300 text-3xl"/></Link></li>
                <li><Link href="#"><FaXTwitter className="text-lime-300 text-3xl"/></Link></li>
                <li><Link href="#"><FaTiktok className="text-lime-300 text-3xl"/></Link></li>
            </ul>

            <ul className="flex flex-row gap-4 items-center">
                <li className="text-xs text-slate-300 hover:text-slate-100"><Link href="#">Terms of Use</Link></li>
                <li className="text-xs text-slate-300 hover:text-slate-100"><Link href="#">Bug bounty</Link></li>
            </ul>

            <small className="text-slate-300 text-xs">
                &copy;{new Date().getFullYear()} Agro Trade. All rights reserved
            </small>
        </footer>
    )
}