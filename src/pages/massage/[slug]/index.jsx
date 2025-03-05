import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import MassageHeader from "@/components/MassageComponents/MassageHeader";
import MassageList from "@/components/MassageComponents/MassageList";
import { withAuth } from "@/HOC";
import { treatments } from "@/utils/data";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect,useState } from "react";

function MassageSingleDetailPage() {

  const [massage, setMassage] = useState(null);
  const router = useRouter();
  const { slug } = router.query;
  const treatmentsList = treatments;

  const fetchTreatments =() =>{

    if(slug){
      treatmentsList.map((item)=>{
        console.log(item.slug,slug)
        if(item.slug == slug){
          setMassage(item);
        }        
      })
    }
  }

  useEffect(()=>{
    fetchTreatments();
  },[])
  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    
    {
      title: "Masssage Treatments",
      href:"/treatments"
    },
    {
      title:massage?.title,

    }
  ];
  return (
    <div>
      <Navbar />
      <Head><title>{massage?.title}</title></Head>
      <MassageHeader breadcrumb={breadcrumb} massage={massage} />
      <div className="flex justify-center bg-[#fcfcfd]">
        <div className="max-w-[1440px] w-full">
          {massage ? 

            <div className="pb-[16px] md:pb-[56px] ">
              
              <MassageList
                title={"Our "+massage.title+" Elite Therapists"}
                massage={massage}
                topIcon={1}
                type={"ELITE"}
              />
              <MassageList
                title={"Our "+massage.title+" Prime Therapists"}
                massage={massage}
                topIcon={3}
                type={"PRIME"}
              />
            </div>
          :<></>}
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withAuth(MassageSingleDetailPage, {
  requireAuth: false,
  publicAccess: true,
});
