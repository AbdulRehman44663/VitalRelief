import React, { useState } from "react";
import TherapistProfileContact from "./TherapistProfileContact";
import TherapistProfileAbout from "./TherapistProfileAbout";
import ReviewModal from "../Modals/ReviewModal";
import LocationIcon from "../../assets/icons/location-icon-profile.svg";
import RatingIcon from "../../assets/icons/rating-star-icon-profile.svg";
import FemaleIcon from "../../assets/icons/female-icon-profile.svg";
import Image from 'next/image';
import { LISTING_IMAGES_PATH, SITE_URL } from "@/config/constants";
import Head from "next/head";
import { useRouter } from "next/router";
import { limitText } from "@/helpers/helper";

function TherapistProfileDetails({listing}) {
  const router  = useRouter();
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const currentUrl = `${SITE_URL}${router.asPath}`;
  return (
    <div className={`flex flex-col gap-[30px] md:gap-8 w-full`}>
       <Head>
          {listing?.listing_images[0]?.file   ?
            <meta property="og:image" content={LISTING_IMAGES_PATH+'/'+listing?.listing_images[0]?.file} />
          :''}
            <meta property="og:title" content={listing?.title} />
            <meta property="og:description" content= {limitText( listing?.description,150)} />
          
            <meta property="og:url" content={currentUrl} />
            <meta property="og:type" content="article" />
          
        
        </Head>
      <div className="flex items-start justify-start md:justify-between gap-10">
        <div className="flex flex-col gap-5">
          <div className="fs-40-400-lato txt-color-darkgray">
            {listing?.title}
          </div>
          <div className="flex flex-wrap">
            <div className="py-1 px-3 flex items-center gap-[10px]">
              <Image 
                src={LocationIcon}
                alt="Location Icon"  
              />
              
              <div className="fs-14-500-lato txt-color-gray1000">
              {listing?.region?.name}
              </div>
            </div>
            <div className="py-1 px-3 flex items-center gap-[10px]">
              <Image 
                src={RatingIcon}
                alt="Rating Icon"  
              />
              <div className="fs-14-500-lato txt-color-gray1000"> {listing?.reviews_avg_rating >0? listing?.reviews_avg_rating.toFixed(1):0 } ({listing?.reviews?.length})</div>
            </div>
            <div className="py-1 px-3 flex items-center gap-[10px]">
              <Image 
                src={FemaleIcon}
                alt="Rating Icon"  
              />
              <div className="fs-14-500-lato txt-color-gray1000">{listing?.category== 'Female Therapist' ? 'Female':(listing?.category== 'Male Therapist' ? 'Male': listing?.category)}</div>
            </div>
          </div>
        </div>
        <button
          className="btn primary-bg-btn text-white fs-16-700-lato py-2 px-5 hidden md:block"
          onClick={() => setOpenReviewModal(true)}
        >
          WRITE A REVIEW
        </button>
      </div>
      <div className="block sm:hidden border border-[#F2F4F7]"></div>
      <TherapistProfileContact listing={listing} />
      <TherapistProfileAbout  listing={listing} />

      {openReviewModal && (
        <ReviewModal
          isModalOpen={openReviewModal}
          handleOk={() => setOpenReviewModal(false)}
          handleCancel={() => setOpenReviewModal(false)}
        />
      )}
    </div>
  );
}

export default TherapistProfileDetails;
