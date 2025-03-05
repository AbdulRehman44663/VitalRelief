import BreadcrumbComp from "@/components/Breadcrumb";
import FAQHeader from "@/components/FAQComponent/FAQHeader";
import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import { withAuth } from "@/HOC";
import Head from "next/head";
import React from "react";

function CookiePolicyPage() {
  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Cookies Settings",
    },
  ];
  return (
    <>
      
      <Navbar />
      <Head><title> Cookie Policy
      </title></Head>
      <div className="flex justify-center bg-[#FCFCFD]">
        <div className="max-w-[1440px] w-full">
          <div
            className={`py-[36px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col items-start md:items-center gap-[30px] md:gap-[40px]`}
          >
            <BreadcrumbComp items={breadcrumb} />
            <div className="flex flex-col items-start md:items-center gap-3 md:gap-6 w-full ">
              <div className="fs-48-400-lato txt-color-darkgray text-left md:text-center">
                Cookies Settings
              </div>
              <div className="fs-16-400-lato txt-color-gray700 text-justify md:text-justify">
               
                <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1"> What are cookies?</div>
           
                  Cookies are small text files that store data on your computer or device. They record your online preferences and help us improve your experience on our site. Our cookies may include both persistent and session cookies, as well as third-party cookies.
                  <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1"> How do cookies benefit you?</div>
                   Cookies allow us to record information about your online preferences. Cookies enable us to:
                  <ol className="list-decimal pl-8 pt-2 ">
                    <li>
                      Keep you logged in during your session
                    </li>
                    <li>
                      Provide targeted information based on your interests
                    </li>
                    <li>
                      Monitor your account for irregular activity to enhance security
                    </li>
                    <li>
                      Analyze site traffic to improve our services
                    </li>
                  </ol>
                  
                
                 
                  <br></br>
                  <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1"> We use cookies to:</div>
                  <ol className="list-decimal pl-8 pt-2 ">
                    <li>Safeguard your privacy in secure areas of the site</li>
                    <li> Identify the most relevant content for you</li>
                    <li> Remember your preferences for tools and settings</li>
                    <li> Measure the effectiveness of our advertising</li>
                  </ol>

                  <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">We Do Not Use Cookies to:</div>
                  <ol className="list-decimal pl-8 pt-2 ">
                    <li>Store personally identifiable information without your consent</li>
                    <li>Track your browsing after you leave our site</li>
                    <li>Sell or distribute your information to third parties</li>
                  </ol>
                  
                  <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Third party cookies</div>
                  We may partner with approved third parties who place cookies on our site. These cookies do not contain personally identifiable information and are used to improve your experience. By using our site, you consent to these cookies. If you prefer, you can opt out, but this may result in less relevant digital advertising.

                  
                  <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Cookie Safety</div>
                   Cookies cannot damage your computer or spread viruses. They are simply text files that store information you have provided. For more information about managing cookies, visit www.aboutcookies.org
                   <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Data Protection</div>
                  We handle your personal data in compliance with the UK GDPR and the Data Protection Act 2018. For detailed information, please refer to our full Privacy Policy.
                  <div className="fs-18-700-lato txt-color-darkgray mt-3 mb-1">Reminder</div>
                  Cookies are essential for getting the most out of our website. Disabling cookies may limit the functionality of our site and affect your user experience.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withAuth(CookiePolicyPage, {
  requireAuth: false,
  publicAccess: true,
});
