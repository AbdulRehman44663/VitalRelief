import Image from "next/image";
import React from "react";
import profileImg from "../../assets/models/profile-img-1.jpg";
import { IMAGES_PATH ,LISTING_IMAGES_PATH} from "@/config/constants";
import Link from "next/link";
import {GET_DIRECTION_URL} from "../../config/constants";

function TherapistProfileContact({listing}) {

  const whatsappLink = `https://api.whatsapp.com/send?phone=${listing?.listing_phone}4&text=I%20saw%20your%20ad%20on%20www.vitalrelief.com%20and%20I%20would%20be%20interested%20to%20book%20a%20massage%20with%20you.`;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-3">
        {listing?.listing_images?.length>0 ?
          <>
            <Image
              src={LISTING_IMAGES_PATH+'/'+listing?.listing_images[0]?.file }
              width={100}
              height={100}
              alt="profile"
              className="h-[200px] md:h-[350px] rounded-lg w-full object-cover"
            />
                  
          
            {listing?.listing_images?.length > 0 && 
              (listing?.subscription?.title == 'EXCLUSIVE' || listing?.subscription?.title == 'PRIME' || listing?.subscription?.title == 'STANDARD') && (
                <div className="grid grid-cols-2 gap-3">
                  {listing?.listing_images?.map((item, index) => {
                    if (!item?.file) return null;  // If there's no file, skip rendering

                    // EXCLUSIVE condition
                    if (listing?.subscription?.title === 'EXCLUSIVE' && index < 6) {
                      return (
                        <Image
                          key={index}
                          alt="profile"
                          src={LISTING_IMAGES_PATH + '/' + item.file}
                          width={100}
                          height={100}
                          className="h-[192px] md:h-[160px] rounded-lg w-full object-cover"
                        />
                      );
                    }

                    // PRIME condition
                    if (listing?.subscription?.title === 'PRIME' && index < 4) {
                      return (
                        <Image
                          key={index}
                          alt="profile"
                          src={LISTING_IMAGES_PATH + '/' + item.file}
                          width={100}
                          height={100}
                          className="h-[192px] md:h-[160px] rounded-lg w-full object-cover"
                        />
                      );
                    }

                    // STANDARD condition
                    if (listing?.subscription?.title === 'STANDARD' && index < 2) {
                      return (
                        <Image
                          key={index}
                          alt="profile"
                          src={LISTING_IMAGES_PATH + '/' + item.file}
                          width={100}
                          height={100}
                          className="h-[192px] md:h-[160px] rounded-lg w-full object-cover"
                        />
                      );
                    }

                    return null;  // Return null if none of the conditions match
                  })}
                </div>
              )
            }

          </>
          
         :
         listing?.profile_images?.length>0 ? 
          <Image
            src={IMAGES_PATH+'/'+listing?.profile_images[0]?.file }
            width={100}
            height={100}
            alt="profile"
            className="h-[200px] md:h-[350px] rounded-lg w-full object-cover"
          />
          :
          <></>
       
        }
        
       
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5 py-8 px-6 border border-[#97B2A9] rounded-lg">
          <div className="fs-24-400-lato txt-color-darkgray">
          Get to know
          </div>
          <div className="border border-[#97B2A9]"></div>
          <div className="fs-20-400-lato txt-color-gray1000 ">
            {`Don’t forget to mention`}{" "}
            <span className="txt-color-gradient"> vitalrelief </span> when you
            get in touch.
          </div>
        </div>
       
       
        <div className="flex flex-col gap-5 py-8 px-6 border border-[#97B2A9] rounded-lg">
          <div className="fs-24-400-lato txt-color-darkgray">Personal Details</div>
          <div className="border border-[#97B2A9]"></div>
          <div className="flex item-center gap-5">
            <div className="fs-18-400-lato txt-color-gray1000">Name:</div>
            <div className="fs-18-700-lato txt-color-gray700">{listing?.user?.first_name} {listing?.user?.last_name}</div>
          </div>
          {listing?.category== 'Therapists' ||  listing?.category== 'Female Therapist' || listing?.category == 'Agencies'?
            <div className="flex item-center gap-5">
              <div className="fs-18-400-lato txt-color-gray1000">Category:</div>
              <div className="fs-18-700-lato txt-color-gray700">{(listing?.category== 'Therapists' ? 'Male Therapist': listing?.category == 'Agencies'? 'Agency':'Agency')}</div>
            </div> 
          :''}
          
          <div className="flex flex-wrap item-center gap-5">
            <div className="flex item-center gap-5">
              <div className="fs-18-400-lato txt-color-gray1000">Location:</div>
              <div className="fs-18-700-lato txt-color-gray700">
                {listing?.region?.street ? listing?.region?.street:''} {listing?.region?.name}
              </div>
            </div>
            <Link href={GET_DIRECTION_URL+listing?.post_code} target="blank">
            <div className="fs-18-500-lato btn inline-flex items-center justify-center fs-15-600-lato text-white sec-btn py-1 mr-2 px-2 rounded-sm w-max-content cursor-pointer">Get Directions</div>
            </Link>
          </div>
          <div className="flex item-center gap-5">
            <div className="fs-18-400-lato txt-color-gray1000">Languages:</div>
            <div className="fs-18-700-lato txt-color-gray700">English</div>
          </div>
        </div>
        {listing?.subscription?.title == 'EXCLUSIVE' || listing?.subscription?.title == 'PRIME' || listing?.subscription?.title == 'STANDARD' ?
          <div className="flex flex-col gap-5 py-8 px-6 border border-[#97B2A9] rounded-lg">
            <div className="fs-24-400-lato txt-color-darkgray">
              Contact Information
            </div>
            <div className="border border-[#97B2A9]"></div>
            <div className="flex flex-wrap md:flex-nowrap gap-4">
              <Link href={"tel:"+listing?.listing_phone}>
                <button className="btn py-2 px-5 fs-16-700-lato txt-color-darkgray w-full bg-white br-6px  border border-[#2F464B] " >
                  CALL {listing?.listing_phone}
                </button>
              </Link>
              <Link href={whatsappLink} target="blank">
                <button className="btn sec-btn py-2 px-5 rounded-md fs-16-700-lato text-white flex justify-center gap-2 w-full">
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
              {listing?.listing_website ? 
                <Link href={listing?.listing_website}>
                <button className="btn py-2 px-5 fs-16-700-lato txt-color-darkgray w-full bg-white br-6px  border border-[#2F464B] " >
                    Website Link
                </button>
              </Link>
              :<></>}
              
            </div>
          </div>
        :<></>}
       
      </div>
    </div>
  );
}

export default TherapistProfileContact;
