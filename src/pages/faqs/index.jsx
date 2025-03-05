import FAQHeader from "@/components/FAQComponent/FAQHeader";
import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import { withAuth } from "@/HOC";
import Head from "next/head";
import React from "react";

function FAQPage() {
  return (
    <>
      <Navbar />
      <Head>
        <title>	FAQ</title>
      </Head>
      <FAQHeader />
      <Footer />
    </>
  );
}

export default withAuth(FAQPage, {
  requireAuth: false,
  publicAccess: true,
});
