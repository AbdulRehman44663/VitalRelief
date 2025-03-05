import React, { useEffect,useState } from "react";
import dynamic from "next/dynamic";
const Card = dynamic(() => import("../ListingCard/Card"), { ssr: false });
import elite1 from "../../assets/models/elite-1.png";
import elite2 from "../../assets/models/elite-2.jpg";
import listingService from '../../services/listingService';
import { resolve } from "styled-jsx/css";
import CardSkeleton from "../CardSkeleton";
function EliteTherapist({ index,type, title, description, topIcon }) {
  
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [skeletonCount, setSkeletonCount] = useState(1)
  
 

  const fetchListings = async (filter) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      var data = null;
      var filter = {status:'Active',subscription_type:type}
      
      data = await listingService.list(filter);
     
      if(data){
        setItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect( () =>{

    fetchListings();
    const updateSkeletonCount = () => {
      if (window.innerWidth >= 1024) {
        setSkeletonCount(4); // 4 skeletons for desktop
      } else {
        setSkeletonCount(1); // 1 skeleton for mobile
      }
    };

    // Initial check
    updateSkeletonCount();

    // Update skeleton count on window resize
    window.addEventListener('resize', updateSkeletonCount);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', updateSkeletonCount);
    };

  } , [] )


  return (
    <div
      className={`flex justify-center ${
        (index + 1) % 2 == 0 ? "bg-gray200" : "bg-[#FCFCFD]"
      }`}
    >
      <div className="max-w-[1440px]">
        <div
          key={index}
          className={`py-[16px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col gap-10 ${
            (index + 1) % 2 == 0 ? "bg-gray200" : "bg-[#FCFCFD]"
          }`}
        >
          <div className="w-full flex flex-col gap-3 md:gap-6">
            <div className="fs-48-400-lato lh-57 txt-color-red text-left text-center">
              {title}
            </div>
            <div className="fs-18-400-lato lh-27 txt-color-gray700 text-left text-center">
              {description}
            </div>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-[30px] md:gap-y-[32px]">
            {[...Array(skeletonCount)].map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
          ) : (
            items.length>0 ? 
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
                { items?.map((item, index) => (
                  <Card item={item} key={index} topIcon={topIcon} />
                ))}
              </div>
              :
              <div class="md:text-base fs-14-400-lato text-sm txt-color-gray700 text-center md:max-w-[60%] mx-auto">
                <span class="text-lg fs-16-600-lato  txt-color-red  font-semibold font-secondary text-brand-primary">
                  No Listing Found.</span>
              
              </div>
            
          )}
          
        </div>
      </div>
    </div>
  );
}

export default EliteTherapist;
