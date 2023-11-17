"use client";

import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

const JobFav = (props) => {
  const { toast } = useToast();
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState({
    isAdded: props.job.isSaved,
    isHovered: false,
  });



  const onSubmit = async () => {

    const response = await fetch('/api/job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        jobId: props.job.id,
        isFavorite: isFavorite.isAdded
      })
    })

    if (response.ok) {
      const resData = await response.json()
      

      toast({
        description: <p>{(!isFavorite.isAdded) ? "Đã thêm việc làm vào danh sách yêu thích" : "Đã xóa việc làm khỏi danh sách yêu thích"}</p>,
        variant: 'success',
      })
      setIsFavorite(old => ({
        isAdded: !old.isAdded,
        isHovered: old.isHovered,
      }))
      router.refresh()
    } else {
      const resData = await response.json()
      toast({
        title: "Lỗi!",
        description: <p dangerouslySetInnerHTML={{ __html: resData.message }} />,
        variant: 'destructive',
      })
    }

  }


  return (
    <span onClick={onSubmit} onMouseEnter={() => setIsFavorite(old => ({
      isAdded: old.isAdded,
      isHovered: true,
    }))} onMouseLeave={() => setIsFavorite(old => ({
      isAdded: old.isAdded,
      isHovered: false,
    }))} className="cursor-pointer">
      {
        (() => {
          if (isFavorite.isAdded)
            return <AiFillHeart size={24} color="#FFBB58" />
          if (isFavorite.isHovered)
            return <AiFillHeart size={24} color="#D69DF1" />
          else
            return <AiOutlineHeart size={24} color="#606060" />
        })()
      }
    </span>
  )
}
export default JobFav;