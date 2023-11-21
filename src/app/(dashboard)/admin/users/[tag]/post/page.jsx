import { getCompany } from '@/app/api/company/company'
import { getIndustry, getLocation, getMajor, getBenefit, getCompanySize } from '@/app/api/dashboard/form'
import AddCompany from '@/components/dashboard/form/AddCompany'

const page = async ({ params, searchParams }) => {
  if (params.tag === 'recruiter') {
    return <CompanyPage searchParams={searchParams} />
  }
  return (
    <div>Ứng viên 1</div>
  )
}

export default page

const CompanyPage = async ({searchParams}) => {
  const data = {
    majors: await getMajor(),
    industries: await getIndustry(),
    locations: await getLocation(),
    benefits: await getBenefit(),
    size: await getCompanySize(),
  }

  if (searchParams.action === 'edit') {
    const company = await getCompany(searchParams.id);
    // console.log(company)
    return (
      <AddCompany data={data} edit={company.data} />
    )

  }

  return (
    <AddCompany data={data} />
  )
}