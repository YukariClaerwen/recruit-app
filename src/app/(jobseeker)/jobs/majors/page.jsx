import { getMajors } from '@/app/api/job/major';
import Majors from '@/components/client/majors'
import React from 'react'

const page = async () => {
    const majors = await getMajors();
    return (
        <>
            <div className="px-3.5 pt-5 lg:px-20  min-h-screen">
                <div className="text-xl lg:text-2xl main-title mr-10 font-logo mb-0 font-medium mb-4">
                    Danh sách ngành nghề
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-4 pb-5 mb-5">
                    <Majors data={majors} />
                </div>
            </div>
        </>
    )
}

export default page