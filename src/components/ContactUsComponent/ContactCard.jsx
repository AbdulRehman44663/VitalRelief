import Link from "next/link";
import React,{useState,useEffect} from "react";

function ContactCard({ data ,setting}) {

  const [linkURL, setLinkURL] = useState(null);
   useEffect(()=>{
    if(data.label =='Email'){
      setLinkURL('mailto:'+setting?.email)
    }else if(data.label=='Whatsapp'){
      setLinkURL( `https://api.whatsapp.com/send?phone=${setting?.phone}&text=Hi%20there,%20I%20have%20a%20question%20and%20could%20use%20your%20assistance,%20please.`)
    }else if(data.label=='Phone'){
      setLinkURL( `tel:${setting?.phone}`)
    }
   });
  return (
    <div className="flex flex-col gap-6 p-5 rounded-lg border border-[#97B2A9]">
      {data?.icon}
      <div className="flex flex-col gap-4">
        <div className="fs-32-400-lato txt-color-darkgray">{data?.label}</div>
        <div className="fs-16-400-lato txt-color-gray700">{data?.label == 'Email' ? setting?.email  : setting?.phone}</div>
      </div>
      {linkURL ? 
        <Link
          target="blank"
          href={linkURL}
          className="py-3 px-5 rounded-lg bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_0px_#1018280D] fs-16-700-lato txt-color-gradient text-center"
        >
          {data?.btnText}
        </Link>
      : 
        <Link
          href={'/'}
          className="py-3 px-5 rounded-lg bg-white border border-[#D0D5DD] shadow-[0px_1px_2px_0px_#1018280D] fs-16-700-lato txt-color-gradient text-center"
        >
          {data?.btnText}
        </Link>
      }
      
    </div>
  );
}

export default ContactCard;
