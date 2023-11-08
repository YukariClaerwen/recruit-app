import { getLocation, getMajor, getTag, getLanguage, getLevel, getIndustry, getCompany } from '@/app/api/dashboard/form';
import PostJobForm from '@/components/dashboard/form/PostJobForm';

const page = async () => {
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

  return (
    <PostJobForm data={data}/>
  )
}

export default page