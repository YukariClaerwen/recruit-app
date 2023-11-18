import { getIndustry, getLocation, getMajor, getBenefit, getCompanySize } from '@/app/api/dashboard/form'
import AddCompany from '@/components/dashboard/form/AddCompany'

const page = async ({params}) => {
  if (params.tag === 'recruiter') {

    const data = {
      majors: await getMajor(),
      industries: await getIndustry(),
      locations: await getLocation(),
      benefits: await getBenefit(),
      size: await getCompanySize(),
    }

    return (
      <AddCompany data={data} />
    )
  }
  return (
    <div>Ứng viên 1</div>
  )
}

export default page