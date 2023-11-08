'use client';
import { useParams, usePathname } from "next/navigation";
import { Accordion, AccordionHeader, AccordionItem, Nav, NavItem, NavLink, Offcanvas, OffcanvasBody } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

const Sidebar = ({ show, setShow, activeKey, onShow }) => {
  const handleClose = () => setShow(false);
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
            <AccordionItem eventKey="category"  className="mb-1" >
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
}

export default Sidebar

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