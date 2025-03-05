import BreadcrumbComp from "@/components/Breadcrumb";
import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import TherapistProfileDetails from "@/components/TherapistProfileComponent/TherapistProfileDetails";
import { withAuth } from "@/HOC";
import listingService from "@/services/listingService";
import { Breadcrumb } from "antd";
import { useRouter } from "next/router";
import React ,{useState ,useEffect}from "react";
import Head from 'next/head';
function TherapistProfilePage() {
  const router = useRouter();
  const{slug} = router.query;
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([
  
   
  ]);

  const fetchListing = async (filter) => {
    
    try {
      setLoading(true);
      if(slug){

        var data = null;
        
        data = await listingService.getBySlug(slug);
       
        if(data){
          setListing(data.data);
          let category = 'therapists';
          let title ='Therapists';
          if(data.data?.category =='Agencies'){
            category='agencies';
            title ='Agenciess';
          }
          setBreadcrumb([
            {
              title: "Home",
              href: "/",
            },
            {
              title: title,
              href: "/listings/"+category,
            },
            
            {
              title: data?.data?.title,
            },
          ]);
        }
      }
     
    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
      setLoading(false);
    }
  }
  
  
  useEffect(()=>{
    fetchListing();
  },[])
  
  return (
    <div>
      
      <Navbar />
      {listing && (listing?.category || listing?.canonical_url || listing?.meta_title || listing?.meta_description || listing?.meta_keywords) ? 
        <Head>
          
         
              <title>
                { listing?.meta_title && listing?.meta_title !='null' ? 
                 listing?.meta_title 
                :<>
                 {listing?.category}  {listing?.region?.name ? ' in ' +listing?.region?.name :'Massage Therapist in UK'}
                </>}
                 </title>
              {listing?.meta_description &&  listing?.meta_description!='null'? 
                <meta name="description" content={listing?.meta_description} />
              :<></>}
              {listing?.meta_keywords &&  listing?.meta_keywords!='null'? 
                <meta name="keywords" content={listing?.meta_keywords} />
              :<></>}
              {listing?.canonical_url &&  listing?.canonical_url!='null'? 
                <link rel="canonical" href={listing?.canonical_url} />
              :<></>}
         
        </Head>
        :
        <></>
      }
      
      <div className="flex justify-center bg-[#FCFCFD]">
        <div className="max-w-[1440px] w-full">
          <div
            className={`py-[32px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col items-start md:items-center gap-[30px] md:gap-[40px]`}
          >
            <Breadcrumb
              className="flex items-center fs-18-400-lato txt-color-gray500 hover:bg-transparent pt-10 sm:pt-0"
              separator={
                <svg
                  width="7"
                  height="13"
                  viewBox="0 0 7 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L6 6.5L1 11.5"
                    stroke="#98A2B3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              items={breadcrumb ? breadcrumb : []}
            />
            {listing && !loading? 
              (
                listing?.status == 'Active'? 
                <TherapistProfileDetails listing={listing}/>
                :
                <div class="md:text-base fs-14-400-lato text-sm txt-color-gray700 text-center md:max-w-[60%] mx-auto">
                  <span class="text-lg fs-16-600-lato  txt-color-red  font-semibold font-secondary text-brand-primary">
                    Listing is not active yet.
                  
                  </span>             
                </div>
              )
             
             :
             <div class="md:text-base fs-14-400-lato text-sm txt-color-gray700 text-center md:max-w-[60%] mx-auto">
              <span class="text-lg fs-16-600-lato  txt-color-red  font-semibold font-secondary text-brand-primary">
                {loading? 'Loading..':' No Listing Found.'}
               
              </span>             
             </div>
            }
           
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withAuth(TherapistProfilePage, {
  requireAuth: false,
  publicAccess: true,
});
