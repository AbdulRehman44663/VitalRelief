import BreadcrumbComp from "@/components/Breadcrumb";
import FAQHeader from "@/components/FAQComponent/FAQHeader";
import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import { withAuth } from "@/HOC";
import Head from "next/head";
import React from "react";

function PrivacyPolicyPage() {
  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Privacy Policy",
    },
  ];
  return (
    <>
      <Navbar />
      <Head><title>
        
       Privacy Policy
         </title></Head>
      <div className="flex justify-center bg-[#FCFCFD]">
        <div className="max-w-[1440px] w-full">
          <div
            className={`py-[36px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col items-start md:items-center gap-[30px] md:gap-[40px]`}
          >
            <BreadcrumbComp items={breadcrumb} />
            <div className="flex flex-col items-start md:items-center gap-3 md:gap-6 w-full ">
              <div className="fs-48-400-lato txt-color-darkgray text-left md:text-center">
                Privacy Policy
              </div>
              <div className="fs-16-400-lato txt-color-gray700 text-justify md:text-justify">
                Vital Relief is committed to protecting your right to privacy as a user of our services. We respect your privacy and are dedicated to safeguarding any information you share with us. This policy outlines how we collect, use, and protect your personal information when you use our website and services.

                <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Collection and Use of Personal Data</div>
                 To provide our services, we need to collect and process certain personal data. We take reasonable measures to ensure the security of your information and prevent unauthorized access or unlawful use. We comply with all applicable data protection laws, including the UK GDPR and the Data Protection Act 2018.
                <br></br>We collect personal data that you provide during registration or while using our services. This data is used to improve our services and for commercial purposes, such as the sale of advertising space. Your personal data is processed on an anonymous, aggregated basis and is not stored alongside your personally identifiable information.
                <br></br>We will only retain your personal data for as long as it is necessary for the purposes for which it was collected. In the event that our business is sold to a third party, we will transfer your data to the new owner to ensure continued service provision.

                <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Changes to the Privacy Policy</div>
                 Any changes to this Privacy Policy will be communicated through our website. The policy will always be accessible online, and we encourage you to review it regularly to stay informed about how we protect your privacy.

                <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Advertising Standards</div>
                 All advertisements must comply with the British Code of Advertising Practice and the Advertising Standards Authority&apos;s guidelines. Ads must be legal, decent, honest, and truthful, and must adhere to all relevant laws.

                 <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Contact Information</div>
                  If you have any questions about our Privacy Policy or wish to opt back into receiving information that you previously opted out of, please contact us.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withAuth(PrivacyPolicyPage, {
  requireAuth: false,
  publicAccess: true,
});
