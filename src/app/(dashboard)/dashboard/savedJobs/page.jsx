export const dynamic = 'force-dynamic'

import { getJobsByListOfUser} from '@/app/api/job/job'
import JobList from '@/components/client/jobs'
import Dcard from '@/components/client/ui/card'
// import { getServerSession } from 'next-auth'
// import React from 'react'

const page = async () => {

    const jobs = await getJobsByListOfUser("saved")

  return (
    // <></>
    <Dcard title="Việc làm yêu thích" des={`${jobs.data.length} việc làm`}>
        <div className="grid grid-cols-1 gap-4 pb-5">
            <JobList data={jobs} />
        </div>
        {/* <Pagination pages={pages} parents={parents} className={`${data.pagination.total == 0 ? 'hidden' : ''}`} /> */}

    </Dcard>
  )
}

export default page