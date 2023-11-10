"use client";

import {
  PiCalendarPlusThin, PiStackThin, PiSuitcaseSimpleThin,
  PiSuitcaseThin, PiShootingStarThin, PiGlobeHemisphereWestThin,
  PiMapPinLineThin, PiMapPinThin, PiMoneyThin, PiHandCoinsThin,
  PiListMagnifyingGlassThin, PiListChecksThin
} from "react-icons/pi";
import ApplyBtnToast, { ApplyBtn } from "./ui/applyBtn";
import Moment from "react-moment";
import NumberFormat from "../format/number";
import { FaRegBookmark } from "react-icons/fa6";
import Link from "next/link";

const JobDetail = ({ data }) => {

  const html = (strs) => {
    const sentences = strs.split(/\r\n|\r|\n/gi).map(s => `<p>${s}</p>`);
    return sentences.join('').replaceAll("<p></p>", "<p class='my-4'></p>");
  }

  return (
    <div className="relative">
      <div className="job-head-block bgcolor-DarkPurple text-white relative z-10">
        <div className="px-3.5 pt-5 lg:px-20">
          <div className="px-5 flex justify-between items-start">
            <div className="">
              <h3 className="font-logo">{data.title}</h3>
              <div className="flex justify-start gap-3 items-center">
                {data.company.logo ? (
                  <div className="company-logo">

                  </div>
                ) : <></>}

                <div>
                  {data.company ? <p>{data.company.name}</p> : <></>}
                  <p className="flex gap-1 justify-start items-center"><PiMoneyThin size="24" color="#FFBB58" />
                    {(data.salary) ? (
                      <>
                        <NumberFormat currency={data.salary.currency} value={data.salary.min} /> - <NumberFormat currency={data.salary.currency} value={data.salary.max} />
                      </>
                    ) : "Cạnh tranh"}
                  </p>
                </div>
              </div>
            </div>
            <div className="sticky-top2 top-50">
              <ApplyBtn />
            </div>
          </div>
        </div>
      </div>
      <div className="px-3.5 py-5 lg:px-20 z-20 job-main-block">
        <div className="flex justify-between gap-3 job-detail-block bg-white p-5 rounded-4">
          <div className=" basis-2/3 ">
            <div className="job-detail-mainItem mb-5">
              <div className="mt-3 flex justify-start items-center gap-3 mb-1">
                <PiListChecksThin size="35" color="#7B27AB" />
                <h4>Mô tả công việc</h4>
              </div>
              <div className="mt-3" dangerouslySetInnerHTML={{ __html: html(data.descriptions) }} />
            </div>
            <div className="job-detail-mainItem mb-5">
              <div className="mt-3 flex justify-start items-center gap-3 mb-1">
                <PiListMagnifyingGlassThin size="35" color="#7B27AB" />
                <h4>Yêu cầu công việc</h4>
              </div>
              <div className="mt-3" dangerouslySetInnerHTML={{ __html: html(data.requirements) }} />
            </div>
            {data.company.benefits ? (
              <div className="job-detail-mainItem mb-5">
                <div className="mt-3 flex justify-start items-center gap-3 mb-1">
                  <PiHandCoinsThin size="35" color="#7B27AB" />
                  <h4>Phúc lợi</h4>
                </div>

                <div className="mt-3">
                  <p>- Hưởng mức lương cạnh tranh thị trường cùng các khoản thưởng hợp lý khác tương xứng với sự đóng góp</p>
                  <p>- Đào tạo chuyên sâu, nâng cao kiến thức cho nhân viên với các chuyên gia đầu ngành</p>
                  <p>- Lộ trình thăng tiến rõ ràng phù hợp cho từng vị trí hoặc từng cá nhân</p>
                </div>
              </div>
            ) : <></>}
            {
              data.company.adresses ? (
                <div className="job-detail-mainItem mb-5">
                  <div className="mt-3 flex justify-start items-center gap-3">
                    <PiMapPinLineThin size="35" color="#7B27AB" />
                    <h4>Địa chỉ làm việc</h4>
                  </div>
                  <div className="mt-3">
                    <p>- 444 Cách Mạng Tháng Tám, phường 11, Quận 3, Thành phố Hồ Chí Minh, Việt Nam</p>
                  </div>
                </div>
              ) : <></>
            }
            <div className="border-t-2 border-gray-300 pt-3">
              <p className="color-Purple">
                <FaRegBookmark className="inline mr-1" />
                <span className="font-logo mr-3">Từ khóa: </span>
                {
                  data.tags.map(tag => (
                    <Link href={`/jobs?tag=${tag.id}`} key={tag.id} className="text-sm link-style link-recommend mr-2">{tag.name}</Link>
                  ))
                }
                
              </p>
            </div>
          </div>
          <div className="basis-1/3">
            <div className="rounded-3 p-4 job-item-list">
              <ul role="list" className="divide-y divide-gray-300">
                <li className="py-3 flex justify-start items-center gap-x-4">
                  <PiCalendarPlusThin size="40" color="#606060" />
                  <div>
                    <p>Ngày đăng tuyển</p>
                    <p><Moment date={data.postDate} format="DD/MM/YYYY"></Moment></p>
                  </div>
                </li>
                <li className="py-3 flex justify-start items-center gap-x-4">
                  <PiStackThin size="40" color="#606060" />
                  <div>
                    <p>Cấp bậc</p>
                    <p>{data.level}</p>
                  </div>
                </li>
                <li className="py-3 flex justify-start items-center gap-x-4">
                  <PiSuitcaseSimpleThin size="40" color="#606060" />
                  <div>
                    <p>Ngành nghề</p>
                    <p>{data.major}</p>
                  </div>
                </li>
                <li className="py-3 flex justify-start items-center gap-x-4">
                  <PiSuitcaseThin size="40" color="#606060" />
                  <div>
                    <p>Lĩnh vực</p>
                    <p>{data.industry}</p>
                  </div>
                </li>
                {
                  data.skill ? (
                    <li className="py-3 flex justify-start items-center gap-x-4">
                      <PiShootingStarThin size="40" color="#606060" />
                      <div>
                        <p>Kỹ năng</p>
                        <p>Lập Trình NodeJS, JavaScript, Backend, Oracle, Agile</p>
                      </div>
                    </li>
                  ) : <></>
                }
                <li className="py-3 flex justify-start items-center gap-x-4">
                  <PiGlobeHemisphereWestThin size="40" color="#606060" />
                  <div>
                    <p>Ngôn ngữ CV</p>
                    <p>
                      {data.cvLangs.join(", ")}
                    </p>
                  </div>
                </li>
                <li className="py-3 flex justify-start items-center gap-x-4">
                  <PiMapPinThin size="40" color="#606060" />
                  <div>
                    <p>Địa điểm</p>
                    <p>
                      {data.locations.join(`, `)}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ApplyBtnToast />

    </div>
  );
}

export default JobDetail