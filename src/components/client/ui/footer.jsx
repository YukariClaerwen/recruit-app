import React from "react";
import Link from "next/link";

import { IconGroup } from "./header";

const copyrightYear = new Date().getFullYear();

export default function Footer() {
    return (
        <div className="footer px-3.5 lg:px-20 pt-20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-0">
                <div className="basis-full lg:basis-2/4">
                    <Link href="/" className="text-2xl lg:text-3xl big-yellow-logo mr-10 mb-0">
                        Ketnoi
                        <span>Vieclam</span>
                    </Link>
                </div>
                <div className="basis-full lg:basis-2/4 flex items-center justify-end">
                    <IconGroup/>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row mt-4 gap-4 pb-5">
                <div className="basis-full lg:basis-1/4">
                    <h5>Tầng 2 – Tòa nhà Emporium, 184 Lê Đại Hành, P. 15, Q. 11, TP. Hồ Chí Minh</h5>
                    <div className="mt-3">
                        <ul>
                            <li className="foot-link"><Link href="/about" className="flex justify-items-start items-center ">Về chúng tôi</Link></li>
                            <li className="foot-link"><Link href="/contact" className="flex justify-items-start items-center ">Liên hệ</Link></li>
                            <li className="foot-link"><Link href="/faq" className="flex justify-items-start items-center ">Hỏi đáp</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="basis-full lg:basis-1/4">
                    <h5>Dành cho nhà tuyển dụng</h5>
                    <div className="mt-3">
                        <ul className="mb-3">
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Đăng tuyển dụng</Link></li>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Tìm kiếm CV</Link></li>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Dịch vụ</Link></li>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Đăng nhập/Đăng ký</Link></li>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Liên hệ</Link></li>
                        </ul>
                        <Link href="/employer">
                            <div className="circle-arrow-btn flex justify-items-start gap-1">
                                Nhà tuyển dụng
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="basis-full lg:basis-1/4">
                    <h5>Việc làm theo ngành nghề</h5>
                    <div className="mt-3">
                        <ul className="mb-3">
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Hồ Chí Minh</Link></li>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Hà Nội</Link></li>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Hải Phòng</Link></li>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Đồng Nai</Link></li>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Bình Dương</Link></li>
                        </ul>
                        <Link href="/">
                            <div className="circle-arrow-btn flex justify-items-start gap-1">
                                Xem tất cả
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="basis-full lg:basis-1/4">
                    <h5>Việc làm theo khu vực</h5>
                    <div className="mt-3">
                        <ul className="mb-3">
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Kế toán</Link></li>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Ngân hàng</Link></li>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">IT - Phần mềm</Link></li>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">IT - Phần cứng</Link></li>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Thiết kế</Link></li>
                        </ul>
                        <Link href="/">
                            <div className="circle-arrow-btn flex justify-items-start gap-1">
                                Xem tất cả
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="foot-copy py-3 text-center">
                <span>Copyright &copy; {copyrightYear} KetnoiVieclam</span>
            </div>
        </div>
    )
}