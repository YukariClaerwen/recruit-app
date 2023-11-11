'use client';
import { useState } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';


const Layout = ({ children }) => {
    const [show, setShow] = useState(true);
    const handleShow = () => {
        setShow((s) => !s);
        setWidth((w) => {
            if (w == "80%") return "100%";
            return "80%"
        })
    };;
    const pathname = usePathname();
    const split = pathname.split(`/`);

    const [width, setWidth] = useState('100%');

    const onShowing = () => {
        setWidth("80%");
    };
    return (
        <>
            <Navbar showSidebar={handleShow} />
            <Sidebar show={show} setShow={setShow} activeKey={split[2]} onShow={onShowing} />
            <div className="flex justify-end">
                <div id="main-dashboard" className="transition-all" style={{ width: width }}>
                    <div className="container pt-5">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
};

export default Layout;