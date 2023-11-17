"use client";

import { signOut, useSession } from "next-auth/react";
import { Bell, UserCircle, Gear, SignOut, Sliders, UserCircleGear } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Button from 'react-bootstrap/Button';
import { Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { useRouter } from "next/navigation";

const UserNav = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const handleSignOut = async () => {
        await signOut();
        if(session?.user.role == "admin")
            router.push("/auth-admin/sign-in");
        else
            router.push("/");
    }

    return (
        <>
            <li className="nav-item dropdown px-3 flex justify-center items-stretch self-stretch ">
                <a className="nav-link count-indicator dropdown-toggle flex flex-row items-center" id="notificationDropdown" href="#" data-toggle="dropdown">
                    <span className="count"></span>
                    <Bell size={20} weight="thin" />
                </a>
                {/* <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                            <a className="dropdown-item">
                                <p className="mb-0 font-weight-normal float-left">You have 4 new notifications
                                </p>
                                <span className="badge badge-pill badge-warning float-right">View all</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-success">
                                        <i className="mdi mdi-information mx-0"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content">
                                    <h6 className="preview-subject font-weight-medium">Application Error</h6>
                                    <p className="font-weight-light small-text mb-0">
                                        Just now
                                    </p>
                                </div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-warning">
                                        <i className="mdi mdi-settings mx-0"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content">
                                    <h6 className="preview-subject font-weight-medium">Settings</h6>
                                    <p className="font-weight-light small-text mb-0">
                                        Private message
                                    </p>
                                </div>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item preview-item">
                                <div className="preview-thumbnail">
                                    <div className="preview-icon bg-info">
                                        <i className="mdi mdi-account-box mx-0"></i>
                                    </div>
                                </div>
                                <div className="preview-item-content">
                                    <h6 className="preview-subject font-weight-medium">New user registration</h6>
                                    <p className="font-weight-light small-text mb-0">
                                        2 days ago
                                    </p>
                                </div>
                            </a>
                        </div> */}
            </li>
            <Dropdown as="li" className="nav-item px-3 border-x flex justify-center items-stretch self-stretch ">
                <DropdownToggle as="a" id="dropdown-profile" href="#" className="nav-link flex flex-row items-center gap-2">
                    {session?.user.image ? (
                        <Image
                            src={session.user.image}
                            alt="profile"
                            width={30}
                            height={30}
                            priority
                            className="rounded-full"
                        />
                    ) : (<UserCircle size={30} weight="thin" />)}
                    <span className="nav-profile-name">{session?.user.username}</span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-right navbar-dropdown" align="end">
                    <DropdownItem href="/dashboard/account" className="flex items-center flex-row gap-2 justify-start">
                        <UserCircleGear size={20} weight="thin" />
                        Tài khoản
                    </DropdownItem>
                    {session?.user.role === 'admin' ?
                        <>
                            <DropdownItem href="/admin" className="flex items-center flex-row gap-2">
                                <Sliders size={20} weight="thin" />
                                Bảng quản trị
                            </DropdownItem>
                        </>
                        : <></>
                    }
                    <DropdownDivider />
                    <DropdownItem href="/dashboard/account" className="flex items-center flex-row gap-2">
                        <Gear size={20} weight="thin" />
                        Thiết lập
                    </DropdownItem>
                    <DropdownItem as={Button} onClick={handleSignOut} className="flex items-center flex-row gap-2">
                        <SignOut size={20} weight="thin" />
                        Đăng xuất
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

export default UserNav