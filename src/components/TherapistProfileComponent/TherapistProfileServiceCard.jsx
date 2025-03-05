import { useRouter } from "next/router";
import React from "react";

function TherapistProfileServiceCard({ isServiceType,listing }) {
  const router = useRouter();
  return (
    (isServiceType == 'Service Options' && ((listing?.service_type=='OUT CALL' && listing?.locations?.length>0) || listing?.service_type=='IN CALL'))
    || (isServiceType == 'Treatments' && listing?.services?.length>0) ? 

    <div className="flex flex-col gap-5 py-8 px-6 border border-[#97B2A9] rounded-lg">
      <div className="fs-24-400-lato txt-color-darkgray">  {isServiceType ? 'Service Options':'Treatments'}</div>
      <div className="border border-[#97B2A9]"></div>
      {isServiceType ? 
      <>
       {isServiceType && listing?.service_type=='IN CALL' && (
        <>
          <div className="fs-20-700-lato txt-color-darkgray">InCall </div>
          <div className="flex item-center flex-wrap gap-3">
            <div
              className="p-2 rounded-md border  border-[#97B2A9] fs-18-600-lato text-txt-color-darkgray sm:text-txt-color-darkgray lg:txt-color-gradient"
            >
              {listing?.region?.name}
            </div>
            {/* {[1, 2].map((item, index) => (
              <div
                key={index}
                className="p-2 rounded-md border border-[#97B2A9] fs-18-600-lato txt-color-gradient"
              >
                Barnet
              </div>
            ))} */}

            
          </div>
        </>
        )}
        
        {isServiceType && listing?.service_type=='OUT CALL' && (
          <>
          <div className="fs-20-700-lato txt-color-darkgray">Out-Call</div>
          <div className="flex item-center flex-wrap gap-3">
          {listing?.locations.map((item, index) => (
            <div
              key={index}
              className="p-2 rounded-md border  border-[#97B2A9] fs-18-600-lato text-txt-color-darkgray sm:text-txt-color-darkgray lg:txt-color-gradient"
            >
              {item?.location_detail?.name}
            </div>
          ))}

          
        </div>
          </>
        )}
        
      </> 
      : 
      <>
         <div className="flex item-center flex-wrap gap-3">
          {listing?.services?.map((item, index) => (
            <div
              title={"Click to search "+item?.service?.name+" Massage therapists"}
              onClick={()=>{router.push('/search/'+item?.service?.slug)}}
              key={index}
              className="cursor-pointer p-2 rounded-md border  border-[#97B2A9] fs-18-600-lato  text-txt-color-darkgray sm:text-txt-color-darkgray lg:txt-color-gradient"
            >
              {item?.service?.name}
            </div>
          ))}

          
        </div>
      </>}
     
    </div> : <></>
  
  );
}

export default TherapistProfileServiceCard;
