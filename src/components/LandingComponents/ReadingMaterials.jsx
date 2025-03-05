import React, { useEffect, useState, useRef } from "react";
import readingOne from "../../assets/models/reading-1.png";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import blogsService from '../../services/blogsService';
import { BLOG_IMAGES_PATH } from "@/config/constants";
import { limitText } from "@/helpers/helper";
import { useRouter } from "next/router";

function ReadingMaterials() {
  const swiperRef = useRef(null);
  const [carouselItems, setCarouselItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
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


  const fetchBlogs = async (filter) => {
    try {

      var data = null;
      var filter = { status: 'Active', limit: 10 }

      data = await blogsService.list(filter);

      if (data) {
        setCarouselItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {


    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setItemsPerPage(3); // Show 3 items for large screens
      } else {
        setItemsPerPage(1); // Show 1 item for mobile
      }
    };

    fetchBlogs();
    // Set initial items per page
    handleResize();

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center bg-[#FCFCFD]">
      <div className="max-w-[1440px] w-full">
        <div
          className={`py-[16px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col gap-[30px] md:gap-10`}
        >
          <div className="w-full flex flex-col gap-3 md:gap-6">
            <div className="fs-48-400-lato lh-57 txt-color-red text-left md:text-center">
              Massage & Wellness Insights
            </div>
            <div className="flex justify-center">
              <div className="fs-18-400-lato lh-27 txt-color-gray700 text-left md:text-center w-full md:w-1/2">
                {`Massage treatments vary, and choosing the right one
depends on your needs. Whether you're looking for
deep relaxation, stress relief, or muscle recovery,
certain techniques will work better for you than
others. Once you know what you want, finding the
perfect massage becomes effortless. At Male Massage
UK, we make it easy to connect with skilled and
passionate massage therapists across the UK. With a
wide range of professional treatments available, your
ideal massage experience is just a booking away`}
              </div>
            </div>
            {/* <div className="fs-18-400-lato lh-27 txt-color-gray700 text-left md:text-center">
            
            </div> */}
          </div>
          <div className="flex flex-col gap-4">
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

                        className="bg-transparent rounded-lg p-0 flex flex-col gap-6"
                      >
                        {item?.files?.length > 0 ?

                          <Image
                            src={BLOG_IMAGES_PATH + "/" + item?.files[0]?.file}
                            className="rounded-lg h-[250px] w-full"
                            width={100}
                            height={100}
                            alt="reading one"
                          /> :
                          <div className="rounded-lg min-h-[250px] w-full"></div>
                        }
                        <div className="flex flex-col gap-2 md:min-h-[158px] md:max-h-[158px]">
                          <div className="h-auto   fs-24-700-lato txt-color-gray overflow-hidden">{item?.title}</div>
                          <div className="fs-16-400-lato txt-color-gray600">
                            {limitText(item?.description, 150)}
                          </div>
                        </div>
                        <button className="btn flex items-center justify-between sec-outline-2-btn py-3 px-6 !bg-[#FCFCFD] border !border-[#EAECF0]">
                          <div className="fs-16-400-lato txt-color-gray800">
                            Continue Reading
                          </div>
                          <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_262_994)">
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
                              <clipPath id="clip0_262_994">
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
            <div className="flex justify-center pt-4" >
              <button className="btn sec-outline-btn py-3 px-6 fs-16-700-lato txt-color-gray700 w-full md:w-auto" onClick={() => router.push('/blogs')}>
                SEE ALL BLOGS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadingMaterials;
