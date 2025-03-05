import React from "react";
import aboutUsImg from "../../assets/images/about-us-img-home.png";
import Image from "next/image";

function AboutUs() {
  return (
    <div className="flex justify-center bg-[#FCFCFD]">
      <div className="max-w-[1440px]">
        <div
          className={`py-[16px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col gap-[30px] md:gap-10 bg-[#FCFCFD]`}
        >
          <div className="relative flex flex-col items-center mx-auto sm:mx-0 md:flex-row">
            <div className="flex items-center py-5 md:w-1/2 ">
              <div className="text-left flex flex-col gap-6">
                <div className="fs-48-400-lato txt-color-red leading-10 tracking-tight sm:leading-none">
                  About Vital Relief
                </div>
                <div className="max-w-md mx-auto txt-color-gray600 fs-18-400-lato md:max-w-3xl">


                  {` Welcome to Male Vital Relief – The UK’s Leading Male Massage Directory
Male Massage isthe fastest-growing massage directory in the UK, connecting
you with certified massage therapists and top-rated venues across London.
Whether you're seeking a professional massage or looking to grow your
practice, we’re here to help.

               `}
                  <br></br>
                  Why Choose Male Massage?
                  <br></br>

                  <ul className="li-dots">
                    <li>
                      London’s Trusted Male Massage Directory – We feature only certified
                      therapists and reputable venues, ensuring quality and professionalism.

                    </li>
                    <li>
                      Quality Assurance – Every listing is verified for certification, expertise, and
                      credibility.
                    </li>
                    <li>
                      Diverse Services – Find skilled male therapists and high-quality massage
                      venuessuited to your needs.
                    </li>
                  </ul>

                  {` Supporting Therapists & Agenciesin London
Our mission isto help professional massage therapists and agencies grow their
businesses by increasing visibility, client reach, and revenue.
`}
                  <br></br>
                  Are you a certified male massage therapist or agency looking to:
                  <br></br>
                  {/* <ul className="li-dots">
                    <li> */}
                    ✅ Expand your client base?
                    {/* </li>
                    <li> */}
                  <br></br>

                    ✅ Drive more website traffic?
                    {/* </li>
                    <li> */}
                  <br></br>

                    ✅  Boost your earnings?
                    {/* </li>
                  </ul> */}
                  <br></br>

                  {` 📢 Register with Male Vital Relief today and start attracting more clients with
a professional listing on our platform.

`}
                  <br></br>
                  {`🚀 Join now and grow your business with Male Vital Relief!`}

                </div>
                <div className="mt-4">
                  <button className="btn bg-green-gradient border hover:[border:none] py-3 px-6 fs-16-700-lato text-white rounded-md">
                    {" "}
                    Get Listed
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center py-5 md:w-1/2 md:pb-10 md:pt-5 md:pl-10">
              <div className="relative w-full p-3 rounded md:p-8">
                <div className="rounded-lg bg-white text-black w-full flex justify-center sm:justify-end">
                  <Image src={aboutUsImg} alt="about us" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
