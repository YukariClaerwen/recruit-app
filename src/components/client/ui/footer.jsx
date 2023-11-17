import React from "react";
import Link from "next/link";

import { IconGroup } from "./header";
import { getMajors } from "@/app/api/job/major";
import { getLocations } from "@/app/api/job/location";
import Logo from "@/components/ui/logo";

const copyrightYear = new Date().getFullYear();

export default async function Footer() {

    const majors = await getMajors(5);
    const locations = await getLocations(5)

    return (
        <div className="footer px-3.5 lg:px-20 pt-20">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 lg:gap-0">
                <div className="basis-full lg:basis-2/4">
                    <Logo href="/" variant="yellow" size="lg" />
                    {/* <Link href="/" className="text-2xl lg:text-3xl big-yellow-logo mr-10 mb-0">
                        Ketnoi
                        <span>Vieclam</span>
                    </Link> */}
                </div>
                <div className="basis-full lg:basis-2/4 flex items-center justify-end">
                    <IconGroup />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row mt-4 gap-4 pb-5">
                <div className="basis-full lg:basis-1/4">
                    <h5>Tầng 2 – Tòa nhà Emporium, 184 Lê Đại Hành, P. 15, Q. 11, TP. Hồ Chí Minh</h5>
                    <div className="mt-3">
                        <ul>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Về chúng tôi</Link></li>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Liên hệ</Link></li>
                            <li className="foot-link"><Link href="/" className="flex justify-items-start items-center ">Hỏi đáp</Link></li>
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
                    <h5>Việc làm theo khu vực</h5>
                    <div className="mt-3">
                        <ul className="mb-3">
                            {locations.data.map(location =>
                                <li key={location.id} className="foot-link"><Link href={`/jobs?location=${location.id}`} className="flex justify-items-start items-center ">{location.name}</Link></li>
                            )}
                        </ul>
                        <Link href="/jobs">
                            <div className="circle-arrow-btn flex justify-items-start gap-1">
                                Xem tất cả
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="basis-full lg:basis-1/4">
                    <h5>Việc làm theo ngành nghề</h5>
                    <div className="mt-3">
                        <ul className="mb-3">
                            {majors.map(major =>
                                <li key={major.id} className="foot-link"><Link href={`/jobs?major=${major.id}`} className="flex justify-items-start items-center ">{major.name}</Link></li>
                            )}

                        </ul>
                        <Link href="/jobs">
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