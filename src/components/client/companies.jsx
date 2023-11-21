"use client";

import { Files, Suitcase } from "@phosphor-icons/react/dist/ssr"
import Image from "next/image"
import Link from "next/link"
import { Card, CardBody, CardGroup, CardText, CardTitle } from "react-bootstrap"
import { usePathname } from "next/navigation"

const Companies = (props) => {
    const companies = props.data
    const pathname = usePathname()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {
                companies.data.map(c =>
                    <Card key={c.id} className="relative bg-white shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg border-0
                    transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-105 duration-300 relative">
                        <Link href={`/companies/${c.id}?title=${c.company_name}`}>
                            <CardGroup className="w-full h-40 flex flex-col justify-center items-center border-b border-slate-200 relative">
                                {c.cover ? (
                                    <Image fill={true}
                                        sizes="(max-width: 100%) 100vw,(max-height: 10rem) 100vw"
                                        objectFit="cover" src={c.cover} alt={c.company_name} />
                                ) : (
                                    <Image className="grayscale hover:grayscale-0 opacity-50 w-5/12" width={500} height={500} src="/logo.png" alt="default_image" />
                                )}
                            </CardGroup>
                            <CardBody className=" px-6 py-8 sm:px-10">
                                <CardTitle>{c.company_name}</CardTitle>
                                <CardText className="flex gap-2 justify-start items-center">
                                    <Suitcase size={20} weight="thin" />
                                    {c.industry}
                                </CardText>
                                <CardText className="flex gap-2 justify-start items-center">
                                    <Files size={20} weight="thin" />
                                    {c.jobs_count} tin tuyển dụng
                                </CardText>
                            </CardBody>
                        </Link>
                        {pathname.includes("/admin/")
                            ?
                            <div className="absolute bottom-4 right-5  ...">
                                <LinkEdit item={c}></LinkEdit>
                            </div>
                            : <></>
                        }
                    </Card>
                )
            }
        </div>
    )
}

export default Companies

const LinkEdit = ({ item }) => {
    return (
        <Link href={`/admin/users/recruiter/post?action=edit&id=${item.id}`}>
            <div className="circle-arrow-btn">
                Edit
            </div>
        </Link>
    )
}