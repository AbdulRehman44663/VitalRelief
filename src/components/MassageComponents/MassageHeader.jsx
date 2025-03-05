import React from "react";
import BreadcrumbComp from "../Breadcrumb";
import Head from "next/head";

function MassageHeader({ breadcrumb,massage }) {
  return (
    <div className="flex justify-center bg-[#FCFCFD]">
     
      <div className="max-w-[1440px] w-full">
        <div
          className={`py-[16px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col items-start md:items-center gap-[30px] md:gap-[40px]`}
        >
          <BreadcrumbComp items={breadcrumb} />
         
          <div className="flex flex-col items-start md:items-center gap-4">
            {massage  ? 
            <>
              <div className="fs-48-400-lato txt-color-darkgray">
                {massage.title}
              </div>
              <div className="fs-18-400-lato txt-color-gray700 text-left md:text-center md:w-3/5">
              
                <div dangerouslySetInnerHTML={{ __html: massage.description }} />
              </div>
            </>
            
            :<></>}
            
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default MassageHeader;
