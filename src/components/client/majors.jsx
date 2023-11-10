'use client';

import Link from 'next/link';
import Script from 'next/script'

const Majors = ({ data }) => {
    const majors = data;
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
            <ul className="grid grid-cols-4 gap-4">
                {majors.map(m =>
                    <li id={"major-" + m.id} key={m.id} className="major-item">
                        <Link href={`/jobs?major=${m.id}`} className="flex justify-start items-center gap-3 major-link p-3">
                            <div className="flex justify-center items-center"><i className={"ph-thin " + m.icon}></i> </div>
                            <div>
                                <p className="text-xl truncate ...">{m.ten_nganh}</p>
                                <p className="color-Purple">{m._count.ds_viec_lam} <span className="p1 color-Gray">việc làm</span></p>
                            </div>
                        </Link>
                    </li>)
                }
            </ul>
        </>
    )
}

export default Majors