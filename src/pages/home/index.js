import AboutUs from "@/components/LandingComponents/AboutUs";
import BenefitsOfJoining from "@/components/LandingComponents/Benefits";
import EliteTherapist from "@/components/LandingComponents/EliteTherapist";
import FindMassageCenters from "@/components/LandingComponents/FindMassageCenter";
import Footer from "@/components/LandingComponents/Footer";
import HeroSection from "@/components/LandingComponents/Hero";
import MassageTreatments from "@/components/LandingComponents/MassageTreatments";
import Navbar from "@/components/LandingComponents/Navbar";
import NearLocations from "@/components/LandingComponents/NearLocations";
import PricingPlans from "@/components/LandingComponents/PricingPlans";
import ReadingMaterials from "@/components/LandingComponents/ReadingMaterials";
import TestimonialSection from "@/components/LandingComponents/Testimonials";
import MassageVenues from "@/components/LandingComponents/Venues";
import MassageVenuesMales from "@/components/LandingComponents/VenuesMales";
import React from "react";

function HomeLandingPage() {
  const therapists = [
    
    {
      title: "Our Exclusive Therapists",
      description: "Meet Our Exclusive Massage Therapists",
      topIcon: 2,
      type:'EXCLUSIVE',
    },
    {
      title: "Our Prime Therapists",
      description: "Meet Our Prime Massage Therapists",
      topIcon: 3,
      type:'PRIME',
    },
  ];
  return (
    <>
      {/* <div className="flex justify-center">
        <div className="max-w-[1440px]"> */}
      <Navbar />

      <HeroSection />
      {therapists?.map((item, index) => (
        <EliteTherapist
          key={index}
          index={index}
          type={item.type}
          title={item.title}
          description={item.description}
          topIcon={item?.topIcon}
        />
      ))}
      {/* <MassageVenues /> */}
      <MassageVenuesMales />
      <AboutUs />
      <BenefitsOfJoining />
      <PricingPlans />
      <TestimonialSection />
      <ReadingMaterials />
      <MassageTreatments />
      <NearLocations />
      <FindMassageCenters />
      <Footer />
      {/* </div>
      </div> */}
    </>
  );
}

export default HomeLandingPage;
