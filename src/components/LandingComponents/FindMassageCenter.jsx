import React, { useEffect, useState,useRef } from "react";
import readingOne from "../../assets/models/reading-1.png";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { treatments } from "@/utils/data";
import { useRouter } from "next/router";
function FindMassageCenters() {
  const swiperRef = useRef(null);
  const [carouselItems, setCarouselItems] = useState([1, 2, 3, 4, 5, 6,7,8]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
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

  const fetchTreatments =() =>{
    let i =0;
    let items = [];
    console.log(treatments)
    treatments.map((item)=>{
      if(item.id ){
        items.push(item);
        i++;
      }
    })
    setCarouselItems(treatments)
  }

  useEffect(()=>{
    
    fetchTreatments();

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

  const removeWordFromString = (title, word) => {
    if (!title || typeof title !== 'string') return title; // Ensure title is a string
    const regex = new RegExp(`\\b${word}\\b`, 'gi'); // Match the word case-insensitively
    return title.replace(regex, '').trim(); // Remove the word and trim extra spaces
  }


  return (
    <div className="flex justify-center bg-[#FCFCFD]">
      <div className="max-w-[1440px] w-full">
        <div
          className={`py-[16px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col gap-[30px] md:gap-10`}
        >
          <div className="w-full flex flex-col gap-3 md:gap-6">
            <div className="fs-48-400-lato lh-57 txt-color-red text-left md:text-center">
              Find Massages Near You
            </div>
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
                       onClick={()=> router.push('/massage/'+item.slug)}
                      className="cursor-pointer rounded-lg p-0  flex flex-col gap-6"
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
                      <div className="flex flex-col gap-2">
                        <div className="fs-24-700-lato txt-color-gray700 truncate">
                          {removeWordFromString(item.title,'london')}
                        </div>
                      </div>
                    </div>
                   
                  </SwiperSlide>
                ))}
                </Swiper>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap md:no-wrap  gap-2">
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
            {itemsPerPage == 1 && (
              <div className="flex justify-center pt-4 pb-4">
                <button className="btn sec-outline-btn py-3 px-6 fs-16-700-lato txt-color-gray700 w-full md:w-auto">
                  SEE ALL Massages
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindMassageCenters;
