
import { useEffect } from "react";
import JobFav from "../jobfavorite";

const ApplyBtnToast = () => {

  const onScroll = () => {
    const pos = 250;
    const top = window.pageYOffset;
    const scrollPos = document.getElementsByTagName("body")[0].scrollTop;
    console.log(scrollPos, top)
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
            <ApplyBtn/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyBtnToast;

export const ApplyBtn = () => {
  return (
    <div className="flex justify-end gap-3 items-center sticky-bottom stiky bottom-50">
      <JobFav />
      <button className="btn round-btn-border round-btn rounded-pill">
        <div className="circle-arrow-btn flex justify-items-start gap-1">
          Ứng tuyển
        </div>
      </button>
    </div>
  )
}