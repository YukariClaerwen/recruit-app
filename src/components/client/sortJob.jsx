'use client';
import Link from "next/link"
import { Button, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap"
import Dropdown from "react-bootstrap/Dropdown"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from "react";

const SortJob = () => {

    const pathname = usePathname()
    const params = useSearchParams();
    const router = useRouter();


    const handleSort = (e, sort) => {
        const newParams = new URLSearchParams(params.toString());
        newParams.set('sort', sort)
        router.push(`${pathname}?${newParams.toString()}`);
    }

    return (
        <Dropdown align="end">
            <DropdownToggle id="dropdown-sort" className="rounded-pill round-btn small">
                Sắp xếp theo
            </DropdownToggle>

            <DropdownMenu>
                <DropdownItem as={Button} onClick={(e) => handleSort(e, 'default')}>Mặc định</DropdownItem>
                <DropdownItem as={Button} onClick={(e) => handleSort(e, 'salary')}>Lương (cao - thấp)</DropdownItem>
                <DropdownItem as={Button} onClick={(e) => handleSort(e, 'desc')}>Ngày đăng (mới nhất)</DropdownItem>
                <DropdownItem as={Button} onClick={(e) => handleSort(e, 'asc')}>Ngày đăng (cũ nhất)</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}

export default SortJob