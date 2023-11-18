import { getCompany } from "@/app/api/company/company";
import CompanyDetail from "@/components/client/companyDetail";

export default async function Page({ params }) {
    //   const job = await getJobById(params.id, "client")

    const company = await getCompany(params.id)

    console.log(company)


    // console.log(splitString(await job.descriptions))
    return (
        <CompanyDetail data={company.data}></CompanyDetail>
    );
}
