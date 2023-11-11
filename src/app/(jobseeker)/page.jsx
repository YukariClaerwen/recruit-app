import User from "@/components/User";
import JobList from "@/components/client/jobs";
import Header from "@/components/client/ui/header";
import Navbar from "@/components/client/ui/navbar";
import { SearchBar } from "@/components/client/ui/TopSearch";
import { btnVars } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from 'next/link';
import { FaRegBookmark } from "react-icons/fa6";
import { getJobs } from "../api/job/job";
import Script from "next/script";
import Majors from "@/components/client/majors";
import { getMajors } from "../api/job/major";
import { getTags } from "../api/job/tag";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const data = await getJobs();
  const majors = await getMajors(12);
  const tags = await getTags(5)

  // console.log(session)

  return (
    <div>
      <Header />
      <Navbar />
      <div className="px-3.5 lg:px-20 pt-5">
        <div className="flex">
          <div
            className="basis-2/3 flex flex-col"
            style={{ position: "relative" }}
          >
            <Image
              src="/headerBlur.png"
              width={300}
              height={0}
              className="z-0"
              style={{
                position: "absolute",
                bottom: "-40px", // adjust this value to move the image to the top
                left: "-80px", // adjust this value to move the image to the left
                maxWidth: "none",
              }}
              alt=""
            />
            <h1 className="color-Purple m-0 font-logo">
              Kết Nối Việc Làm
            </h1>
            <h1 className="m-0 font-logo" style={{ zIndex: 10 }}>
              Kết Nối Tới Thành Công
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur. Nisl viverra elit <br />
              pellentesque elementum id vulputate aliquet quam. Orci eget id ac <br />
              pellentesque ultricies consectetur consequat purus.
            </p>
            {/* search bar */}
            <div className="rounded-pill bgcolor-LightGray mt-4 mb-3 p-3">
              <div className="rounded-full">
                <SearchBar />
              </div>
            </div>
          </div>
          {/* end search bar */}
          <div className="basis-1/3 flex z-10" style={{ position: "relative" }}>
            <Image
              src="/headerBlur.png"
              width={300}
              height={0}
              style={{
                position: "absolute",
                top: "130px", // adjust this value to move the image to the bottom
                right: "110px", // adjust this value to move the image to the left
                maxWidth: "none",
              }}
              alt=""
            />
            <Image
              src="/headerBg.png"
              width={345}
              height={0}
              style={{
                position: "absolute",
                maxWidth: "none",
                left: "-30px", // adjust this value to move the image to the left
              }}
              alt=""
            />
            <Image
              src="/headerImg.png"
              width={290}
              height={0}
              style={{
                position: "absolute",
                maxWidth: "none",
              }}
              alt="Picture of the girl"
            />
          </div>
        </div>
      </div>

      {/* recommend tags */}
      <div className="mb-5 z-10 px-3.5 lg:px-20 relative">
        <p className="color-Purple">
          <FaRegBookmark className="inline mr-1" />
          <span className="font-logo mr-3">Gợi ý: </span>
          <Link href="/jobs?location=26" className="text-sm link-style link-recommend mr-2">Việc làm HCM</Link>
          <Link href="/jobs?location=22" className="text-sm link-style link-recommend mr-2">Việc làm Hà Nội</Link>

          {
            tags.map(tag =>
              <Link key={tag.id} href={`/jobs?tag=${tag.id}`} className="text-sm link-style link-recommend mr-2">{tag.name}</Link>
            )
          }
          {/* <Link href="/jobs?location=26" className="text-sm link-style link-recommend mr-2">Ngân hàng</Link>
          <Link href="/jobs?location=26" className="text-sm link-style link-recommend mr-2">Thiết kế</Link>
          <Link href="/jobs?location=26" className="text-sm link-style link-recommend mr-2">Lập trình</Link>
          <Link href="/jobs?location=26" className="text-sm link-style link-recommend mr-2">Sales</Link> */}
        </p>
      </div>
      {/* end recommend tags */}

      {/* recommend jobs */}
      <div className="bgcolor-LightGray w-full py-20 px-3.5 lg:px-20">
        <div className="flex justify-between items-end">
          <div className="text-xl lg:text-2xl main-title mr-10 font-logo mb-0 font-medium">
            Việc làm
            <span> nổi bật</span>
          </div>

          <Link href="/jobs">
            <div className="circle-arrow-btn flex justify-items-start gap-1">
              Xem tất cả
            </div>
          </Link>
        </div>
        <div className="lg:flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-none lg:justify-start gap-4 my-3.5">
          {/* <Link href="/jobs?" className="round-btn round-btn-no-border btn rounded-pill">Việc làm nổi bật</Link> */}
          <Link href="/jobs?sort=salary" className="round-btn round-btn-no-border btn rounded-pill">Việc làm lương cao</Link>
          <Link href="/jobs?location=26" className="round-btn round-btn-no-border btn rounded-pill">Việc làm HCM</Link>
          <Link href="/jobs?location=22" className="round-btn round-btn-no-border btn rounded-pill">Việc làm Hà Nội</Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <JobList data={data} />
        </div>
        <div className="flex justify-center my-5">
          <Link href="/jobs" className="btn round-btn-border round-btn rounded-pill">
            <div className="circle-arrow-btn flex justify-items-start gap-1">
              Xem tất cả
            </div>
          </Link>
        </div>
      </div>
      {/* end recommend jobs */}

      {/* recommend major */}
      {/* icon scripts */}
      <div className="w-full py-20 px-35 lg:px-20">
        <div className="text-xl lg:text-2xl main-title mr-10 font-logo mb-0 font-medium mb-4">
          Top ngành nghề
          <span> triển vọng</span>
        </div>


        <Majors data={majors} />
        <div className="flex justify-center my-5">
          <Link href="/jobs/majors" className="btn round-btn-border round-btn rounded-pill">
            <div className="circle-arrow-btn flex justify-items-start gap-1">
              Xem tất cả
            </div>
          </Link>
        </div>
      </div>
      {/* end recommend major */}
    </div>
  );
}