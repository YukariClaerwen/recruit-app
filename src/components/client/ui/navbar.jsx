"use client";
import { AiOutlineBell, AiOutlineMenu } from "react-icons/ai";
import React from "react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button, CloseButton } from "react-bootstrap";
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

  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
    router.push(pathname)
  }

  return (
    <div className="sticky top-[-1px] z-30 header">
      <nav className="navbar navbar-expand-lg px-3.5 lg:px-20 py-3 bg-white ">
        <div className="flex justify-between lg:items-center p-0 lg:flex-row w-full">
          <Link href="/" className="text-2xl lg:text-3xl big-purple-logo mr-10 font-logo mb-0">
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

              <div className="flex justify-center lg:justify-end items-center">
                {session?.user ? (
                  <>
                    <a href="#" className="hidden lg:grid circle-btn circle-btn-gray rounded-circle justify-items-center ml-2">
                      <div className="svg-container"><AiOutlineBell /></div>
                    </a>

                    <Button onClick={handleSignOut} className="rounded-full round-btn round-btn-border ml-5">Đăng xuất</Button>
                    {session?.user.role == "admin" ? (
                      <Link href="/admin" className="rounded-full round-btn ml-3">Bảng quản trị</Link>
                    ) : (<></>)}
                  </>
                ) : (
                  <>
                    <Link href="/sign-in" className="rounded-full round-btn round-btn-border ml-5">Đăng nhập</Link>
                    <Link href="/sign-up" className="rounded-full round-btn ml-3">Đăng ký</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
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
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body flex-grow-1 lg:justify-between lg:items-center">

              <Navlink />
              <div className="lg:flex justify-center lg:justify-end items-center hidden">

                <Link href="/employer" className="link-logo-btn mr-2 font-logo">
                  Nhà tuyển dụng
                </Link>
                {session?.user ? (
                  <>
                    <a href="#" className="hidden lg:grid circle-btn circle-btn-gray rounded-circle justify-items-center ml-2">
                      <div className="svg-container"><AiOutlineBell /></div>
                    </a>
                    <Button onClick={handleSignOut} className="ml-3">
                      <div className="circle-arrow-btn flex justify-items-start gap-1 uppercase">
                        Đăng xuất
                      </div>
                    </Button>
                  </>
                ) : (
                  <Link href="/sign-in" className="ml-3">
                    <div className="circle-arrow-btn flex justify-items-start gap-1 uppercase">
                      Đăng nhập
                    </div>
                  </Link>
                )}
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
        <Link href="/blogs" className={pathname == "/blogs" ? "nav-link nav-style mr-5 p-2 active" : "nav-link nav-style mr-5 py-2"}>Cẩm nang</Link>
      </li>
      <li className="nav-item" >
        <Link href="/CVs" className={pathname == "/CVs" ? "nav-link nav-style mr-5 p-2 active" : "nav-link nav-style mr-5 py-2"}>CV xịn</Link>
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

                <Link href="/employer" className="link-logo-btn mr-2 font-logo">
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
