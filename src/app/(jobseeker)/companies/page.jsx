import { getCompanies } from "@/app/api/company/company"
import Companies from "@/components/client/companies"

const page = async () => {
    const companies = await getCompanies()
    return (
        <>
            <div className="px-3.5 pt-5 lg:px-20  min-h-screen">
                <div className="text-xl lg:text-2xl main-title mr-10 font-logo mb-0 font-medium mb-4">
                    Công ty hàng đầu ({companies.data.length})
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-4 pb-5 mb-5">
                    <Companies data={companies}/>
                </div>
            </div>
        </>
    )
}

export default page