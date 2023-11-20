import { getAppliedUserByJob } from "@/app/api/dashboard/user/action";
import AppliedList from "@/components/dashboard/AppliedList";

export default async function Page({ params, searchParams }) {
    const data = await getAppliedUserByJob(params.id)
    return (
        <AppliedList data={data.data} job={{id: params.id, title: searchParams.title}} />
    );
  }