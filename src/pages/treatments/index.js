import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import TreatmentsHeader from "@/components/TreatmentsComponents/TreatmentsHeader";
import TreatmentsList from "@/components/TreatmentsComponents/TreatmentsList";
import { withAuth } from "@/HOC";
import Head from "next/head";
import React from "react";

function TreatmentsPage() {
  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    
    {
      title: "Masssage Treatments",
    },
  ];
  return (
    <div>
      <Navbar />
      <Head>
      <title> Massage Treatments - London Massage | Massage Near Me</title>
      </Head>
      <TreatmentsHeader breadcrumb={breadcrumb} />
      <TreatmentsList />
      <Footer />
    </div>
  );
}

export default withAuth(TreatmentsPage, {
  requireAuth: false,
  publicAccess: true,
});
