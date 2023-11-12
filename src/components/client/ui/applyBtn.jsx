
import { useEffect } from "react";
import JobFav from "../jobfavorite";
import Link from "next/link";
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Dialog from "@/components/dialog";
import { uploadFileYup } from "@/lib/inputValidation";
import { yupResolver } from "@hookform/resolvers/yup";

const ApplyBtnToast = () => {

  const onScroll = () => {
    const pos = 250;
    const top = window.pageYOffset;
    // const scrollPos = document.getElementsByTagName("body")[0].scrollTop;

    if (top >= pos)
      document.getElementById("liveToast").classList.add("show");
    else
      document.getElementById("liveToast").classList.remove("show");
  }

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    }
  }, []);


  return (
    <div id="fixedApplybtn">
      {/* <button type="button" onClick={showToast} className="btn hidden">
        Show Toast
      </button> */}

      <div className="toast-container position-fixed p-3 bottom-0 end-10 w-auto">
        <div
          id="liveToast"
          className="toast w-auto"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-body bgcolor-DarkPurple color: white">
            <ApplyBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyBtnToast;

export const ApplyBtn = ({ title, id }) => {
  const schema = uploadFileYup.schema
  const pathname = usePathname()
  const router = useRouter();
  const onClose = () => {
    router.push(pathname, { scroll: false }, { shallow: true });
    form.resetField("inputField");
  }

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const handleShow = (e) => {
    e.stopPropagation();
  }
  const onOk = () => { }
  const onShow = () => { }
  const onSubmit = async (value) => {
    console.log(value)
  }

  return (
    <>
      <div className="flex justify-end gap-3 items-center sticky-bottom stiky bottom-50">
        <JobFav />
        <Link onClick={handleShow}
          as={`${pathname}?showDialog=y&action=apply&id=${id}`}
          href={{
            pathname: `${pathname}?showDialog=y`
          }}
          scroll={false}
          shallow={true}
          className="btn round-btn-border round-btn rounded-pill">
          <div className="circle-arrow-btn flex justify-items-start gap-1">
            Ứng tuyển
          </div>
        </Link>
      </div>

      <Dialog title={title} onClose={onClose} onOk={onOk} onShow={onShow} onSave={onSubmit} form={form} >
        <FormGroup className="mb-3" controlId="file">
          <FormLabel>Tải CV từ máy của bạn để ứng tuyển</FormLabel>
          <FormControl type="file" />
        </FormGroup>
      </Dialog>
    </>
  )
}