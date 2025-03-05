import { Rate } from "antd";
import React, { useState } from "react";
import img1 from "../../assets/models/testimonial-icon.png";
import Image from "next/image";
import ReviewModal from "../Modals/ReviewModal";
import {IMAGES_PATH } from "../../config/constants";

function TherapistProfileReviews({listing }) {
  const [openReviewModal, setOpenReviewModal] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-5 py-8 px-6 border border-[#97B2A9] rounded-lg">
        <div className="flex items-center justify-between gap-[10px]">
          <div className="fs-24-400-lato txt-color-darkgray">Reviews</div>
          <button
            className="btn sec-outline-red-btn py-2 px-4 fs-16-700-lato txt-color-gradient"
            onClick={() => setOpenReviewModal(true)}
          >
            WRITE A REVIEW
          </button>
        </div>
        <div className="flex flex-col gap-8">

          {listing?.reviews?.length>0 ? 
            listing?.reviews?.map((item, index) => (
              <div key={index} className="flex flex-col gap-6 p-4 rounded-lg">
                <Rate value={parseInt(item?.rating?.toString())} disabled={true} className="txt-color-red" />
                <div className="fs-18-400-lato txt-color-gray600">
                  <div dangerouslySetInnerHTML={{ __html: item.message }} />
                </div>
                <div className="flex items-center gap-5">
                    {item?.user?.profile_photo ? 
                      <Image
                        height={100}
                        width={100}
                        src={IMAGES_PATH+'/'+item?.user?.profile_photo}
                        className="testimonial w-[56px] h-[57px] rounded-full overflow-hidden object-cover"
                        alt="testimonial"
                      />
                    :<></>}
                    
                    <div className="fs-16-400-lato txt-color-darkgray">
                      {item?.name ? item?.name:<>{item.user?.first_name}  {item.user?.last_name}</> }
                      
                    </div>
                </div>
              </div>
            ))
          :
          <div className="flex items-center">
            <div className="fs-16-700-lato txt-color-darkgray">No reviews found.</div>
          </div>
          }
        </div>
      </div>
      {openReviewModal && (
        <ReviewModal
          listing={listing}
          isModalOpen={openReviewModal}
          handleOk={() => setOpenReviewModal(false)}
          handleCancel={() => setOpenReviewModal(false)}
        />
      )}
    </>
  );
}

export default TherapistProfileReviews;
