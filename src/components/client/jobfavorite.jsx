"use client";

import { useState } from "react";
import { AiOutlineHeart, AiFillHeart} from "react-icons/ai";

const JobFav = () => {
    const [isFavorite, setIsFavorite] = useState({
        isAdded: false,
        isHovered: false,
      });
      return (
        <span onClick={() => setIsFavorite(old => ({
            isAdded: !old.isAdded,
            isHovered: old.isHovered,
          }))} onMouseEnter={() => setIsFavorite(old => ({
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