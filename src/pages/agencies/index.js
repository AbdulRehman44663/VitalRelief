import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import ListingHeader from "@/components/ListingComponents/ListingHeader";
import ListingList from "@/components/ListingComponents/ListingList";
import { withAuth } from "@/HOC";
import React from "react";

function AgenceisPage() {
  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Agencies",
    },
  ];
  return (
    <div>
      <Navbar />
      <ListingHeader breadcrumb={breadcrumb} type={"Agencies"} />
      <ListingList record_type={'Agency'}/>
      <Footer />
    </div>
  );
}

export default withAuth(AgenceisPage, {
  requireAuth: false,
  publicAccess: true,
});
