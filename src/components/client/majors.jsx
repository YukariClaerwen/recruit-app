import { Link } from 'lucide-react'
import Script from 'next/script'

const majors = () => {
    return (
        <>
            {/* icon scripts */}
            <Script
                src="https://unpkg.com/@phosphor-icons/web"
                strategy="lazyOnload"
                onLoad={() =>

                    console.log(`script loaded correctly, window.FB has been populated`)
                }
            />
            <div className="w-full py-20 px-35 lg:px-20">
                <div className="text-xl lg:text-2xl main-title mr-10 font-logo mb-0 font-medium mb-4">
                    Top ngành nghề
                    <span> triển vọng</span>
                </div>

                <ul className="grid grid-cols-4 gap-4">

                    {majors.length && majors.slice(0, 12).map(m =>
                        <li id={"major-" + m.id} key={m.id} className="major-item">
                            <Link href="/jobs" className="flex justify-start items-center gap-3 major-link p-3">
                                <div className="flex justify-center items-center"><i className={"ph-thin " + m.icon}></i> </div>
                                <div>
                                    <h5>{m.TenNganh}</h5>
                                    <p className="color-Purple font-bold">0 <span className="p1 color-Gray">việc làm</span></p>
                                </div>
                            </Link>
                        </li>)}
                </ul>
                <div className="flex justify-center my-5">
                    <Link href="/jobs" className="btn round-btn-border round-btn rounded-pill">
                        <div className="circle-arrow-btn flex justify-items-start gap-1">
                            Xem tất cả
                        </div>
                    </Link>
                </div>
            </div>
            {/* end recommend major */}
        </>
    )
}

export default majors