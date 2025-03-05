import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import ListingHeader from "@/components/ListingComponents/ListingHeader";
import ListingList from "@/components/ListingComponents/ListingList";
import { withAuth } from "@/HOC";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function ServicesPage() {
  const router = useRouter();

  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Services",
      href: "/",
    },
    {
      title:
        router?.query?.slug == "spas-&-salons"
          ? "Agenciess"
          : router?.query?.slug == "treatments"
          ? "Treatments"
          : "",
    },
  ];
  return (
    <div>
      <Navbar />
     
      <ListingHeader breadcrumb={breadcrumb} />
      <ListingList />
      <Footer />
    </div>
  );
}

export default withAuth(ServicesPage, {
  requireAuth: false,
  publicAccess: true,
});
