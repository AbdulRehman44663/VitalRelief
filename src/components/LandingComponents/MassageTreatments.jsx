import React, { useState,useRef,useEffect} from "react";
import readingOne from "../../assets/models/treatment-1.png";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from "next/router";
import {treatments} from "../../utils/data";
import {stripHtmlTags,limitText} from "../../helpers/helper";

function MassageTreatments() {
  const swiperRef = useRef(null);
  const [carouselItems, setCarouselItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const router = useRouter();
  // Click handler for the back button
  const handleBack = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
    swiperRef.current.swiper.slidePrev();
  };

  const fetchTreatments =() =>{
    let i =0;
    let items = [];
    console.log(treatments)
    treatments.map((item)=>{
      if(item.id && i<6){
        items.push(item);
        i++;
      }
    })
    setCarouselItems(treatments)
  }

  useEffect(()=>{
    fetchTreatments();
  },[])

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

  return (
    <div className="flex justify-center bg-[#FCFCFD]">
      <div className="max-w-[1440px] w-full">
        <div
          className={`py-[16px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col gap-10`}
        >
          <div className="w-full flex flex-col gap-3 md:gap-6">
            <div className="fs-48-400-lato lh-57 txt-color-red text-left md:text-center">
              Massage Treatments
            </div>
            <div className="fs-24-700-lato txt-color-gray700 text-left md:text-center">
              How to Choose the Right Type of Massage?
            </div>
            <div className="flex justify-center">
              <div className="fs-18-400-lato lh-27 txt-color-gray700 text-left md:text-center w-full md:w-3/4 lg:w-[60%]">
                {`Not all types of massage are created alike. And, depending on the reason you want a massage, there are some massage therapies that are better than others for you. Once you know what you are looking for from a massage, it's easy to pick a type. We assure you that you will easily find perfect massage in London at Vital Relief. All our London Massage Therapists and Massage Venues are very passionate about massage. We offer a wide variety of massage treatments in London.`}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="hidden md:block ">
              <div className="carousel-container " >
                <Swiper
                  ref={swiperRef}
                  spaceBetween={20} // Space between slides
                  slidesPerView={3} // Number of slides to show
                  className="py-1"
                >
                  {carouselItems.map((item, index) => (
                    <SwiperSlide key={index} className="carousel-item ">
                      <div
                        key={index}
                        className="bg-white rounded-lg flex flex-col gap-6 hover:shadow-[0px_20px_40px_0px_#0000001A] border-2 border-[#EAECF0] hover:border-0"
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
                            <div className="h-auto  fs-24-700-lato txt-color-gray">{item.title}</div>
                            <div className="fs-16-400-lato txt-color-gray600">
                            {limitText(stripHtmlTags(item.description),100)}
                            </div>
                          </div>

                          <button className="btn flex items-center py-3 gap-2 hover:shadow-none" onClick={()=> router.push('/massage/'+item.slug)}>
                            <div className="fs-16-400-lato txt-color-gray800">
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
                                  stroke="#344054"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M15 16.79L19 12.79"
                                  stroke="#344054"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M15 8.79004L19 12.79"
                                  stroke="#344054"
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
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              
            </div>
            {/* In Mobile scenario  */}
            <div className="flex flex-col gap-4 md:hidden">
              <div className="carousel-container " >
                <Swiper
                  ref={swiperRef}
                  spaceBetween={20} // Space between slides
                  slidesPerView={itemsPerPage} // Number of slides to show
                  className="py-1"
                >
                  {carouselItems
                    ?.map((item, index) => (
                      <SwiperSlide key={index} className="carousel-item ">
                         <div
                            key={index}
                            className="bg-white rounded-lg flex flex-col gap-6 hover:shadow-[0px_20px_40px_0px_#0000001A] border-2 border-[#EAECF0] hover:border-0"
                          >
                          {item.image ? 
                            <Image
                              src={"treatments/"+item.image}
                              width={100}
                              height={100}
                              className="rounded-t-lg h-[200px] w-full object-cover"
                              alt="reading one"
                            />
                          :
                            <div className="rounded-t-lg min-h-[200px] h-[200px] w-full">
                            </div>
                          }
                          <div className="flex flex-col gap-2 md:gap-6 px-3 md:px-6 mb-3 md:mb-6">
                            <div className="flex flex-col gap-2">
                              <div className="h-auto fs-24-700-lato txt-color-gray">{item.title}</div>
                              <div className="fs-16-400-lato txt-color-gray600">
                              {limitText(stripHtmlTags(item.description),100)}
                              </div>
                            </div>
                            <Link
                              href={"/blogs"}
                              className="btn flex items-center py-3 gap-2 "
                            >
                              <div className="fs-16-400-lato txt-color-gray800">
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
                                    stroke="#344054"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M15 16.79L19 12.79"
                                    stroke="#344054"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M15 8.79004L19 12.79"
                                    stroke="#344054"
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
                            </Link>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
               
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap md:no-wrap gap-2" >
                  {Array.from(
                    { length: Math.ceil(carouselItems.length / itemsPerPage) },
                    (_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 cursor-pointer  ${
                          Math.floor(startIndex / itemsPerPage) == index
                            ? "testimonial_active_dot"
                            : "bg-[#EAECF0]"
                        } rounded-full`}
                        onClick={() => 
                          {
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
                    disabled={
                      startIndex >= carouselItems?.length - itemsPerPage
                    }
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
            <div className="flex justify-center pt-4">
              <button className="btn sec-outline-btn py-3 px-6 fs-16-700-lato txt-color-gray700 w-full md:w-auto" onClick={()=> router.push('/treatments')}>
                SEE MORE TREATMENTS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MassageTreatments;
