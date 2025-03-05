import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import React, { useEffect, useState } from "react";
import FirstListingStepper from "./forms/FirstListingStepper";
import SecondListingStepper from "./forms/SecondListingStepper";
import { withAuth } from "@/HOC";
import { useRouter } from "next/router";
import useStore from "@/store";
import Head from "next/head";

function CreateListingPage() {
  const [stepperCount, setStepperCount] = useState(1);
  const router = useRouter();
 
  var user = useStore((state) => state.user);

  const { logout } = useStore();
  
  const checkStatus = async() =>{
    try{
      const response  = await accountService.checkUserStatus({user_id:user.id});
      if(response){
        if(!response.success){
          logout();
        }
      }
    } catch (error) {

    }
   
  }

  useEffect(()=>{
    if(!user){
      logout();
    }
    checkStatus()
    setInterval(() => {
      checkStatus();
    
    }, 10000);

  },[])
  return (
    <>
      <div className="block sm:hidden">
        <Navbar />
      </div>
      <Head>
      <title> {' Create Listing - Vital Relief'}</title>
      </Head>
  
      {stepperCount === 1 ? (
        <FirstListingStepper
          moveForward={(formNo) => setStepperCount(formNo)}
        />
      ) : (
        <SecondListingStepper
          moveForward={(formNo) => setStepperCount(formNo)}
        />
      )}
      <Footer />
    </>
  );
}

export default withAuth(CreateListingPage, {
  requireAuth: true,
});
