import PageNotFound from "@/components/Common/PageNotFound";
import Footer from "@/components/LandingComponents/Footer";
import Navbar from "@/components/LandingComponents/Navbar";
import ListingHeader from "@/components/ListingComponents/ListingHeader";
import ListingList from "@/components/ListingComponents/ListingList";
import { withAuth } from "@/HOC";
import listingService from "@/services/listingService";
import Head from "next/head";

import { useRouter } from "next/router";
import React,{useState,useEffect} from "react";

function ListingPage() {
  const router = useRouter();
  const [filters, setFilters] =useState(null);
  // const filtering=false;
  
  const fetchFilters = async () =>{
      try{
      
        let data = await listingService.getListingFilters();
        if(data){
        setFilters(data.data);
        let options = []
        data?.data?.services?.map((item)=>{
      
          options.push(item?.slug)
        })
        localStorage.setItem('locations',options);

        let locations = []
        data?.data?.locations?.map((item)=>{
      
          locations.push(item?.slug)
        })
        localStorage.setItem('locations',locations);
      
        }
    }catch (error) {
        console.error('Error fetching filters:', error);
    } finally {
        // setLoading(false);
    }
  }
  if(!filters){

    fetchFilters();
  }
  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
   
    {
      title:
        router?.query?.slug == "therapists"
          ? "Therapists"
          : router?.query?.slug == "female-therapist"
          ? "Female Therapist"
          : router?.query?.slug == "agencies"
          ? "Agencies"
          : "",
    },
  ];
 
  return (
    <div>
      <Navbar />
      
      <Head>
      <title> {router?.query?.slug == "therapists"
                ? "Male Massage"
                : router?.query?.slug == "female-therapist"
                ? "Female Therapist"
                : router?.query?.slug == "agencies"
                ? "Agencies":""} in London</title>
      </Head>
      {router?.query?.slug == "therapists" || router?.query?.slug == "female-therapist" || router?.query?.slug == "agencies" ? 
          <>
            <ListingHeader breadcrumb={breadcrumb} type={ router?.query?.slug == "therapists"
                ? "Therapists"
                : router?.query?.slug == "female-therapist"
                ? "Female Therapist"
                : router?.query?.slug == "agencies"
                ? "Agencies":""} />
            <ListingList record_type={ router?.query?.slug == "therapists"
                ? "Therapists"
                : router?.query?.slug == "female-therapist"
                ? "Female Therapist"
                : router?.query?.slug == "agencies"
                ? "Agencies":""}  filters={filters} />
          </>
          :
         
        <PageNotFound></PageNotFound>

      }
     
      <Footer />
    </div>
  );
}

export default withAuth(ListingPage, {
  requireAuth: false,
  publicAccess: true,
});
