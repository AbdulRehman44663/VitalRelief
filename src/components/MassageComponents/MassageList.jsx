import React,{useEffect,useState} from "react";
import elite1 from "../../assets/models/elite-1.png";
import elite2 from "../../assets/models/elite-2.jpg";
import Card from "../ListingCard/Card";

import listingService from '../../services/listingService';
import { useRouter } from "next/router";
import Head from "next/head";

function MassageList({ title,massage, topIcon ,type}) {
  
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState([]);

  const router = useRouter();
  const eliteItems = [];
  const fetchListings = async (filter) => {
    try {
     
      var data = null;
      var filter = {status:'Active',subscription_type:type,massage:massage.slug,limit:12}
      
      data = await listingService.list(filter);
     
      if(data){
        setItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  }
  useEffect( () =>{

    fetchListings();
  } , [] )
  return (
   
    <div
      className={`py-[16px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col gap-[30px] md:gap-10 bg-[#FCFCFD]`}
    >
      
      {items && items.length>0? 
      <>
        <div className="flex justify-start md:justify-center">
          <div className="fs-48-400-lato txt-color-darkgray text-left md:text-center w-full md:w-7/12 ">
            {title}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-x-4 gap-y-10 md:gap-y-[32px]">
          {items?.map((item, index) => (
            <Card item={item} key={index} topIcon={topIcon} />
          ))}
        </div>
      </>
      :<></>}
      
    </div>
  );
}

export default MassageList;
