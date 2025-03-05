import React, { useEffect,useState } from "react";
import BreadcrumbComp from "../Breadcrumb";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { faqs } from "@/utils/data";
import settingService from "@/services/settingService";
import Link from "next/link";

function FAQHeader() {

  const [whatsApp, setwhatsApp] = useState('/');

  const fetchDetail = async () =>{
   
   try {
   
     var data = null;
     
     data = await settingService.getSiteSetting();
     
     if(data){
      const whatsappLink = `https://api.whatsapp.com/send?phone=${data?.data?.phone}&text=Hi%20there,%20I%20have%20a%20question%20and%20could%20use%20your%20assistance,%20please`;
  
       setwhatsApp(whatsappLink);
     }
   } catch (error) {
     console.error('Error fetching settings:', error);
   } finally {
     // setLoading(false);
   }
  
 }
 
 useEffect(()=>{
  fetchDetail();
 },[])
  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "FAQS",
    },
  ];
  
  return (
    <div className="flex justify-center bg-[#FCFCFD]">
      <div className="max-w-[1440px] w-full">
        <div
          className={`py-[36px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col items-start md:items-center gap-[30px] md:gap-[40px]`}
        >
          <BreadcrumbComp items={breadcrumb} />
          <div className="flex flex-col items-start md:items-center gap-3 md:gap-6 w-full md:w-2/3 lg:w-1/2">
            <div className="fs-48-400-lato txt-color-darkgray text-left md:text-center">
              Frequently Asked Questions
            </div>
            <div className="fs-18-400-lato txt-color-gray700 text-left md:text-center">
              Frequently asked questions ordered by popularity. Remember that if
              the visitor has not committed to the call to action, they may
              still have questions (doubts) that can be answered.
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full lg:w-3/4">
          {console.log(faqs)}
            {faqs?.map((item, index) => (
              <div
                key={index}
                className="py-5 px-6 border border-[#000000] flex flex-col gap-3 rounded-md"
              >
                <Disclosure>
                  {({ open }) => (
                    <>
                      <DisclosureButton className="flex items-center justify-between gap-2 w-full hover:!transform-none hover:!shadow-none">
                        <div className="fs-18-700-lato txt-color-gray700 text-left">
                          {item?.question}
                        </div>
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M25.3346 15.667V16.3336C25.3346 16.7018 25.0362 17.0003 24.668 17.0003H17.0013V24.667C17.0013 25.0351 16.7028 25.3336 16.3346 25.3336H15.668C15.2998 25.3336 15.0013 25.0351 15.0013 24.667V17.0003H7.33464C6.96645 17.0003 6.66797 16.7018 6.66797 16.3336V15.667C6.66797 15.2988 6.96645 15.0003 7.33464 15.0003H15.0013V7.33365C15.0013 6.96546 15.2998 6.66699 15.668 6.66699H16.3346C16.7028 6.66699 17.0013 6.96546 17.0013 7.33365V15.0003H24.668C25.0362 15.0003 25.3346 15.2988 25.3346 15.667Z"
                            fill="#33443C"
                          />
                        </svg>
                      </DisclosureButton>
                      <DisclosurePanel
                        className={"fs-16-400-lato txt-color-gray700"}
                      >
                         
                          <div dangerouslySetInnerHTML={{ __html: item?.answer }} />
                      </DisclosurePanel>
                    </>
                  )}
                </Disclosure>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center md:items-center gap-6 w-full md:w-[560px]">
            <div className="flex flex-col gap-4">
              <div className="fs-32-400-lato txt-color-darkgray text-center">
                Still have questions?
              </div>
              <div className="fs-18-400-lato text-center txt-color-gray700 ">
                Support details to capture customers that might be on the fence.
              </div>
            </div>
            <Link href={whatsApp} target="blank">
            <button className="btn sec-btn py-2 px-5 rounded-md fs-16-700-lato text-white flex justify-center gap-2 w-max-content">
              WhatsApp{" "}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_66_4382)">
                  <path
                    d="M10.0013 18.3334C14.6036 18.3334 18.3346 14.6024 18.3346 10.0001C18.3346 5.39771 14.6036 1.66675 10.0013 1.66675C5.39893 1.66675 1.66797 5.39771 1.66797 10.0001C1.66797 11.1492 1.90053 12.2439 2.32115 13.2398C2.55362 13.7902 2.66985 14.0654 2.68424 14.2734C2.69864 14.4814 2.63742 14.7102 2.51499 15.1677L1.66797 18.3334L4.83361 17.4864C5.2912 17.364 5.52 17.3027 5.72799 17.3172C5.93598 17.3315 6.21118 17.4477 6.76159 17.6802C7.75751 18.1008 8.85222 18.3334 10.0013 18.3334Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.15549 10.3143L7.88127 9.41292C8.18716 9.033 8.56528 8.67934 8.59495 8.17347C8.60236 8.0457 8.51253 7.47206 8.3327 6.3248C8.26204 5.87393 7.84108 5.83325 7.47646 5.83325C7.00131 5.83325 6.76374 5.83325 6.52782 5.94101C6.22965 6.07721 5.92352 6.46018 5.85634 6.78103C5.80319 7.03489 5.84269 7.20981 5.92169 7.55966C6.25722 9.04558 7.04437 10.5131 8.26493 11.7337C9.48553 12.9543 10.953 13.7414 12.4389 14.0769C12.7888 14.1559 12.9637 14.1954 13.2176 14.1423C13.5384 14.0751 13.9214 13.769 14.0576 13.4708C14.1654 13.2348 14.1654 12.9973 14.1654 12.5222C14.1654 12.1575 14.1247 11.7366 13.6738 11.6659C12.5265 11.4861 11.9529 11.3963 11.8251 11.4037C11.3193 11.4333 10.9656 11.8114 10.5857 12.1173L9.68428 12.8431"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_66_4382">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
            </Link>
          </div>
          <div className="md:hidden border-t bg-[#F2F4F7]"></div>
        </div>
      </div>
    </div>
  );
}

export default FAQHeader;
