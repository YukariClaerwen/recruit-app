
import { getJobs } from "@/app/api/job/job";
import JobList from "@/components/client/jobs";
import Image from "next/image";


export default async function Jobs() {
  const data = await getJobs();

  return (
    <div className="px-3.5 pt-5 lg:px-20 bgcolor-LightGray">
      <div className="flex flex-col lg:flex-row justify-between gap-4 py-5">
        <div className="basis-full lg:basis-3/4">
          <div className="flex justify-between mb-4">
            <div className="text-xl"><span className="color-Purple">{data.length}</span> việc làm phù hợp</div>
            <div className="w-80">
              <select className="form-select rounded-pill">
                <option defaultValue="">Sắp xếp</option>
                <option value="1">Theo mức lương</option>
                <option value="2">Theo ngày đăng tuyển</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 pb-5">
            <JobList data={data}/>
          </div>
          <div className="mb-5">
          <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center gap-2">
              <li className="page-item ">
                <a className="page-link rounded-circle" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li className="page-item active"><a className="page-link rounded-circle" href="#">1</a></li>
              <li className="page-item"><a className="page-link rounded-circle" href="#">2</a></li>
              <li className="page-item"><a className="page-link rounded-circle" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link rounded-circle" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
          </div>
        </div>
        <div className="basis-full lg:basis-1/4">

        </div>
      </div>

    </div>
  );
}
