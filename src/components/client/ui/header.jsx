
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

import Link from "next/link";

export default function Header() {

    return (
        <div className="flex justify-between items-center px-3.5 lg:px-20 py-2 top-header">
            <div className="basis-2/4">
                <WelcomeText />
            </div>
            <div className="basis-2/4 flex items-center justify-end">
                <Link href="/"
                    className="link-logo-btn mr-2 font-logo"
                >
                    Nhà tuyển dụng
                </Link>
                <div className="items-center justify-end hidden lg:flex">
                    <IconGroup />

                </div>
            </div>
        </div>
    )
}
export function HeaderEmployer() {

    return (
        <div className="flex justify-between items-center px-3.5 lg:px-20 py-2 top-header">
            <div className="basis-2/4">
                <WelcomeText />
            </div>
            <div className="basis-2/4 flex items-center justify-end">
                <Link href="/"
                    className="link-logo-btn mr-2 font-logo"
                >
                    Cho người tìm việc
                </Link>
                <div className="items-center justify-end hidden lg:flex">
                    <IconGroup />

                </div>
            </div>
        </div>
    )
}
const WelcomeText = () => {
    return (
        <div>
            Chào mừng đến với{" "}
            <Link href="/" className="font-logo">
                <span className="color-Purple">Ketnoi</span>Vieclam!
            </Link>
        </div>
    )
}
export const IconGroup = () => {
    return (
        <>
            <a href="#" className="circle-btn rounded-circle grid justify-items-center ml-2">
                <div className="svg-container"><FaFacebookF /></div>
            </a>
            <a href="#" className="circle-btn rounded-circle grid justify-items-center ml-2">
                <div className="svg-container"><FaTwitter /></div>
            </a>
            <a href="#" className="circle-btn rounded-circle grid justify-items-center ml-2">
                <div className="svg-container"><FaLinkedinIn /></div>
            </a>
            <a href="#" className="circle-btn rounded-circle grid justify-items-center ml-2">
                <div className="svg-container"><FaInstagram /></div>
            </a>
        </>
    )
}