import ContactUs from "@/components/ContactUsComponent";
import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import { withAuth } from "@/HOC";
import settingService from "@/services/settingService";
import Head from "next/head";
import React,{useState,useEffect} from "react";

function ContantUsPage() {

  const [setting, setSetting] = useState(null);

   const fetchDetail = async () =>{
    
    try {
    
      var data = null;
      
      data = await settingService.getSiteSetting();
      
      if(data){
        setSetting(data.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      // setLoading(false);
    }
   
  }
  
  useEffect(() => {
    fetchDetail();
  },[]);

  return (
    <>
      <Navbar />
      <Head>
        <title>	
        Get in touch with us for questions | Vital Relief</title>
      </Head>
      <ContactUs setting={setting} />
      <Footer />
    </>
  );
}

export default withAuth(ContantUsPage, {
  requireAuth: false,
  publicAccess: true,
});
