import { getLocation, getMajor, getTag, getLanguage, getLevel, getIndustry, getCompany } from '@/app/api/dashboard/form';
import { getJobById } from '@/app/api/job/job';
import PostJobForm from '@/components/dashboard/form/PostJobForm';

const page = async ({ searchParams }) => {
  // console.log(searchParams)
  const data = {
    levels: await getLevel(),
    majors: await getMajor(),
    industries: await getIndustry(),
    locations: await getLocation(),
    tags: await getTag(),
    languages: await getLanguage(),
    companies: await getCompany(),
  }
  // console.log(data)
  if (searchParams.action === 'editJob') {
    const job = await getJobById(searchParams.jobId);
    // console.log(job)
    return (
      <PostJobForm data={data} editJob={job}/>
    )

  }
  return (
    <PostJobForm data={data} editJob={false} />
  )
}

export default page