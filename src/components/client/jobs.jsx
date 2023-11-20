"use client";
import { AiOutlineEnvironment } from "react-icons/ai";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaMoneyBills } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

import JobFav from "./jobfavorite";
import NumberFormat from "../format/number";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "react-bootstrap";
import { Check } from "@phosphor-icons/react/dist/ssr";

const JobList = ({ data }) => {
  let jobs = data.data

  const pathname = usePathname();

  const {data: session} = useSession();

  return (
    <>
      {jobs.map(job =>
        <div className="bg-white p-4 job-block" key={job.id} id={job.id}>
          <div className="flex justify-between gap-2">
            <div className="job-logo flex items-center justify-center">
              <BsFillBuildingsFill size={24} />
            </div>
            <div className="grow block" style={{ maxWidth: "calc(100% - 80px)" }}>
              <div className="flex justify-between mb-2">
                <div className="job-title-block">
                  <div className="text-xl truncate">
                    <Link href={`/jobs/${job.id}?title=${job.title}`}>{job.title}</Link>
                  </div>
                  <span className="btn btn-sm rounded-pill tag tag-hot mr-2">Hot</span>
                  <span className="btn btn-sm rounded-pill tag tag-new mr-2">New</span>
                </div>
                {session?.user.role == 'user' || !session ? <JobFav job={job} /> : <></>}
              </div>
              <div className="flex justify-between">
                <div className="flex justify-start">
                  <div className="job-item-icon color-Purple mr-3">
                    <FaMoneyBills size={24} className="mr-1" />
                    {(job.salary) ? (
                      <>
                        <NumberFormat currency={job.salary.currency} value={job.salary.min} /> - <NumberFormat currency={job.salary.currency} value={job.salary.max} />
                      </>
                    ) : "Cạnh tranh"}
                  </div>
                  <div className="job-item-icon mr-3">
                    <AiOutlineEnvironment size={24} className="mr-1" />
                    <span>{job.location.name}</span>
                  </div>
                </div>
                <div className="space-x-4">
                    { pathname.includes("/admin/") 
                    ? <>
                      <LinkAppliedCv job={job} />
                      <LinkEdit job={job} />
                    </>
                    : <LinkApply job={job} />  
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default JobList;


const LinkApply = ({ job }) => {
  if(job.isApplied) {
    return(
      <div className="flex justify-items-start gap-1">
        <Button variant="secondary" disabled className="flex gap-2">
          <Check size={20} weight="thin" /> 
            Đã ứng tuyển
          </Button>
      </div>
    )
  }
  return (
    <Link href={`/jobs/${job.id}?title=${job.title}&showDialog=y&action=apply&id=${job.id}`}>
      <div className="circle-arrow-btn flex justify-items-start gap-1">
        Ứng tuyển
      </div>
    </Link>
  )
}

const LinkEdit = ({job}) => {
  return (
    <Link href={`/admin/jobs/post?action=editJob&jobId=${job.id}`}>
      <div className="circle-arrow-btn flex justify-items-start gap-1">
        Edit
      </div>
    </Link>
  )
}
const LinkAppliedCv = ({job}) => {
  if(job.appliedNumber > 0) {
    return (
      <Link href={`/admin/jobs/${job.id}?title=${job.title}`}>
        <div className="circle-arrow-btn flex justify-items-start gap-1">
          {job.appliedNumber} Đơn ứng tuyển
        </div>
      </Link>
    )
  }
  return (
    <></>
  )
}
