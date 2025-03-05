import Navbar from '@/components/LandingComponents/Navbar';
import Footer from '@/components/LandingComponents/Footer';
import ListingListSearch from '@/components/ListingComponents/ListingListSearch';
import ListingHeader from '@/components/ListingComponents/ListingHeader';
import listingService from "@/services/listingService";
import { useRouter } from 'next/router';
import React,{ useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '@/helpers/helper';
import Head from 'next/head';

const SearchPage = () => {
    const router = useRouter();
    const { slug } = router.query;
    const [filters, setFilters] =useState(null);

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
    if (!slug) {
        return <div>Loading...</div>;
    }

    // Destructure slug parts
    const [firstPart, secondPart] = slug;
  

    let title = null;
    let category = null;
    let distance = null;
    let location = null;
    let service = null;
    let tag = null;
    let locations = localStorage.getItem('locations');
    if(locations){
        locations = locations.split(',');
    }
    let services = localStorage.getItem('services');
    if(services){
        services = services.split(',');
    }
   
    // Logic to handle different cases based on slug length
    if (firstPart === 'female-therapist' || firstPart === 'therapists' || firstPart === 'agency') {
        category = firstPart;
    }
    if (firstPart === '1km' || firstPart === '1km' || firstPart === '3km' || firstPart === '4km' || firstPart === '5km' || firstPart === '6km' || firstPart === '7km') {
        distance = firstPart;
        if (services?.includes(secondPart)) {
            service = secondPart;
        }else{
            tag =secondPart;
        }
    } else if (secondPart) {
       
        location = firstPart !=='1km' && firstPart !=='2km' && firstPart !=='3km' && firstPart !=='4km' &&  firstPart !=='5km' && firstPart !=='6km' && firstPart !=='7km' && locations.includes(firstPart) ? firstPart:null;
      
        if (services?.includes(secondPart)) {
            service = secondPart;
        }else{
            tag =secondPart;
        }
    } else if (firstPart) {
       
        if (locations?.includes(firstPart)) {
            location = firstPart;
        } else {
            
            if (services?.includes(firstPart)) {
                service = firstPart;
            }else{
                if(!category){

                    tag =firstPart;
                }
            }
        
        }
    }

    
    const getTitle = () =>{
        let customTitle = '';
        if(category){
            customTitle += capitalizeFirstLetter(category)?.toString()?.replace('-',' ');
            if(location){
                customTitle +=' in '+ capitalizeFirstLetter(location)?.toString()?.replace('-','');

            }
            if(distance){
                customTitle +=' Near within  '+ capitalizeFirstLetter(distance)?.toString()+" radius";

            }
        }
        if(service){
            customTitle += capitalizeFirstLetter(service)?.toString()?.replace('-',' ');
            if(location){
                customTitle +=' in '+ capitalizeFirstLetter(location)?.toString()?.replace('-','');

            }else if(distance){
                customTitle +=' Near within  '+ capitalizeFirstLetter(distance)?.toString()+" radius";

            }else{
                customTitle+=' therapists';
            }
        }
        if(!category && !service && ( distance || location)){
            if(distance && !location){
                customTitle +='Massage Therapists within  '+ capitalizeFirstLetter(distance)?.toString()+"";
            }

            if(!distance && location){
                customTitle +='Massage Therapists in  '+ capitalizeFirstLetter(location)?.toString()?.replace('-','');
            }
        }

        if(customTitle){
            title = customTitle;
        }
        
    }
    getTitle();

    if(distance){
        distance = parseInt(distance.toString().replace('km','').replace('KM',''))
    }

    const breadcrumb = [
        {
          title: "Home",
          href: "/",
        },
        {
          title: "Search"
        }
      
      ];
      return (
        <div>
          <Navbar />
          {/* <h1>Search Results</h1>
            <p>Category: {category || 'Any'}</p>
            <p>Distance: {distance || 'Any'}</p>
            <p>Location: {location || 'Any'}</p>
            <p>Service: {service || 'Any'}</p>
            <p>Tag: {tag || 'Any'}</p> */}
            {/* Add logic to render search results based on the parameters */}
            <Head>
            <title> {'Search Listing Near Me - Vital Relief '}</title>
            </Head>
          <ListingHeader breadcrumb={breadcrumb} type={'Search'} title={title}/>
          <ListingListSearch record_type={category ? category:''} radiusFilter={distance} locationFilter={location} serviceFilter={service} tagFilter={tag} filters={filters}/>
          <Footer />
        </div>
      );
   
};

export default SearchPage;