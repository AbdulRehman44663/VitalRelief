import React from "react";
import BreadcrumbComp from "../Breadcrumb";
import Image from "next/image";
import blogImg from "../../assets/images/blog-header-1.jpg";
import userImg from "../../assets/images/user-icon.jpg";
import { BLOG_IMAGES_PATH } from "@/config/constants";
import { calculateReadTime, formatBlogDate } from "../../helpers/helper";

import Link from "next/link";
import { useRouter } from "next/router";
function BlogHeader({ blog }) {
  
  const router = useRouter();
  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Blog",
    },
  ];
  return (
    <>
      <div className="flex justify-start md:justify-center">
        <BreadcrumbComp items={breadcrumb} />
      </div>
      <div className="fs-56-400-lato txt-color-darkgray">
        Vital Relief Blog

      </div>
      <div className="relative flex flex-col items-center mx-auto sm:mx-0 md:flex-row gap-5 md:gap-12 md:mb-[44px]">
        <div className="flex items-center md:w-1/2">
          <div className="relative w-full rounded">
            <div className="rounded-lg bg-white text-black w-full">

              {blog?.files?.length > 0 ?

                <Image
                  src={BLOG_IMAGES_PATH + "/" + blog?.files[0]?.file}
                  className="h-[200px] md:h-[500px] w-full rounded-lg object-cover"
                  width={100}
                  height={100}
                  alt="reading one"
                /> :
                <div className="h-[200px] md:h-[500px] w-full rounded-lg "></div>
              }
            </div>
          </div>
        </div>
        <div className="flex items-center md:w-1/2 ">
          <div className="text-left flex flex-col gap-6">
            <div className="fs-32-400-lato txt-color-darkgray cursor-pointer" onClick={() => router.push('/blogs/' + blog?.slug)}>
              {blog?.title}
            </div>
            <div className="txt-color-gray700 fs-18-400-lato ">
              {blog?.description}
            </div>
            <div className="flex items-center gap-4">
              <Image
                src={userImg}
                className="w-12 h-12 rounded-full"
                alt="user icon"
              />
              <div className="flex flex-col">
                <div className="fs-14-700-lato txt-color-darkgray">
                  {blog?.authors}
                </div>
                <div className="flex items-center gap-2">
                  <span className="fs-14-400-lato txt-color-gray700">
                    {formatBlogDate(blog?.date)}
                  </span>
                  <span className="fs-14-400-lato txt-color-gray700">.</span>
                  <span className="fs-14-400-lato txt-color-gray700">
                    {calculateReadTime(blog?.details)}
                  </span>
                </div>
              </div>

            </div>

            <div className="mt-1 md:mt-3 ">
              <Link
                href={
                  "/blogs/" + blog?.slug
                }
                className="btn fs-16-500-lato text-white sec-btn py-2-5 ml-15 px-4 rounded-md w-full text-center display-block"
              >
                Continue reading

              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden border-t border-[#F2F4F7]"></div>
    </>
  );
}

export default BlogHeader;
