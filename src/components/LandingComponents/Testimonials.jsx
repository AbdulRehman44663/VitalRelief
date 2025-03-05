import Image from "next/image";
import React, { useEffect, useState ,useRef} from "react";
import testimonialIcon from "../../assets/models/testimonial-icon.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import reviewsService from '../../services/reviewsService';
import { IMAGES_PATH } from "@/config/constants";
import { Rate } from "antd";
import { limitText } from "@/helpers/helper";

function TestimonialSection() {

  const swiperRef = useRef(null);
  const [carouselItems, setCarouselItems] = useState([1, 2, 3, 4, 5, 6,7,8,9,10]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
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

  
  const fetchReviews = async (filter) => {
    try {
      var data = null;
      var filter = {limit:10,last_month_only:1,status:'Verified'}
      
      data = await reviewsService.list(filter);
     
      if(data){
        setCarouselItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    
    fetchReviews();
    
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setItemsPerPage(3); // Show 3 items for large screens
      } else {
        setItemsPerPage(1); // Show 1 item for mobile
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
    <div className="flex justify-center bg-[#FCFCFD]">
      <div className="max-w-[1440px] w-full">
        <div
          className={`py-[16px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col gap-[30px] md:gap-10`}
        >
          <div className="w-full flex flex-col gap-3 md:gap-6">
            <div className="fs-48-400-lato lh-57 txt-color-red text-left md:text-center">
            Testimonials from Happy Clients
            </div>
            <div className="flex justify-center">
              <div className="fs-18-400-lato lh-27 txt-color-gray700 text-left md:text-center w-full md:w-1/2">
                {`Our mission has always been to inspire people to express massage
            skills in the best possible way and to promote this ancient practise
            which is so beneficial for everybody's wellbeing. Our London Massage
            Therapists and Massage Venues offer the best massage in London`}
              </div>
            </div>
          </div>
       
          
          <div className="flex flex-col gap-4 carousel">
      
            <div className="carousel-container " >
              <Swiper
                ref={swiperRef}
                spaceBetween={20} // Space between slides
                slidesPerView={itemsPerPage} // Number of slides to show
                className="py-6"
              >
                {carouselItems.map((item, index) => (
                  <SwiperSlide key={index} className="carousel-item bg-white">
                    <div
                      className="bg-white rounded-lg p-8 flex flex-col gap-6 shadow-[20px_18px_18px_-5px_#0000001A]   min-h-[300px] max-h-[300px] md:min-h-[370px] md:max-h-[370px] "
                    >
                      <div className="flex items-center gap-1">
                     
                          <Rate value={parseInt(item?.rating?.toString())} disabled={true} className="txt-color-red" />
                        </div>
                        <div className="flex flex-col gap-4">
                          <div className="fs-18-400-lato txt-color-gray700 h-auto md:min-h-[135px]">
                           
                          <div><span dangerouslySetInnerHTML={{ __html: (limitText(item?.message,328))  }} /></div>
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
                           
                            <div className="fs-16-400-lato txt-color-red">
                              {item.user?.first_name}  {item.user?.last_name}
                            </div>
                          </div>
                        </div>
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
                      className={`w-2 h-2 cursor-pointer ${
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
            <div className="flex justify-center">
              <button className="btn sec-outline-btn py-3 px-6 fs-16-700-lato txt-color-gray700 pt-4 w-full md:w-auto">
                SEE ALL TESTIMONIALS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialSection;
