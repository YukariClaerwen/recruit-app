'use client';
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import { Accordion, AccordionHeader, AccordionItem, Nav, NavItem, NavLink, Offcanvas, OffcanvasBody } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

const Sidebar = ({ show, setShow, activeKey, onShow }) => {
  const {data : session} = useSession();
  const handleClose = () => setShow(false);
  if (session?.user && session?.user.role === "admin") {
    return (
      <>
        <Offcanvas show={show} onHide={handleClose} className="sidebar w-1/5" scroll="true" backdrop={false} onShow={onShow}>
          <OffcanvasBody>
            <Accordion defaultActiveKey={[activeKey]} alwaysOpen className="border-0 bg-transparent" id="sidebar-accordion">
              <AccordionItem as={Nav} className="block mb-1">
                <SideNav path="/admin" child={false} name="Dashboard" />
              </AccordionItem>
              <AccordionItem as={Nav} className="block mb-1">
                <SideNav path="/admin/jobs" name="Tuyển dụng" />
              </AccordionItem>
              <AccordionItem eventKey="users" className="mb-1" >
                <AccordionHeader>Người dùng</AccordionHeader>
                <AccordionBody>
                  <Nav className="flex-column pe-3">
                    <SideNav path="/admin/users" param="candidate" name="Ứng viên" />
                    <SideNav path="/admin/users" param="recruiter" name="Nhà tuyển dụng" />
                    <SideNav path="/admin/users" param="consultant" name="Tư vấn viên" />
                    <SideNav path="/admin/users" param="admin" name="Admin" />
                  </Nav>
                </AccordionBody>
              </AccordionItem>
              <AccordionItem eventKey="category" className="mb-1" >
                <AccordionHeader>Danh mục</AccordionHeader>
                <AccordionBody>
                  <Nav className="flex-column pe-3">
                    <SideNav path="/admin/category/major" child={true} name="Ngành nghề" />
                  </Nav>
                </AccordionBody>
              </AccordionItem>
            </Accordion>
          </OffcanvasBody>
        </Offcanvas>
      </>
    )
  } else if (session?.user && session?.user.role === "user") {
    return (

      <>
        <Offcanvas show={show} onHide={handleClose} className="sidebar w-1/5" scroll="true" backdrop={false} onShow={onShow}>
          <OffcanvasBody>
            <Accordion defaultActiveKey={[activeKey]} alwaysOpen className="border-0 bg-transparent" id="sidebar-accordion">
              <AccordionItem as={Nav} className="block mb-1">
                <SideNav path="/dashboard" child={false} name="Dashboard" />
              </AccordionItem>
              <AccordionItem as={Nav} className="block mb-1">
                <SideNav path="/dashboard/applied" child={false} name="Việc làm đã ứng tuyển" />
              </AccordionItem>
              <AccordionItem as={Nav} className="block mb-1">
                <SideNav path="/dashboard/savedJobs" child={false} name="Việc làm yêu thích" />
              </AccordionItem>
              <AccordionItem as={Nav} className="block mb-1">
                <SideNav path="/dashboard/account" child={false} name="Tài khoản" />
              </AccordionItem>
            </Accordion>
          </OffcanvasBody>
        </Offcanvas>
      </>
    )
  } else {
    return <></>
  }
}

export default Sidebar

const UserSidebar = () => {
  return (
    <>
      <AccordionItem as={Nav} className="block mb-1">
        <SideNav path="/dashboard" child={false} name="Dashboard" />
      </AccordionItem>
      <AccordionItem as={Nav} className="block mb-1">
        <SideNav path="/dashboard/applied" child={false} name="Việc làm đã ứng tuyển" />
      </AccordionItem>
      <AccordionItem as={Nav} className="block mb-1">
        <SideNav path="/dashboard/account" child={false} name="Tài khoản" />
      </AccordionItem>
    </>
  )
}

const AdminSidebar = () => {
  return (
    <>

    </>
  )
}

const SideNav = ({ path, param = "", child = true, name, ...props }) => {
  const pathname = usePathname();
  const params = useParams()

  let active = false;
  if ((params.tag == param) || (!params.tag && (pathname == path || (pathname.includes(path) && child)))) {
    active = true;
  }
  return (
    <NavItem>
      <NavLink
        {...props}
        href={`${path}/${param}`}
        active={active}
      >
        {name}
      </NavLink>
    </NavItem>
  )
}