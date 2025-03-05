import React from "react";
import BreadcrumbComp from "../Breadcrumb";
import treatmentBanner from "../../assets/models/treatment-1.jpg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function TreatmentsHeader({ breadcrumb }) {
  const router = useRouter();
  return (
    <div className="flex justify-center bg-[#FCFCFD]">
      <div className="max-w-[1440px] w-full">
        <div
          className={`py-[16px] px-[24px] md:pt-[56px] md:pb-20 md:px-[64px] flex flex-col gap-[30px] md:gap-[40px] bg-[#FCFCFD]`}
        >
          <div className="flex justify-center">
            <BreadcrumbComp items={breadcrumb} />
          </div>
    
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-0 md:gap-x-12 gap-y-10 md:gap-y-[32px] mb-10 md:mb-0">
          
              <div
                onClick={()=>router.push('/listings/therapists')}
                className=" cursor-pointer  bg-white h-[200px] md:h-[300px] rounded-lg flex flex-col gap-6  bg-cover bg-center relative"
                
                style={{
                  backgroundImage: "url('/quicklinks/quick-link-feature.jpg')",
                }}
              >
                <div className="absolute  rounded-lg inset-0 bg-black opacity-50">
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white fs-24-400-lato">
                FEATURED THERAPISTS
                </div>
              </div>


              
              <div
               onClick={()=>router.push('/listings/therapists')}
                className="  cursor-pointer  bg-white h-[200px] md:h-[300px] rounded-lg flex flex-col gap-6  bg-cover bg-center relative"
                style={{
                  backgroundImage: "url('/quicklinks/quick-link-male.jpg')",
                }}
              >
                <div className="absolute  rounded-lg inset-0 bg-black opacity-50">
                </div>
                <div className="absolute inset-0 flex items-center justify-center text-white fs-24-400-lato">
                MALE THERAPISTS
                </div>
              </div>

              
              <div
               onClick={()=>router.push('/listings/spas-and-salon')}
                className=" cursor-pointer bg-white  h-[200px] md:h-[300px] rounded-lg flex flex-col gap-6  bg-cover bg-center relative"
              
                style={{
                  backgroundImage: "url('/quicklinks/quick-link-spa.jpg')",
                }}
              >
                  <div className="absolute  rounded-lg inset-0 bg-black opacity-50">
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-white fs-24-400-lato">
                  Agencies
                  </div>
              </div>
          </div> */}
            

          <div className="flex flex-col items-start md:items-center gap-4">
            <div className="fs-48-400-lato txt-color-darkgray">
              Massage Treatments
            </div>
            <div className="fs-18-400-lato txt-color-gray700 text-left md:text-center md:w-3/5">
              {`At Male Massage London we list a wide variety of independent therapists and massage therapy venues in and around the London area. All of our listings are thoroughly checked and researched so you know that they will offer a great service and that you will be safe in their capable hands. We list agencies and independent therapists that offer a wide variety of massage treatments in London. The listings offer services such as Reflexology massages, Deep Tissue Massage and Lomi Lomi Massage in London areas.`}
            </div>
            <div className="fs-18-400-lato txt-color-gray700 text-left md:text-center md:w-3/5">
              {`We also provide information on the various massage therapies that our listings offer so that you can decide what treatment would suit you best. If you play a lot of sports and have tightneLooking for a great massage in London? Male Massage has got you covered. We've handpicked the best independent massage therapists and top-notch massage spots across the city. Rest assured, we've done our homework to make sure you're in good hands. From Reflexology to Deep Tissue Massage in London and even Lomi Lomi Massage in London, we've got a massage for every need. Whether you're in Shoreditch or Kensington, you'll find skilled pros ready to work out those knots.`}
              <br></br>
                <div className="mt-4">
                {`Not sure which massage is right for you? No worries. We break down the different techniques so you can pick the perfect treatment. And for all you fitness buffs out there, we've got listings for killer sports massages in London to sort out those post-workout aches. So go on, take a look around Elite Massage. Whether you're after a full-body blissout, a Relaxing Massage in London, or a targeted Thai massage in London, we'll point you in the right direction. Your perfect London massage is just a click away.ss in your muscles, we list a variety of services that offer great Sports massages in London to help with sports related injuries and muscle soreness.`}
            
                </div>
              </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default TreatmentsHeader;
