import Navbar from '@/components/LandingComponents/Navbar';
import ListingHeader from '@/components/ListingComponents/ListingHeader';
import ListingListSearch from '@/components/ListingComponents/ListingListSearch';
import { capitalizeFirstLetter } from '@/helpers/helper';
import Footer from "@/components/LandingComponents/Footer";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import listingService from '@/services/listingService';
import Head from 'next/head';

function TagPage() {
  const[tagDetail, setTagDetail] = useState(null);
  const router = useRouter();
  const { tag } = router.query;

  var breadcrumb = [
    {
      title: 'Home',
      href: '/',
    },
    {
      title: (capitalizeFirstLetter(tag))+ ' tag ' ,
    },
  ];

  const fetchTagDetail  = async ()=>{
    try {
    
      let filterCriteria = { tag_url:tag}; // Merge existing filter with category and status
      let data = await listingService.getTagByURL(filterCriteria);
      if (data) {
        setTagDetail(data.data);
        breadcrumb = [
          {
            title: 'Home',
            href: '/',
          },
          {
            title:data?.data?.name ,
          },
        ];
      }
    
    } catch (error) {
      console.error('Error fetching listing:', error);
    } finally {
    }
  }

  useEffect(()=>{
    fetchTagDetail();
  },[tag])

  return (
    <div>
      {tagDetail ? 
       <Head>
          <title>{tagDetail?.page_title ? tagDetail?.page_title:tagDetail.name}</title>
          {tagDetail?.description &&  tagDetail?.description!='null'? 
              <meta name="description" content={tagDetail?.description} />
            :<></>}
            {tagDetail?.keywords &&  tagDetail?.keywords!='null'? 
              <meta name="keywords" content={tagDetail?.keywords} />
            :<></>}
            {tagDetail?.canonical_url &&  tagDetail?.canonical_url!='null'? 
              <link rel="canonical" href={tagDetail?.canonical_url} />
            :<></>}
        </Head>
      :""}
      <Navbar />
      {tagDetail ? 
        <>
         
          <ListingHeader breadcrumb={breadcrumb} type={'Search'} title={tagDetail?.name} description={tagDetail?.html} />
          <ListingListSearch tagFilter={tag ? tag : ''} />
        </>
       
      :''}
     
      <Footer />
    </div>
  );
};

export default TagPage;