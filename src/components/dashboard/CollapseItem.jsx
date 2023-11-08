import { useState } from "react";
import { AccordionHeader, Button, Collapse } from "react-bootstrap"


const CollapseItem = ({id, title, content}) => {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen(!open)
  }
  return (
    <>
        <Button
            as="AccordionHeader"
            onClick={toggle}
            aria-controls={id}
            aria-expanded={open}
          >{title}</Button>
          <Collapse in={open}>
            <div id={id}>
              {content}
            </div>
          </Collapse>
    </>
  )
}

export default CollapseItem