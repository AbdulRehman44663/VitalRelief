import Image from "next/image";
import React , { useState,useEffect } from "react";

import Link from "next/link";

import footerLogo from "../../assets/images/m-massage-logo.png";


function Footer() {
  const currentYear = new Date().getFullYear();
  const [hasClass, setHasClass] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setHasClass(false);
      }else{
        
        setHasClass(true);
      }
    };

    // Set initial items per page
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex justify-center bg-white border-t-2 border-[#97B2A9] md:border-[#EAECF0]">
      <div className="max-w-[1440px] w-full">
        <div className="py-[16px] px-[24px] md:py-10 md:px-[64px] gap-5 md:gap-10">
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 md:gap-16 mb-5 md:mb-16">
            <div className="p-1 flex flex-col items-center md:items-start gap-6">
              <Link href={"/"}>
                <Image src={footerLogo} alt="VitalRelief" className="w-[154px] md:w-[154px] h-[65px] " />
              </Link>
              <Link href={"/account/listing/draft"}>
              <button className="btn text-white sec-btn py-3 px-4 flex items-center justify-center w-full md:w-[158px]">
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4.78906V20.7891"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 12.7891H20"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="fs-16-700-lato text-white">CREATE AD</div>
              </button>
              </Link>
            </div>
            <div className="flex flex-wrap md:gap-5">
              <div className=" text-center md:text-left flex flex-col gap-3 min-w-[50%] md:min-w-[201px] lg:min-w-[160px] xxl:min-w-[240px] ">
                <div className="fs-16-700-lato txt-color-red text-center md:text-left ">QUICK MENU</div>
                <div className="flex flex-col">
                  <Link
                    href={"/"}
                    className="py-2 fs-14-400-lato txt-color-gray700"
                  >
                    Home
                  </Link>
                
                  <Link
                    href={"/listings/therapists"}
                    className="py-2 fs-14-400-lato txt-color-gray700"
                  >
                    Male Therapists
                  </Link>
                  <Link
                    href={"/treatments"}
                    className="py-2 fs-14-400-lato txt-color-gray700"
                  >
                    Treatments
                  </Link>
                  {/* <Link
                    href={"/agencies"}
                    className="py-2 fs-14-400-lato txt-color-gray700"
                  >
                    Agencies
                  </Link> */}
                
                </div>
              </div>
              <div className="flex flex-col gap-3 min-w-[50%] md:min-w-[201px] lg:min-w-[160px] xxl:min-w-[240px] text-center md:text-left">
                <div className="fs-16-700-lato txt-color-red">USEFUL LINKS</div>
                <div className="flex flex-col">
                  <Link
                    href={"/blogs"}
                    className="py-2 fs-14-400-lato txt-color-gray700"
                  >
                    Blog
                  </Link>
                  <Link
                    href={"/faqs"}
                    className="py-2 fs-14-400-lato txt-color-gray700"
                  >
                    FAQs
                  </Link>
                  <Link
                    href={"/contact"}
                    className="py-2 fs-14-400-lato txt-color-gray700"
                  >
                    Contact
                  </Link>
                  {/* <Link
                    href={"/treatments"}
                    className="py-2 fs-14-400-lato txt-color-gray700"
                  >
                    Treatments
                  </Link>
                  */}
                </div>
              </div>
              <div className="flex text-center mt-3 md:mt-0 md:text-left  flex-col gap-4 min-w-full md:min-w-[201px] lg:min-w-[160px] xxl:min-w-[240px] flex flex-col gap-3 min-w-[50%] md:min-w-[201px] lg:min-w-[170px] xxl:min-w-[240px] text-center md:text-left">
                <div className="fs-16-700-lato txt-color-red">LET&apos;S CONNECT ON SOCIAL MEDIA</div>
                <div className="flex flex-col  items-center md:items-start">
                  {/* <a
                    href="https://facebook.com"
                    target="_blank"
                    className="py-2 flex items-center gap-3"
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.84848 11.1224C5.87072 11.1224 5.66666 11.3143 5.66666 12.2335V13.9002C5.66666 14.8195 5.87072 15.0113 6.84848 15.0113H9.21211V21.678C9.21211 22.5972 9.41617 22.7891 10.3939 22.7891H12.7576C13.7354 22.7891 13.9394 22.5972 13.9394 21.678V15.0113H16.5934C17.335 15.0113 17.5261 14.8758 17.7298 14.2055L18.2363 12.5388C18.5852 11.3905 18.3702 11.1224 17.0999 11.1224H13.9394V8.34462C13.9394 7.73097 14.4685 7.2335 15.1212 7.2335H18.4849C19.4626 7.2335 19.6667 7.04165 19.6667 6.12239V3.90017C19.6667 2.98091 19.4626 2.78906 18.4849 2.78906H15.1212C11.8577 2.78906 9.21211 5.27637 9.21211 8.34462V11.1224H6.84848Z"
                        stroke="#5B8581"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="fs-14-400-lato txt-color-gray700">
                      Facebook
                    </div>
                  </a> */}
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    className="py-2 flex items-center md:gap-3"
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.16666 12.7891C3.16666 8.31072 3.16666 6.07155 4.5579 4.6803C5.94915 3.28906 8.18832 3.28906 12.6667 3.28906C17.145 3.28906 19.3842 3.28906 20.7755 4.6803C22.1667 6.07155 22.1667 8.31072 22.1667 12.7891C22.1667 17.2674 22.1667 19.5066 20.7755 20.8979C19.3842 22.2891 17.145 22.2891 12.6667 22.2891C8.18832 22.2891 5.94915 22.2891 4.5579 20.8979C3.16666 19.5066 3.16666 17.2674 3.16666 12.7891Z"
                        stroke="#5B8581"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.1667 12.7891C17.1667 15.2744 15.152 17.2891 12.6667 17.2891C10.1814 17.2891 8.16666 15.2744 8.16666 12.7891C8.16666 10.3038 10.1814 8.28906 12.6667 8.28906C15.152 8.28906 17.1667 10.3038 17.1667 12.7891Z"
                        stroke="#5B8581"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M18.1745 7.28906H18.1655"
                        stroke="#5B8581"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="fs-14-400-lato txt-color-gray700 hidden md:block lg:block">
                      Instagram
                    </div>
                  </a>
                  {/* <a
                    href="https://twitter.com"
                    target="_blank"
                    className="py-2 flex items-center gap-3"
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.66666 21.7891L11.2151 14.2407M11.2151 14.2407L3.66666 3.78906H8.66666L14.1183 11.3375M11.2151 14.2407L16.6667 21.7891H21.6667L14.1183 11.3375M21.6667 3.78906L14.1183 11.3375"
                        stroke="#5B8581"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="fs-14-400-lato txt-color-black">
                      Twitter
                    </div>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    className="py-2 flex items-center gap-3"
                  >
                    <svg
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.16666 10.2891H4.66666C3.72385 10.2891 3.25245 10.2891 2.95955 10.582C2.66666 10.8749 2.66666 11.3463 2.66666 12.2891V20.7891C2.66666 21.7319 2.66666 22.2033 2.95955 22.4962C3.25245 22.7891 3.72385 22.7891 4.66666 22.7891H5.16666C6.10947 22.7891 6.58087 22.7891 6.87377 22.4962C7.16666 22.2033 7.16666 21.7319 7.16666 20.7891V12.2891C7.16666 11.3463 7.16666 10.8749 6.87377 10.582C6.58087 10.2891 6.10947 10.2891 5.16666 10.2891Z"
                        stroke="#5B8581"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M7.16666 5.03906C7.16666 6.2817 6.1593 7.28906 4.91666 7.28906C3.67402 7.28906 2.66666 6.2817 2.66666 5.03906C2.66666 3.79642 3.67402 2.78906 4.91666 2.78906C6.1593 2.78906 7.16666 3.79642 7.16666 5.03906Z"
                        stroke="#5B8581"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M12.9927 10.2891H12.1667C11.2239 10.2891 10.7525 10.2891 10.4595 10.582C10.1667 10.8749 10.1667 11.3463 10.1667 12.2891V20.7891C10.1667 21.7319 10.1667 22.2033 10.4595 22.4962C10.7525 22.7891 11.2239 22.7891 12.1667 22.7891H12.6667C13.6095 22.7891 14.0809 22.7891 14.3738 22.4962C14.6667 22.2033 14.6667 21.7319 14.6667 20.7891L14.6668 17.2892C14.6668 15.6324 15.1948 14.2892 16.7546 14.2892C17.5344 14.2892 18.1667 14.9608 18.1667 15.7892V20.2892C18.1667 21.232 18.1667 21.7034 18.4596 21.9963C18.7524 22.2892 19.2239 22.2892 20.1667 22.2892H20.6654C21.608 22.2892 22.0793 22.2892 22.3722 21.9964C22.6651 21.7036 22.6652 21.2323 22.6654 20.2897L22.6668 14.7893C22.6668 12.3041 20.3031 10.2893 17.9635 10.2893C16.6316 10.2893 15.4434 10.9422 14.6668 11.9631C14.6667 11.333 14.6667 11.018 14.5299 10.7841C14.4432 10.6359 14.3198 10.5126 14.1717 10.4259C13.9378 10.2891 13.6228 10.2891 12.9927 10.2891Z"
                        stroke="#5B8581"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="fs-14-400-lato txt-color-black">
                      LinkedIn
                    </div>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
          {
            !hasClass ? (
              <>
              <div className="border-t border-[#565656] pt-6  text-center md:text-left ">
                <div className="fs-14-400-lato txt-color-gray700">
                  © {currentYear} vitalrelief. All rights reserved.
                </div>
                <div className="flex items-center justify-center pt-3  flex-wrap gap-6">
                  <Link
                    href={"/privacy-policy"}
                    className="fs-14-400-lato txt-color-red decoration-solid underline underline-offset-1"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href={"/terms-and-conditions"}
                    className="fs-14-400-lato txt-color-red decoration-solid underline underline-offset-1"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href={"cookie-policy"}
                    className="fs-14-400-lato txt-color-red decoration-solid underline underline-offset-1"
                  >
                    Cookies Settings
                  </Link>
                </div>
                <div className="flex items-center justify-center pt-3  fs-14-400-lato txt-color-gray700 ">
                  Powered By <a className="ml-1" href="https://voxartmedia.com" target="_blank">Voxart Media</a>
                </div>
              </div>
              </>
            ):(
              <>
                <div className="border-t border-[#565656] pt-8 flex items-center justify-between flex-wrap gap-8 md:gap-0 ">
                  <div className="fs-14-400-lato txt-color-gray700">
                    © {currentYear} vitalrelief. All rights reserved.
                  </div>
                  <div className="flex items-center justify-center pt-3  fs-14-400-lato txt-color-gray700 ">
                    Powered By <a className="ml-1" href="https://voxartmedia.com" target="_blank">Voxart Media</a>
                  </div>
                  <div className="flex items-center  flex-wrap gap-6">
                    <Link
                        href={"/privacy-policy"}
                      className="fs-14-400-lato txt-color-red decoration-solid underline underline-offset-1"
                    >
                      Privacy Policy
                    </Link>
                    <Link
                      href={"/terms-and-conditions"}
                      className="fs-14-400-lato txt-color-red decoration-solid underline underline-offset-1"
                    >
                      Terms of Service
                    </Link>
                    <Link
                      href={"/cookie-policy"}
                      className="fs-14-400-lato txt-color-red decoration-solid underline underline-offset-1"
                    >
                      Cookies Settings
                    </Link>
                  </div>
               
                </div>
              </>
            )
          }
       
        </div>
      </div>
    </div>
  );
}

export default Footer;
