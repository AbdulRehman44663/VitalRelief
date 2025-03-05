import React from "react";
import blogImg from "../../assets/models/blog-1.png";
import blogUserIcon from "../../assets/models/blog-user-icon.png";
import {BLOG_IMAGES_PATH } from "../../config/constants";
import Image from "next/image";
import Link from "next/link";
import { calculateReadTime, formatBlogDate, limitText } from "@/helpers/helper";
import { useRouter } from "next/router";

function BlogCard({item}) {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-6">
      {item?.files?.length>0 ? 
                                    
        <Image
          src={BLOG_IMAGES_PATH +"/"+ item?.files[0]?.file}
          className="rounded-lg blog-image w-full h-[250px]"
          width={100}
          height={100}
          alt={item.title}
        /> :
        <div className="rounded-lg blog-image w-full h-[250px]"></div>
        }
     
      <div className="flex flex-col gap-2">
        <div  onClick={()=>router.push('/blogs/'+item?.slug)} className="fs-32-400-lato txt-color-darkgray md:min-h-[82px] truncate line-clamp-3 !whitespace-normal cursor-pointer">
          {item?.title}
        </div>
        <div className="fs-16-400-lato txt-color-gray700 md:min-h-[48px] truncate line-clamp-2 !whitespace-normal">
        {limitText( item?.description,175)}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Image
          src={blogUserIcon}
          className="rounded-full  h-12 w-12"
          alt="blog user"
        />
        <div className="flex flex-col">
          <div className="fs-14-700-lato txt-color-darkgray">{item?.authors}</div>
          <div className="flex items-center gap-2">
            <span className="fs-14-400-lato txt-color-gray700">
             {formatBlogDate(item?.date)}
            </span>
            <span className="fs-14-400-lato txt-color-gray700">.</span>
            <span className="fs-14-400-lato txt-color-gray700">{calculateReadTime(item?.details)}</span>
          </div>
        </div>
      </div>
      <Link
        href={
          "/blogs/"+item?.slug
        }
        className="btn flex items-center justify-between py-3 px-6 border border-[#97B2A9] rounded-lg"
      >
        <div className="fs-16-400-lato txt-color-gray800">Continue Reading</div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_54_5922)">
            <path
              d="M5 12H19"
              stroke="#344054"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 16L19 12"
              stroke="#344054"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 8L19 12"
              stroke="#344054"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_54_5922">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </Link>
    </div>
  );
}

export default BlogCard;
