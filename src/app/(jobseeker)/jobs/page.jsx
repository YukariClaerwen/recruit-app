
import { getJobs, searchJobs } from "@/app/api/job/job";
import Pagination from "@/components/Pagination";
import JobList from "@/components/client/jobs";


export default async function Jobs({ searchParams }) {
  let data
  const key = searchParams?.key;
  const location = searchParams?.location;
  let urlSearchParams = '';
  let page = 1;
  if(searchParams?.page) page = searchParams?.page;
  if ((key == '' && location == 'all') || (!searchParams?.key && !searchParams?.location)) {
    data = await getJobs(page);
    urlSearchParams = '';
  } else {
    data = await searchJobs(key, location, page)
    urlSearchParams = `?key=${key}&location=${location}`
  }
  
  const pages = Math.ceil((await data.pagination.total / 10))
  return (
    <div className="px-3.5 pt-5 lg:px-20 bgcolor-LightGray">
      <div className="flex flex-col lg:flex-row justify-between gap-4 py-5">
        <div className="basis-full lg:basis-3/4">
          <div className="flex justify-between mb-4">
            <div className="text-xl">
              {data.pagination.total > 0 ? (
                <><span className="color-Purple">{data.pagination.total}</span> việc làm phù hợp</>
              ) : <b>Không tìm thấy việc làm phù hợp</b>}
            </div>
            <div className="w-80">
              <select className="form-select rounded-pill">
                <option defaultValue="">Sắp xếp</option>
                <option value="1">Theo mức lương</option>
                <option value="2">Theo ngày đăng tuyển</option>
              </select>
            </div>
          </div>
          <Pagination pages={pages} searchParams={searchParams} urlSearchParams={urlSearchParams}/>
          <div className="grid grid-cols-1 gap-4 pb-5">
            <JobList data={data} />
          </div>
          <Pagination pages={pages} searchParams={searchParams} urlSearchParams={urlSearchParams}/>
        </div>
        <div className="basis-full lg:basis-1/4">

        </div>
      </div>

    </div>
  );
}
