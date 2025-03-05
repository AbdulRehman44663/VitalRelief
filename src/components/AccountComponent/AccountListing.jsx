import React, { useEffect,useState } from "react";
import listingImg from "../../assets/models/listing-img.jpg";
import AccountCardListing from "./AccountCardListing";
import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Form, Input, InputNumber } from "antd";
import Link from "next/link";
import Head from "next/head";
import CardSkeleton from "../CardSkeleton";


dayjs.extend(customParseFormat);

const monthFormat = "YYYY/MM";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const listingData = [
  { id: 1, img: null },
  { id: 2, img: listingImg },
  { id: 3, img: null },
  { id: 4, img: listingImg },
  { id: 1, img: null },
  { id: 2, img: listingImg },
  { id: 3, img: null },
  { id: 4, img: listingImg },
];

function AccountListing({ loading, myListings, setSelectedTab }) {

    const [skeletonCount, setSkeletonCount] = useState(1)
    useEffect(() =>{
      const updateSkeletonCount = () => {
        if (window.innerWidth >= 1024) {
          setSkeletonCount(4); 
        } else {
          setSkeletonCount(1); 
        }
      };
  
      updateSkeletonCount();
  
      window.addEventListener('resize', updateSkeletonCount);
  
      return () => {
        window.removeEventListener('resize', updateSkeletonCount);
      };
    }, loading)
  return (
    <div className="flex flex-col gap-10 md:gap-5">
      <Head>
        <title> {'My Listings - Vital Relief '}</title>
      </Head>
      <div className="flex flex-col gap-1 border-b border-[#F2F4F7] pb-5 md:border-0 md:pb-0">
        <div className="flex  justify-between">
          <div className="fs-20-700-lato txt-color-darkgray">My Listings</div>
          <div className=" pt-4   mb-10 md:mb-0">
            <Button
              onClick={() => { setSelectedTab(0) }}
              type="button"
              className="h-[41px] fs-14-700-lato txt-color-gray700 py-2.5 px-4 rounded-lg bg-white border border-[#97B2A9] shadow-[0px_1px_2px_0px_#1018280D] w-full md:w-auto"
              htmlType="button"
            >
              BACK
            </Button>
          </div>
        </div>

        {myListings && myListings?.length > 0 ?
          <div className="fs-16-400-lato txt-color-gray1000">
            Manage your all listings here.
          </div>
          : <></>}

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: skeletonCount }).map((_, index) => (
            <CardSkeleton key={index} />
          ))
        ) : myListings && myListings.length > 0 ? (
          myListings.map((item, index) => (
            <AccountCardListing key={index} data={item} />
          ))
        ) : (
          <div className="fs-16-700-lato txt-color-darkgray">
            No Listing found
          </div>
        )}
      </div>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {myListings && myListings?.length>0 ? 
         myListings?.map((item, index) => (
          <AccountCardListing key={index} data={item} />
        ))
        :
        <>
         <div className="fs-16-700-lato txt-color-darkgray">
          No Listing found
        </div>
        </>}
       
      </div> */}

    </div>
  );
}

export default AccountListing;
