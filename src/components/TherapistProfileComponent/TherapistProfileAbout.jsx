import {React, useState, useEffect} from "react";
import TherapistProfileReviews from "./TherapistProfileReviews";
import TherapistProfilePricingCard from "./TherapistProfilePricingCard";
import TherapistProfileServiceCard from "./TherapistProfileServiceCard";
import { useRouter } from "next/router";

function TherapistProfileAbout({listing}) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // Mobile screen threshold
    };

    checkScreenSize(); // Run initially
    window.addEventListener("resize", checkScreenSize); // Listen for resize events

    return () => window.removeEventListener("resize", checkScreenSize); // Cleanup
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-5 py-8 px-6 border border-[#97B2A9] rounded-lg">
          <div className="fs-24-400-lato txt-color-darkgray">About</div>
          <div className="fs-20-400-lato txt-color-gray600">
            <div>
              <div dangerouslySetInnerHTML={{ __html: listing?.description }} />
            </div>
          </div>
          
        </div>
        {isMobile && (
          <div className="flex flex-col gap-8">
            <TherapistProfilePricingCard />
            <TherapistProfileServiceCard listing={listing} isServiceType={"Service Options"} />
            <TherapistProfileServiceCard listing={listing} isServiceType={true} />
          </div>
        )}
          {listing?.tags ?
          (   
           <>
                <div className="fs-24-400-lato txt-color-darkgray ">Related Tags:</div>
                <div className="flex items-center gap-1 mt-[-20px]">
                {(listing?.tags).map((tag,index)=>(
                  tag?.tag?.name ? 
                  <div onClick={()=>{router.push('/tag/'+tag?.tag?.url)}} className="p-2 cursor-pointer rounded-lg bg-[#F2F4F7] fs-14-500-lato txt-color-red" key={index}>
                    {tag?.tag?.name}
                  </div>:''
                ))}
                </div>
                </>
          )
          :<></>}
        
        <TherapistProfileReviews listing={listing} />
      </div>
      {!isMobile && (
        <div className="flex flex-col gap-8">
          <TherapistProfilePricingCard />
          <TherapistProfileServiceCard listing={listing} isServiceType={"Service Options"} />
          <TherapistProfileServiceCard listing={listing} isServiceType={true} />
        </div>
      )}
    </div>
  );
}

export default TherapistProfileAbout;
