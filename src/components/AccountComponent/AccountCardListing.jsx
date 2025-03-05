import Image from "next/image";
import React from "react";
import { IMAGES_PATH,LISTING_IMAGES_PATH } from "@/config/constants";
import { formatBlogDate } from "@/helpers/helper";
import { useRouter } from "next/router";
function AccountCardListing({ data }) {

  const router = useRouter();
  return (
    <div
      className="p-3 border border-[#F2F4F7] bg-white shadow-[0px_20px_40px_0px_#0000001A] rounded-md my-0 sm:my-2.5"
      key={data?.id}
    >
      {data?.profile_image && data?.profile_image.length>0? 
        <Image
          className="h-[200px] w-full rounded-md object-cover"
          src={IMAGES_PATH+'/'+data?.profile_image[0]?.file }
          width={100}
          height={100}
          alt={data?.title}
        />
        : (
        <div className="flex items-center justify-center h-[200px] bg-[#F2F4F7] rounded-md">
          <div className="fs-16-400-lato txt-color-gray600">
            No Image uploaded
          </div>
        </div>
      )}
      <div className="py-3">
        <div className="fs-18-700-lato text-black line-clamp-1">
          {data?.title}
        </div>
      </div>
      
      {data?.is_draft == 'YES' && !data.subscription_level ? 
        <div className="py-1 flex items-center justify-between">
          <div className="fs-12-500-lato txt-color-gray1000">{formatBlogDate(data?.created_at)}</div>
          <div className="fs-14-500-lato txt-color-gray1000">Draft</div>
        </div>
      : 
        <div className="py-1 flex items-center justify-between">
          <div className="fs-12-500-lato txt-color-gray1000">{formatBlogDate(data?.created_at)}</div>
          
          <div className="fs-14-500-lato txt-color-gray1000">
            
            {data?.status =='Active' ? 'Published' : data.status}
          </div>
        </div>
      }
      
      <div className="py-2">
        <button onClick={()=>{router.push('/account/listing/'+data.id)}} className="py-2 px-6 rounded-md border border-[#D0D5DD] flex items-center justify-center fs-16-700-lato txt-color-darkgray w-full">
          MANAGE
        </button>
      </div>
    </div>
  );
}

export default AccountCardListing;
