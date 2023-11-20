
import { useEffect, useRef, useState } from "react";
import { upload } from '@vercel/blob/client';
import JobFav from "../jobfavorite";
import Link from "next/link";
import { FormControl, FormGroup, FormLabel, Spinner } from "react-bootstrap";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Dialog from "@/components/uploadDialog";
import { file_validate, uploadFileYup } from "@/lib/inputValidation";
import { CloudArrowUp } from "@phosphor-icons/react/dist/ssr";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

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
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const inputFileRef = useRef(null);
  const onClose = () => {
    router.push(pathname, { scroll: false }, { shallow: true });
    // form.resetField("inputField");
  }
  const searchParams = useSearchParams();

  const [btnState, setBtnState] = useState({
    uploaded: false,
    loading: false
  });
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [blob, setBlob] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleShow = (e) => {
    e.stopPropagation();
  }
  const onOk = () => { }
  const onShow = () => { }

  const validate_file = async (event) => {

    setBtnState({
      uploaded: false,
      loading: true
    })
    event.preventDefault();

    const file = inputFileRef.current.files[0];
    const result = file_validate(file, "application")

    setErr(!result.status);
    setErrMsg(result.message);

    if (result.status) {
      const file = inputFileRef.current.files[0];
      setFileName(file.name)
      const newBlob = await upload(`cvs/${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/avatar/upload',
      });

      if (newBlob?.url) {
        setBtnState({
          uploaded: true,
          loading: false
        })
      }

      setBlob(newBlob);
    }

  }

  const onSubmit = async (event) => {
    event.preventDefault();
    setBtnState({
      uploaded: true,
      loading: true
    })

    const res = await fetch('/api/job/apply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cv: blob.url,
        jobId: searchParams.get("id"),
      })
    })

    if (res.ok) {

      const resData = await res.json()
      toast({
        description: <p dangerouslySetInnerHTML={{ __html: resData.message }} />,
        variant: 'success',
      })
      router.push(pathname)
    } else {
      setBtnState({
        uploaded: true,
        loading: false
      })
      const resData = await res.json()
      toast({
        title: "Lỗi!",
        description: <p dangerouslySetInnerHTML={{ __html: resData.message }} />,
        variant: 'destructive',
      })
    }

  }

  return (
    <>
      <div className="flex justify-end gap-3 items-center ">
        {/* <JobFav /> */}
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

      <Dialog title={title} onClose={onClose} onOk={onOk} onShow={onShow} onSave={onSubmit} btn={btnState} >

        { session?.user ?
        
        <FormGroup className="mb-3" controlId="file">
          <FormLabel className="bg-white hover:bg-fuchsia-200 border-dotted border-2 rounded w-full h-[10rem] relative flex justify-center items-center">
            {
              !blob && <div className={` flex justify-center items-center flex-col gap-2 `}>
                <CloudArrowUp size={32} weight="thin" />
                <p>Tải CV từ máy của bạn để ứng tuyển</p>
                {btnState.loading && !btnState.uploaded ? <><Spinner animation="border" size="sm" className="mr-2" /> Đang tải...</> : null}
              </div>
            }
            {blob && (
              <div className="text-center">
                <p><b>{fileName}</b> đã lưu vào <a href={blob.url} className="color-Purple underline">đường dẫn</a></p>
                <p>Hãy nhấn nút nộp đơn để ứng tuyển vào việc làm này.</p>
              </div>
            )
            }
          </FormLabel>
          <FormControl type="file" name="file" ref={inputFileRef} onChange={validate_file} className="hidden" />
          {err ? <div className="text-danger mt-2">(*) {errMsg}</div> : <></>}

        </FormGroup>
        
        : <><p>Vui lòng <Link href="/sign-in" className="color-Purple underline" >Đăng Nhập</Link> để thực hiện chức năng này</p></>}

        
      </Dialog>
    </>
  )
}