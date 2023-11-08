import { getJobs } from "@/app/api/job/job";
import JobList from "@/components/client/jobs";
import Dcard from "@/components/client/ui/card";
import Link from "next/link";

const page = async () => {
    const data = await getJobs();
    const links = (
        <>
            <Link href="/admin/jobs/post" className="rounded-full round-btn round-btn-border ml-5 btn btn-primary">Đăng tuyển dụng</Link>
        </>
    )
    return (
        <Dcard title="Tin tuyển dụng" des={`${data.pagination.total} việc làm`} toplinks={links}>
            <div className="grid grid-cols-1 gap-4 pb-5">
                <JobList data={data} />
            </div>
        </Dcard>

    )
}

export default page;