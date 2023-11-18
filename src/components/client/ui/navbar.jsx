"use client";
import { AiOutlineBell, AiOutlineMenu } from "react-icons/ai";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Navbar as ReactNavbar, Button, CloseButton, Container, NavbarBrand, NavbarToggle, NavbarOffcanvas, OffcanvasHeader, OffcanvasTitle, OffcanvasBody, Nav, NavLink, NavDropdown, DropdownItem, DropdownDivider, Dropdown, DropdownToggle, DropdownMenu } from "react-bootstrap";
import Logo from "@/components/ui/logo";
import Image from "next/image";
import { FilePlus, FileText, Files, Gear, SignOut, Sliders, UserCircle, UserCircleGear } from "@phosphor-icons/react/dist/ssr";
// import bootstrap from "bootstrap";
// import { useRouter } from "next/router";

const Navbar = () => {
  // const topicRef = useRef(null);
  // const closeOffCanvas = (event) => {
  //   event.stopPropagation();
  //   const bootstrap = require("bootstrap/dist/js/bootstrap");

  //   var myOffcanvas = topicRef.current;
  //   var bsOffcanvas = bootstrap.Offcanvas.getInstance(myOffcanvas);

  //   bsOffcanvas.hide();
  // }

  const { data: session } = useSession();


  return (
    <div className="sticky top-[-1px] z-30 header">
      <ReactNavbar expand="md" className=" px-3.5 lg:px-20 py-3 bg-white ">
        <Container fluid className="p-0 w-full">
          <NavbarBrand className="mr-0"><Logo href="/" size="lg" className="mr-10" /></NavbarBrand>
          <NavbarToggle aria-controls={`offcanvasNavbar-expand-md`}><AiOutlineMenu /></NavbarToggle>
          <NavbarOffcanvas
            id={`offcanvasNavbar-expand-md`}
            aria-labelledby={`offcanvasNavbarLabel-expand-md`}
            placement="end"
          >
            <OffcanvasHeader closeButton>
              <OffcanvasTitle id={`offcanvasNavbarLabel-expand-md`}>
                <Logo href="/" size="lg" className="mr-10" />
              </OffcanvasTitle>
            </OffcanvasHeader>
            <OffcanvasBody className="flex-grow-1 lg:justify-between lg:items-center">

              <Navlink />

              <div className="flex justify-center lg:justify-end items-center">
                <UserDrop session={session} />

              </div>
            </OffcanvasBody>
          </NavbarOffcanvas>
        </Container>
      </ReactNavbar>
    </div>
  );
};
export default Navbar;

export const Navbar2 = () => {

  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    router.push(pathname)
  }
  return (
    <div className="z-30 header">

      <nav className="navbar navbar-expand-lg px-3.5 lg:px-20 py-1 bgcolor-LightGray ">
        <div className="flex justify-between lg:items-center p-0 lg:flex-row w-full">
          <Link href="/" className="text-xl lg:text-2xl big-purple-logo mr-10 font-logo mb-0">
            Ketnoi
            <span>Vieclam</span>
          </Link>
          <div>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvas">
              <AiOutlineMenu />
            </button>
          </div>
          <div className="offcanvas-md offcanvas-end justify-between w-full" tabIndex="-1" id="navbarOffcanvas" aria-labelledby="navbarOffcanvasLabel">
            <div className="offcanvas-header">

              <Link href="/" className="text-2xl lg:text-3xl big-purple-logo mr-10 font-logo mb-0">
                Ketnoi
                <span>Vieclam</span>
              </Link>
              {/* <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button> */}
            </div>
            <div className="offcanvas-body flex-grow-1 lg:justify-between lg:items-center">

              <Navlink />
              <div className="lg:flex justify-center lg:justify-end items-center hidden">

                <Link href="/" className="link-logo-btn mr-2 font-logo">
                  Nhà tuyển dụng
                </Link>
                <UserDrop session={session} />
              </div>
              <div className="block lg:hidden">
                <BtnGroup />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

const Navlink = () => {
  const pathname = usePathname();
  return (
    <ul className="navbar-nav">
      <li className="nav-item" >
        <Link href="/jobs" className={pathname == "/jobs" ? "nav-link nav-style mr-5 p-2 active" : "nav-link nav-style mr-5 py-2"}>Việc làm</Link>
      </li>
      <li className="nav-item" >
        <Link href="/companies" className={pathname == "/companies" ? "nav-link nav-style mr-5 p-2 active" : "nav-link nav-style mr-5 py-2"}>Danh sách công ty</Link>
      </li>
      <li className="nav-item" >
        <Link href="/" className={pathname == "/blogs" ? "nav-link nav-style mr-5 p-2 active" : "nav-link nav-style mr-5 py-2"}>Cẩm nang</Link>
      </li>
      <li className="nav-item" >
        <Link href="/" className={pathname == "/CVs" ? "nav-link nav-style mr-5 p-2 active" : "nav-link nav-style mr-5 py-2"}>CV xịn</Link>
      </li>
    </ul>
  );
}

const BtnGroup = () => {
  return (
    <div className="flex justify-center lg:justify-end items-center">
      <a href="#" className="hidden lg:grid circle-btn circle-btn-gray rounded-circle justify-items-center ml-2">
        <div className="svg-container"><AiOutlineBell /></div>
      </a>
      <Link href="/sign-in" className="rounded-full round-btn round-btn-border ml-5">Đăng nhập</Link>
      <Link href="/sign-up" className="rounded-full round-btn ml-3">Đăng ký</Link>
    </div>
  )
}

export const NavbarEmployer = () => {
  return (
    <div className="z-30 header">
      <nav className="navbar navbar-expand-lg px-3.5 lg:px-20 py-1 bgcolor-LightGray ">
        <div className="flex justify-between lg:items-center p-0 lg:flex-row w-full">
          <Link href="/" className="text-xl lg:text-2xl big-purple-logo mr-10 font-logo mb-0">
            Ketnoi
            <span>Vieclam</span>
          </Link>
          <div>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvas">
              <AiOutlineMenu />
            </button>
          </div>
          <div className="offcanvas-md offcanvas-end justify-between w-full" tabIndex="-1" id="navbarOffcanvas" aria-labelledby="navbarOffcanvasLabel">
            <div className="offcanvas-header">

              <Link href="/" className="text-2xl lg:text-3xl big-purple-logo mr-10 font-logo mb-0">
                Ketnoi
                <span>Vieclam</span>
              </Link>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body flex-grow-1 lg:justify-between lg:items-center">

              <Navlink />
              <div className="lg:flex justify-center lg:justify-end items-center hidden">

                <Link href="/" className="link-logo-btn mr-2 font-logo">
                  Nhà tuyển dụng
                </Link>
                <a href="#" className="hidden lg:grid circle-btn circle-btn-gray rounded-circle justify-items-center ml-2">
                  <div className="svg-container"><AiOutlineBell /></div>
                </a>
                <Link href="/sign-in" className="ml-3">
                  <div className="circle-arrow-btn flex justify-items-start gap-1 uppercase">
                    Đăng nhập
                  </div>
                </Link>
              </div>
              <div className="block lg:hidden">
                <BtnGroup />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};


const UserDrop = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    if (session?.user.role == "admin")
      router.push("/auth-admin/sign-in");
    else
      router.push(pathname);
  }
  return (
    <>
      {session?.user ? (
        <>
          <Dropdown as="li" className="nav-item px-3 flex justify-center items-stretch self-stretch ">
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
              <span className="nav-profile-name">{session?.user.username || session?.user.name}</span>
            </DropdownToggle>

            <DropdownMenu className="dropdown-menu-right navbar-dropdown" align="end">
              {session?.user.role == "admin" ? (
                <>
                  <DropdownItem href="/admin" className="flex items-center flex-row gap-2 justify-start">
                    <Sliders size={20} weight="thin" />
                    Bảng quản trị
                  </DropdownItem>
                  <DropdownItem href="/admin/jobs" className="flex items-center flex-row gap-2 justify-start">
                    <Files size={20} weight="thin" />
                    Tuyển dụng
                  </DropdownItem>
                  <DropdownItem href="/admin/jobs/post" className="flex items-center flex-row gap-2 justify-start">
                    <FilePlus size={20} weight="thin" />
                    Đăng tuyển dụng
                  </DropdownItem>
                </>
              ) : (<></>)}
              {session?.user.role == "user" ? (
                <>
                  <DropdownItem href="/dashboard" className="flex items-center flex-row gap-2 justify-start">
                    <FileText size={20} weight="thin" />
                    Hồ sơ
                  </DropdownItem>
                  <DropdownItem href="/dashboard/applied" className="flex items-center flex-row gap-2 justify-start">
                    <Files size={20} weight="thin" />
                    Việc làm đã ứng tuyển
                  </DropdownItem>
                  <DropdownItem href="/dashboard/savedJobs" className="flex items-center flex-row gap-2 justify-start">
                    <Files size={20} weight="thin" />
                    Việc làm yêu thich
                  </DropdownItem>
                </>
              ) : <></>}
              <DropdownDivider />
              <DropdownItem href="/dashboard/account" className="flex items-center flex-row gap-2 justify-start">
                <UserCircleGear size={20} weight="thin" />
                Tài khoản
              </DropdownItem>
              <DropdownItem as={Button} onClick={handleSignOut} className="flex items-center flex-row gap-2 justify-start">
                <SignOut size={20} weight="thin" />
                Đăng xuất
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          {/* <a href="#" className="hidden lg:grid circle-btn circle-btn-gray rounded-circle justify-items-center ml-2">
                      <div className="svg-container"><AiOutlineBell /></div>
                    </a> */}

        </>
      ) :

        <>
          <Link href="/sign-in" className={`rounded-full round-btn round-btn-border ml-5 ${pathname === '/' ? '' : 'small px-3 py-1'}`}>Đăng nhập</Link>
          <Link href="/sign-up" className={`rounded-full round-btn ml-3 ${pathname === '/' ? '' : 'hidden'}`}>Đăng ký</Link>
        </>
      }

    </>
  )
}