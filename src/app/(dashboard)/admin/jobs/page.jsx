import { getJobs } from "@/app/api/job/job";
import Pagination from "@/components/Pagination";
import JobList from "@/components/client/jobs";
import Dcard from "@/components/client/ui/card";
import Link from "next/link";

const page = async ({ searchParams }) => {
    let page = 1;
    if (searchParams?.page) page = searchParams?.page;
    const data = await getJobs(page);
    const pages = Math.ceil((await data.pagination.total / 10))
    const links = (
        <>
            <Link href="/admin/jobs/post" className="rounded-full round-btn round-btn-border ml-5 btn btn-primary">Đăng tuyển dụng</Link>
        </>
    )
    const parents = "white"
    return (
        <Dcard title="Tin tuyển dụng" des={`${data.pagination.total} việc làm`} toplinks={links}>
            <Pagination pages={pages} searchParams={searchParams} parents={parents} />
            <div className="grid grid-cols-1 gap-4 pb-5">
                <JobList data={data} />
            </div>
            <Pagination pages={pages} searchParams={searchParams} parents={parents} />

        </Dcard>

    )
}

export default page;