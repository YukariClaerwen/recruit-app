'use client';
import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useParams, usePathname } from 'next/navigation';

const Menu = () => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow((s) => !s);;
    const pathname = usePathname();
    const split = pathname.split(`/`);
    return (
        <>
            <Navbar showSidebar={handleShow} />
            <Sidebar show={show} setShow={setShow} activeKey={split[2]} />
        </>
    )
}

export default Menu