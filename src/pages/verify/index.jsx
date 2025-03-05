import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import { Button, Form, Input, InputNumber } from "antd";
import React, { useEffect, useState } from "react";
import bannerImg from "../../assets/images/login-banner.jpg";
import logo from "../../assets/images/m-massage-logo.png";
import Image from "next/image";
import Link from "next/link";
import useStore from "@/store";
import { useRouter } from "next/router";
import { withAuth } from "@/HOC";
import authService from '../../services/auth';
import ErrorMessage from '../../components/Common/ErrorMessage';
import Head from "next/head";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const itemsPerPage = 1;

function VerifyPage() {
  const router = useRouter();
  const [isSuccess, setSuccess] = useState(false);  
  const [startIndex, setStartIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([1, 2, 3, 4, 5, 6]);
  const { code, email } = router.query;
  const [error, setError] = useState('');
  const handleBack = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  // Click handler for the forward button
  const handleForward = () => {
    setStartIndex((prevIndex) =>
      Math.min(
        prevIndex + itemsPerPage,
        (carouselItems?.length - 1) * itemsPerPage
      )
    );
  };

  const verifyCode = async (values) =>{
    setError('');
    setSuccess(false);
    try {
      const response = await authService.checkVerification(values);
      if (response.success) {
        setError('');
        setSuccess(true);
       
      }else{
        setError(response.message)
      }
    }catch (err) {
      console.log(err)
    
    }
  }


  useEffect(() => {
    if (code && email) {
      // Do something with the code and email (e.g., send them to an API)
      console.log('Verification details:', { code, email });
    
        let data = {code: code, email: email};
  	console.log(data)
        verifyCode(data);
      
    }
  }, [code, email]);

  return (
    <>
      <div className="block sm:hidden">
        <Navbar />
      </div>
      <Head>
        <title> {'Account Verification - Vital Relief '}</title>
        </Head>
      <div className="flex justify-center bg-[#FCFCFD] sm:bg-white">
        <div className="max-w-[1440px] w-full">
          <div className="px-6 py-8 md:px-8 ">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div>
                <div className="px-8 pt-8 hidden md:block">
                  <Link href={"/"}>
                    <Image
                      src={logo}
                      alt="VitalRelief"
                       className="w-[154px] h-[65px] "
                    />
                  </Link>
                </div>
                <div className="flex justify-center items-center py-10 md:py-0">
                  <div className="flex flex-col justify-center gap-8 w-full md:w-1/2 h-auto md:h-[800px]">
                    <div className="fs-32-400-qualo txt-color-red">Verify Account</div>
                    <br></br><br></br>
                     {isSuccess ? 
                    <div>
                      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Account Verified!</strong>
                        <span className="block sm:inline ml-1">
                        Your account is verified. Please <span onClick={()=>router.push('/login')} style={{cursor:"pointer"}} className="text-green-700"><u><b>login</b></u></span> to continue.
                        </span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => {/* close logic here */}}>
                          <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <title>Close</title>
                            <path d="M10 9l-5-5m0 0l5 5m-5-5l5 5m5 5l5 5m0 0l-5-5m5 5l-5-5"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                    :<></>}
                    <ErrorMessage message={error} />
                   
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative">
                  <Image
                    src={bannerImg}
                    alt="register banner"
                    className="rounded-[24px] h-[896px]"
                  />
                  {/* <div className="absolute inset-0 bg-[#00000073] rounded-xl"></div> */}
                  <div className="absolute inset-x-0 bottom-14 flex flex-col px-14 gap-6">
                    <div className="fs-36-500-lato text-white">
                      {`"Getting a massage with Christie is totally worth it and she’s
                  extremely professional. Loved it and highly recommend her
                  services. I’ll be back as soon as possible."`}
                    </div>
                    <div className="flex justify-between gap-3">
                      <div className="fs-30-600-lato text-white">
                        Amélie Laurent
                      </div>
                      <div className="flex items-center gap-8">
                        <button
                          className="border border-[#FFFFFF80] rounded-full h-14 w-14 flex justify-center items-center"
                          onClick={() => handleBack()}
                          disabled={startIndex === 0}
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19 12H5M5 12L12 19M5 12L12 5"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          className="border border-[#FFFFFF80] rounded-full h-14 w-14 flex justify-center items-center"
                          onClick={() => handleForward()}
                          disabled={
                            startIndex >= carouselItems?.length - itemsPerPage
                          }
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withAuth(VerifyPage, {
  requireAuth: false,
  publicAccess: false,
});
