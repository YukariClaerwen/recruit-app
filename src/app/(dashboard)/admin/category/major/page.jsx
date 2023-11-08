import { getMajor } from "@/app/api/dashboard/job/major";
import MajorList from "@/components/dashboard/MajorList";

const page = async () => {
    const data = await getMajor();
    return (
        <div className="container pt-5">
            <MajorList data={data}  />
        </div>
    )
}

export default page