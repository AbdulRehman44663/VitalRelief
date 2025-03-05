import React,{useState } from "react";
import BreadcrumbComp from "../Breadcrumb";
import blogUserIcon from "../../assets/models/blog-user-icon.png";
import blogImg from "../../assets/models/blog-detail-1.jpg";
import Link from "next/link";
import Image from "next/image";
import { calculateReadTime, formatBlogDate, limitText } from "@/helpers/helper";
import {BLOG_IMAGES_PATH,SITE_URL } from "../../config/constants";
import { useRouter } from "next/router";
import Head from "next/head";

function BlogDetailHeader({blog}) {
  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Blog",
      href: "/blogs",
    },
    {
      title:blog?.title ,
    },
  ];
  const router = useRouter();
  const currentUrl = `${SITE_URL}${router.asPath}`; // Get the current page URL
  const [copied, setCopied] = useState(false);
  const encodeUrl = encodeURIComponent(currentUrl); // URL encode the current URL
  const encodeTitle = encodeURIComponent("Check out this amazing blog post!"); // Title for sharing

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl); // Copy to clipboard
      setCopied(true); // Set copied state to true
      setTimeout(() => {
        setCopied(false); // Reset the copied state after 2 seconds
      }, 2000);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <div className="flex justify-center bg-[#fcfcfd]">
      <div className="max-w-[1440px] w-full">
        <div
          className={`md:mt-0 pt-[36px] pb-[32px] px-[24px] md:pt-[56px] md:px-[64px] flex flex-col items-start md:items-center gap-[30px] md:gap-[40px]`}
        >
          <Head>
            {blog?.files[0]?.file   ?
              <meta property="og:image" content={BLOG_IMAGES_PATH +"/"+ blog?.files[0]?.file} />
            :''}
              <meta property="og:title" content={blog?.title} />
              <meta property="og:description" content= {limitText( blog?.description,150)} />
           
              <meta property="og:url" content={currentUrl} />
              <meta property="og:type" content="article" />
           
          
          </Head>
          <BreadcrumbComp items={breadcrumb}  />
          <div className="flex flex-col items-start md:items-center gap-10 md:gap-10">
            <div className="w-full md:w-1/2 flex flex-col gap-12">
              <div className="m-24-400 fs-48-400-lato txt-color-darkgray lh-57">
               {blog?.title}
              </div>
              <div className="flex justify-between flex-col md:flex-row items-start md:items-center gap-5">
                <div className="flex items-center gap-4">
               
                  <Image
                    src={blogUserIcon}
                    className="rounded-full h-12 w-12"
                    alt="blog user"
                  />
                  <div className="flex flex-col">
                    <div className="fs-14-700-lato txt-color-darkgray">
                      {blog?.authors}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="fs-14-400-lato txt-color-gray700">
                       {formatBlogDate(blog?.date)}
                      </span>
                      <span className="fs-14-400-lato txt-color-gray700">
                        .
                      </span>
                      <span className="fs-14-400-lato txt-color-gray700">
                        {calculateReadTime(blog?.details)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto justify-end md:justify-start">
                  <div  onClick={handleCopyClick} className="cursor-pointer p-1 rounded-full bg-[#618B8A] relative">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M20.9999 7.66008V8.00008C21.0007 9.06616 20.576 10.0885 19.8199 10.84L16.9999 13.67C16.4738 14.1911 15.6261 14.1911 15.1 13.67L15 13.56C14.8094 13.3656 14.8094 13.0544 15 12.86L18.4399 9.42006C18.807 9.03938 19.0083 8.52883 18.9999 8.00008V7.66008C19.0003 7.12705 18.788 6.61589 18.4099 6.2401L17.7599 5.59011C17.3841 5.21207 16.873 4.99969 16.3399 5.00011H15.9999C15.4669 4.99969 14.9558 5.21207 14.58 5.59011L11.14 9.00007C10.9456 9.19064 10.6344 9.19064 10.44 9.00007L10.33 8.89007C9.8089 8.36394 9.8089 7.51623 10.33 6.99009L13.16 4.15012C13.9165 3.40505 14.9382 2.99133 15.9999 3.00014H16.3399C17.4011 2.9993 18.4191 3.42018 19.1699 4.17012L19.8299 4.83012C20.5798 5.5809 21.0007 6.59891 20.9999 7.66008ZM8.64993 13.94L13.9399 8.65008C14.0338 8.55543 14.1616 8.50218 14.2949 8.50218C14.4282 8.50218 14.556 8.55543 14.6499 8.65008L15.3499 9.35007C15.4445 9.44395 15.4978 9.57175 15.4978 9.70507C15.4978 9.83839 15.4445 9.96618 15.3499 10.0601L10.0599 15.35C9.96604 15.4447 9.83824 15.4979 9.70492 15.4979C9.57161 15.4979 9.44381 15.4447 9.34993 15.35L8.64993 14.65C8.55528 14.5561 8.50204 14.4283 8.50204 14.295C8.50204 14.1617 8.55528 14.0339 8.64993 13.94ZM13.5599 15C13.3655 14.8094 13.0543 14.8094 12.8599 15L9.42993 18.41C9.0517 18.7905 8.53645 19.003 7.99995 18.9999H7.65995C7.12691 19.0004 6.61576 18.788 6.23997 18.41L5.58997 17.76C5.21194 17.3842 4.99956 16.873 4.99998 16.34V16C4.99956 15.4669 5.21194 14.9558 5.58997 14.58L9.00993 11.14C9.2005 10.9456 9.2005 10.6345 9.00993 10.44L8.89993 10.33C8.3738 9.80894 7.52609 9.80894 6.99996 10.33L4.17999 13.16C3.42392 13.9116 2.99916 14.9339 3 16V16.35C3.00182 17.4077 3.42249 18.4216 4.16999 19.1699L4.82998 19.8299C5.58076 20.5799 6.59878 21.0008 7.65995 20.9999H7.99995C9.05338 21.0061 10.0667 20.5964 10.8199 19.8599L13.6699 17.01C14.191 16.4838 14.191 15.6361 13.6699 15.11L13.5599 15Z"
                        fill="white"
                      />
                    </svg>
                    {copied && (
                      <div
                        className="absolute top-[-10px] left-[25px] p-2 bg-white fs-17-700-lato txt-color-red text-sm rounded"
                        style={{ transition: "opacity 0.3s ease-in-out" }}
                      >
                        Link copied!
                      </div>
                    )}
                  </div>
                  <Link target="_blank" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeUrl}`}  className="p-1 rounded-full bg-[#618B8A]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3ZM8 18C8.27614 18 8.5 17.7761 8.5 17.5V10.5C8.5 10.2239 8.27614 10 8 10H6.5C6.22386 10 6 10.2239 6 10.5V17.5C6 17.7761 6.22386 18 6.5 18H8ZM7.25 9C6.42157 9 5.75 8.32843 5.75 7.5C5.75 6.67157 6.42157 6 7.25 6C8.07843 6 8.75 6.67157 8.75 7.5C8.75 8.32843 8.07843 9 7.25 9ZM17.5 18C17.7761 18 18 17.7761 18 17.5V12.9C18.0325 11.3108 16.8576 9.95452 15.28 9.76C14.177 9.65925 13.1083 10.1744 12.5 11.1V10.5C12.5 10.2239 12.2761 10 12 10H10.5C10.2239 10 10 10.2239 10 10.5V17.5C10 17.7761 10.2239 18 10.5 18H12C12.2761 18 12.5 17.7761 12.5 17.5V13.75C12.5 12.9216 13.1716 12.25 14 12.25C14.8284 12.25 15.5 12.9216 15.5 13.75V17.5C15.5 17.7761 15.7239 18 16 18H17.5Z"
                        fill="white"
                      />
                    </svg>
                  </Link>
                  <Link  target="_blank"  href={`https://twitter.com/intent/tweet?url=${encodeUrl}&text=${encodeTitle}`}  className="p-1 rounded-full bg-[#618B8A]">
                    <svg width="24" height="24" viewBox="0 0 522 522" fill="white" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="0"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
   
                  </Link>
                  <Link  target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeUrl}`}  className="p-1 rounded-full bg-[#618B8A]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 6H13.5C12.9477 6 12.5 6.44772 12.5 7V10H16.5C16.6137 9.99748 16.7216 10.0504 16.7892 10.1419C16.8568 10.2334 16.8758 10.352 16.84 10.46L16.1 12.66C16.0318 12.8619 15.8431 12.9984 15.63 13H12.5V20.5C12.5 20.7761 12.2761 21 12 21H9.5C9.22386 21 9 20.7761 9 20.5V13H7.5C7.22386 13 7 12.7761 7 12.5V10.5C7 10.2239 7.22386 10 7.5 10H9V7C9 4.79086 10.7909 3 13 3H16.5C16.7761 3 17 3.22386 17 3.5V5.5C17 5.77614 16.7761 6 16.5 6Z"
                        fill="white"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
             {blog?.files?.length>0 ? 
                                                              
              <Image
                src={BLOG_IMAGES_PATH +"/"+ blog?.files[0]?.file}
                className="rounded-lg w-full h-[200px] md:h-[600px] object-cover"
                width={100}
                height={100}
                alt={blog?.title + " image"}
              /> :
              <div className="rounded-lg w-full h-[200px] md:h-[600px] "></div>
              }
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogDetailHeader;
