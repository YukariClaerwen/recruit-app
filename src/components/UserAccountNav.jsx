"use client";

import { signOut, useSession } from "next-auth/react"
import Button, { btnVars } from "./ui/button"
import Link from "next/link";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

export const UserAccountNav = () => {
    const session = useSession();

    const [loading, setLoading] = useState(false);

    const handleSignOut = async () => {
        setLoading(true)
        await signOut({
            redirect: true,
            callbackUrl: '/'
        });
    }
    if(!session?.user) {
        <Link href="/sign-in" className={btnVars()}>Đăng nhập</Link>
    }
    
    return (
        <Button onClick={handleSignOut}>{loading ? <Spinner animation="border" variant="light" /> : <>Đăng xuất</>}</Button>
    )
}

export default UserAccountNav;