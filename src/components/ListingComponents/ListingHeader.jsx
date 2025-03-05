import React from "react";
import BreadcrumbComp from "../Breadcrumb";

function ListingHeader({ breadcrumb ,type,title=null,description=null}) {
  return (
    <div className="flex justify-center bg-[#FCFCFD]">
      <div className="max-w-[1440px] w-full">
        <div
          className={`py-[16px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col items-start md:items-center gap-[30px] md:gap-10 `}
        >
          <BreadcrumbComp items={breadcrumb} />
          <div className="flex flex-col items-start md:items-center gap-4">
            
            <div className="fs-48-400-lato txt-color-darkgray capitalize">
              {type =='Search' ? title:(type == 'Therapists' ? 'Therapists':type)}
              
            </div>
            {description ? 
            <div className="fs-18-400-lato txt-color-gray1000">
              <div dangerouslySetInnerHTML={{ __html:description }} />
            </div>:''}
            {type=='Therapists' ? 
              <>
                <div className="fs-18-400-lato txt-color-gray700 text-left md:text-center md:w-3/5">
                  {`Gents, looking for a great massage in London? Elite Massage has your back (literally). We've rounded up the city's best independent male massage therapists and venues. Whether you need a sports massage to tackle those gym-induced knots or a Deep Tissue Massage in London session to melt away stress, our directory has you sorted. We've checked out each therapist to ensure you're in safe, skilled hands. Ready to book? Just click through to find contact details and websites for easy scheduling. Your perfect London massage experience is just a few clicks away.`}
                </div>
                {/* <div className="fs-18-400-lato txt-color-gray700 text-left md:text-center md:w-3/5">
                  {`We list a large variety of Male Massage Therapists in London areas to help you relax and work out some tension in your muscles. Our listed therapists offer a wide choice of massage therapies including male Sports massages in London as well as other services such as Reflexology and Deep Tissue Massage. All of our male therapists listed have been thoroughly researched so you know you will be safe in their capable hands and you will receive a pleasant experience.`}
                </div>
                <div className="fs-18-400-lato txt-color-gray700 text-left md:text-center md:w-3/5">
                  {`If you are looking for a massage in London, then browse our listings today and see which listings will suit you best. Our listings will have a link to their websites and also a contact number, so you can call for a booking or visit their website for more info.`}
                </div> */}
              </>
            :<></>
            }
            {type=='Female Therapist' ? 
              <>
                <div className="fs-18-400-lato txt-color-gray700 text-left md:text-center md:w-3/5">
                  {`We provide expert Female Massage Therapists for you, so you can experience a great massage and feel relaxed and rejuvenated. We have an extensive list of professional female massage therapists in London areas, offering a wide variety of massages from female Sports Massage in London to Lomi Lomi massages and Reflexology sessions. All of our female therapists have been properly researched, so you know that our listings are the best and they can cater to all your body health needs.`}
                </div>
                <div className="fs-18-400-lato txt-color-gray700 text-left md:text-center md:w-3/5">
                  {`If you need a massage to de-stress and relax, or you need to work out some knots in your muscles, then browse through our listings to find your perfect female massage therapist in London. Our listings will have links to their website as well as a phone number, so you can call up and book or browse their website for more information.`}
                </div>
              </>
            :
            <></>
            }

            {type=='Spas & Salon' ? 
              <>
                <div className="fs-18-400-lato txt-color-gray700 text-left md:text-center md:w-3/5">
                  {`Ready to take your relaxation game up a notch? Male Massage has scoped out London's finest spas and salons for your massaging pleasure. We're talking full-on pampering experiences, from the moment you step in until you float out. Whether you're in the mood for a traditional Thai Massage in London, a Swedish Massage in London, an Aromatherapy Massage in London, or a Full Body Massage in London, our curated list has got something for everyone. We've made sure to include only the crème de la crème of London's spa scene. Fancy giving it a go? Just scroll through our listings to find your perfect match. With easy booking links and contact info at your fingertips, your spa day is just a click away. So why wait? Dive into Male Massage's top picks and get ready to relax in true London style.`}
                </div>
              </>
            :
            <></>
            }
            {type=='Agencies' ? 
              <>
                <div className="fs-18-400-lato txt-color-gray700 text-left md:text-center md:w-3/5">
                  {`Vital Relief offers various London massage agencies for you to choose from. All our agencies have been thoroughly researched so only the best will be on our directory. If you are looking for a Massage Therapist in London, we have numerous agencies who will be able to cater to your every need.`}
                </div>
                <div className="fs-18-400-lato txt-color-gray700 text-left md:text-center md:w-3/5">
                  {`Browse our selection of massage therapist agencies in London and get a great massage experience in London and feel refreshed and relaxed. Our listings will have a link to their website as well as contact number, so you can either call for a booking or visit their website for more information.`}
                </div>
              </>
            :
            <></>
            }


          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingHeader;
