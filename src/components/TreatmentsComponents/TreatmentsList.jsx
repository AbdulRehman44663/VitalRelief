import React, { useState } from "react";
import readingOne from "../../assets/models/treatment-1.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { treatments } from "@/utils/data";
import { limitText,stripHtmlTags } from "@/helpers/helper";

function TreatmentsList() {
  const router = useRouter();
  const eliteItems = treatments;
  return (
    <div className="flex justify-center bg-[#FCFCFD]">
      <div className="max-w-[1440px] w-full">
        <div
          className={`py-[16px] md:pt-0 md:pb-[56px] px-[24px] md:px-[64px] flex flex-col gap-[30px] md:gap-[32px]`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-0 md:gap-x-12 gap-y-10 md:gap-y-[32px] mb-10 md:mb-0">
            {eliteItems?.map((item, index) => (
              item.visible? 
              <div
                key={index}
                className="bg-white rounded-lg flex flex-col gap-6 hover:shadow-[0px_20px_40px_0px_#0000001A] border-2 border-[#97B2A9] hover:border-0"
              >
                {item.image ? 
                  <Image
                    src={"treatments/"+item.image}
                    className="rounded-t-lg h-[200px] w-full object-cover"
                    width={100}
                    height={100}
                    alt="reading one"
                  />
                :
                  <div className="rounded-t-lg min-h-[200px] h-[200px] w-full">
                  </div>
                }
                <div className="flex flex-col gap-2 md:gap-6 px-3 md:px-6 mb-3 md:mb-6">
                  <div className="flex flex-col gap-2">
                    <div className="fs-24-700-lato txt-color-darkgray line-clamp-1 truncate !whitespace-normal">{item.title}</div>
                    <div className="fs-16-400-lato txt-color-gray600 line-clamp-3 truncate !whitespace-normal">
                     {limitText(stripHtmlTags(item.description),150)}
                    </div>
                  </div>
                  <button
                    className="btn flex items-center py-3 gap-2 rounded-lg hover:px-3"
                    onClick={() => router.push("/massage/"+item.slug)}
                  >
                    <div className="fs-16-400-lato txt-color-gray700">
                      Read more 
                    </div>
                    <svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_63_3936)">
                        <path
                          d="M5 12.79H19"
                          stroke="#2F464B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 16.79L19 12.79"
                          stroke="#2F464B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 8.79004L19 12.79"
                          stroke="#2F464B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_63_3936">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0 0.790039)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
              :<></>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TreatmentsList;
