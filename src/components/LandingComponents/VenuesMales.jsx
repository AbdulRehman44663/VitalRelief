import React, { useEffect, useState, useRef } from "react";
import venue1 from "../../assets/models/venue-1.png";
import venue2 from "../../assets/models/venue-2.png";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { IMAGES_PATH } from "@/config/constants";
import listingService from '../../services/listingService';
function MassageVenuesMales() {
  const swiperRef = useRef(null);
  const [carouselItems, setCarouselItems] = useState([1, 2, 3, 4, 5, 6]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const [loading, setLoading] = useState(true);
  // Click handler for the back button
  const handleBack = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
    swiperRef.current.swiper.slidePrev();
  };

  // Click handler for the forward button
  const handleForward = () => {
    setStartIndex((prevIndex) =>
      Math.min(
        prevIndex + itemsPerPage,
        (carouselItems?.length - 1) * itemsPerPage
      )
    );
    swiperRef.current.swiper.slideNext();
  };

  const fetchListings = async () => {
    try {

      var data = null;
      var filter = { status: 'Active', category: 'Therapists' }

      data = await listingService.list(filter);

      if (data) {
        setCarouselItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setItemsPerPage(2); // Show 2 items for large screens
      } else {
        setItemsPerPage(1); // Show 1 item for mobile
      }
    };

    // Set initial items per page
    handleResize();

    fetchListings();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div
      className={`py-[32px] px-[24px] md:py-[112px] md:px-[64px] flex flex-col gap-[60px] md:gap-[80px] bg-[#FCFCFD]`}
    >
      <div className="w-full flex flex-col gap-3 md:gap-6">
        <div className="flex justify-center">
          <div className="fs-40-400-lato txt-color-red text-left text-center w-full md:w-3/5">
            All Male Massage Therapists
          </div>
        </div>
        <div className="fs-18-400-lato lh-27 txt-color-gray700 text-left text-center">
          All Male Massage Therapists in
          London, UK & Near You

        </div>
      </div>
      <div className="carousel-container " >
        <Swiper
          ref={swiperRef}
          spaceBetween={20} // Space between slides
          slidesPerView={itemsPerPage} // Number of slides to show
        >
          {carouselItems
            ?.map((item, index) => (

              <SwiperSlide key={index} className="carousel-item ">
                {item.profile_image && item.profile_image.length > 0 ?
                  <div key={index} className="rounded-xl relative overflow-hidden  max-h-[362px]">
                    <Image
                      className="size-full max-h-[362px]  min-h-[362px] object-cover  rounded-md"
                      src={IMAGES_PATH + '/' + item?.profile_image[0]?.file}
                      width={100}
                      height={100}
                      alt={item.title + (item.region ? ' in ' + item.region?.name : '')}
                    />
                    <div
                      className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"
                    ></div>
                    <div className="absolute top-0 fs-24-400-qualo text-white py-4 px-2 md:px-10">
                      {item.title + (item.region ? ' in ' + item.region?.name : '')}
                    </div>
                  </div>
                  : <></>}

              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {Array.from(
            { length: Math.ceil(carouselItems.length / itemsPerPage) },
            (_, index) => (
              <div
                key={index}
                className={`w-2 h-2 cursor-pointer ${Math.floor(startIndex / itemsPerPage) == index
                    ? "testimonial_active_dot"
                    : "bg-[#EAECF0]"
                  } rounded-full`}
                onClick={() => {
                  swiperRef.current.swiper.slideTo(index)
                  setStartIndex(index * itemsPerPage)
                }
                }
              ></div>
            )
          )}
        </div>
        <div className="flex items-center gap-[15px]">
          <button
            className="btn flex items-center justify-center border border-[#78B6B6] w-10 h-10 rounded-full"
            onClick={() => handleBack()}
            disabled={startIndex === 0}
          >
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 5.79004H17M1 5.79004C1 4.38964 4.9886 1.7731 6 0.790039M1 5.79004C1 7.19044 4.9886 9.80704 6 10.79"
                stroke="#5B8581"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_63_3771"
                  x1="16.5932"
                  y1="5.79004"
                  x2="1"
                  y2="5.79004"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ce2029" />
                  <stop offset="1" stopColor="#C2A891" />
                </linearGradient>
              </defs>
            </svg>
          </button>
          <button
            className="btn flex items-center justify-center border border-[#78B6B6] w-10 h-10 rounded-full"
            onClick={() => handleForward()}
            disabled={startIndex >= carouselItems?.length - itemsPerPage}
          >
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 5.79004H1M17 5.79004C17 4.38964 13.0114 1.7731 12 0.790039M17 5.79004C17 7.19044 13.0114 9.80704 12 10.79"
                stroke="#5B8581"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_63_3774"
                  x1="1.40678"
                  y1="5.79004"
                  x2="17"
                  y2="5.79004"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#ce2029" />
                  <stop offset="1" stopColor="#C2A891" />
                </linearGradient>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MassageVenuesMales;
