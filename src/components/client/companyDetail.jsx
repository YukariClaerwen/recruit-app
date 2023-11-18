"use client";

import Script from "next/script";
import { PiAddressBookThin, PiBuildingsThin, PiFilesThin, PiGlobeHemisphereEastThin, PiHandCoinsThin, PiListChecksThin, PiMapPinThin, PiPhoneThin, PiSuitcaseThin } from "react-icons/pi";
import JobList from "./jobs";


const CompanyDetail = ({ data }) => {

    const html = (strs) => {
        const sentences = strs?.split(/\r\n|\r|\n/gi).map(s => `<p>${s}</p>`);
        return sentences?.join('').replaceAll("<p></p>", "<p class='my-4'></p>");
    }

    return (
        <div className="relative">
            <div className="job-head-block bgcolor-DarkPurple text-white relative z-10">
                <div className="px-3.5 pt-5 lg:px-20">
                    <div className="px-5 flex justify-between items-start">
                        <div className="">
                            <h3 className="font-logo">{data.company_name}</h3>
                            <div className="flex justify-start gap-3 items-center">
                                {data.logo ? (
                                    <div className="company-logo">

                                    </div>
                                ) : <></>}

                                <div>
                                    <p>{data.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="sticky-top2 top-50">
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-3.5 py-5 lg:px-20 z-20 job-main-block">
                <div className="flex grid grid-cols-2 lg:grid-cols-3 gap-4 job-detail-block bg-white p-5 rounded-4">
                    <div className=" basis-2/3 col-span-2">
                        <div className="job-detail-mainItem mb-5">
                            <div className="mt-3 flex justify-start items-center gap-3 mb-1">
                                <PiListChecksThin size="35" color="#7B27AB" />
                                <h4>Giới thiệu công ty</h4>
                            </div>
                            <div className="mt-3" dangerouslySetInnerHTML={{ __html: html(data.description) }} />
                        </div>
                        {data.benefits ? (
                            <div className="job-detail-mainItem mb-5">
                                <div className="mt-3 flex justify-start items-center gap-3 mb-1">
                                    <PiHandCoinsThin size="35" color="#7B27AB" />
                                    <h4>Phúc lợi</h4>
                                </div>

                                <div className="mt-3">
                                    <Benefits company={data} />
                                </div>
                            </div>
                        ) : <></>}
                        {data.jobs ? (
                            <div className="job-detail-mainItem mb-5">
                                <div className="mt-3 flex justify-start items-center gap-3 mb-1">
                                    <PiFilesThin size="35" color="#7B27AB" />
                                    <h4>Danh sách tin tuyển dụng ({data.jobs.data.length})</h4>
                                </div>

                                <div className="mt-3 space-y-6 bgcolor-LightGray rounded-3 px-4 py-5">
                                    <JobList data={data.jobs} />
                                    {/* <Benefits company={data} /> */}
                                </div>
                            </div>
                        ) : <></>}
                    </div>
                    <div className="basis-1/3">
                        <div className="rounded-3 p-4 job-item-list">
                            <ul role="list" className="divide-y divide-gray-300">
                                <li className="py-3 flex justify-start items-center gap-x-4">
                                    <PiBuildingsThin size="40" color="#606060" />
                                    <div>
                                        <p>Quy mô</p>
                                        <p>{data.company_size}</p>
                                    </div>
                                </li>
                                <li className="py-3 flex justify-start items-center gap-x-4">
                                    <PiGlobeHemisphereEastThin size="40" color="#606060" />
                                    <div>
                                        <p>Quốc gia</p>
                                        <p>{data.nation}</p>
                                    </div>
                                </li>
                                <li className="py-3 flex justify-start items-center gap-x-4">
                                    <PiAddressBookThin size="40" color="#606060" />
                                    <div>
                                        <p>Liên hệ</p>
                                        <p>{data.contact_person}</p>
                                    </div>
                                </li>
                                <li className="py-3 flex justify-start items-center gap-x-4">
                                    <PiPhoneThin size="40" color="#606060" />
                                    <div>
                                        <p>Số điện thoại</p>
                                        <p>{data.phone_number}</p>
                                    </div>
                                </li>
                                <li className="py-3 flex justify-start items-center gap-x-4">
                                    <PiSuitcaseThin size="40" color="#606060" />
                                    <div>
                                        <p>Lĩnh vực</p>
                                        <p>{data.industry}</p>
                                    </div>
                                </li>
                                <li className="py-3 flex justify-start items-center gap-x-4">
                                    <PiMapPinThin size="40" color="#606060" />
                                    <div>
                                        <p>Địa điểm</p>
                                        <Locations company={data} />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CompanyDetail


const Benefits = ({ company }) => {
    console.log(company.location)
    return (
        <>
            {/* icon scripts */}
            <Script
                src="https://unpkg.com/@phosphor-icons/web"
                strategy="lazyOnload"
                onLoad={() =>
                    console.log(`script loaded correctly, window.FB has been populated`)
                }
            />
            {company.benefits.map((b, index) =>
                <p key={index}>  <b><i className={"ph " + b.icon}></i> {b.name}</b>: {b.description}</p>
            )}
        </>
    )
}

const Locations = ({company}) => {
    console.log(company.location)
    return (
        <>
            {company.location.map((l, index) =>
                <div key={index}>
                    <div><b> {l.name}</b> - {l.province}</div>
                    {l.address ? <div>{l.address}</div> : <></>}
                </div>
                
            )}
        </>
    )
}