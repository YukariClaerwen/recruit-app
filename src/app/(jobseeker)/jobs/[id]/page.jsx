import { getJobById } from "@/app/api/job/job";
import JobDetail from "@/components/client/jobDetail";


export default async function Page({ params }) {
  const job = await getJobById(params.id, "client")

  // console.log(splitString(await job.descriptions))
  return (
    <JobDetail data={job} />
  );
}
