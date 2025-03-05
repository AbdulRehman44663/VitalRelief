import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import React from "react";
import AccountContent from "@/components/AccountComponent/AccountContent";
import { withAuth } from "@/HOC";
import Head from "next/head";

function AccountPage() {
  return (
    <>
      <div className="block sm:hidden">
        <Navbar />
      </div>
        <Head>
        <title> {'My Account - Vital Relief '}</title>
        </Head>
      <AccountContent />

      <Footer />
    </>
  );
}

export default withAuth(AccountPage, {
  requireAuth: true,
});
