import React from "react";
import BreadcrumbComp from "../Breadcrumb";
import { contact_us_details } from "@/utils/data";
import ContactCard from "./ContactCard";
import { Button, Checkbox, Form, Input, InputNumber } from "antd";
import contactUsImg from "../../assets/images/contact-us.jpg";
import Image from "next/image";
import Link from "next/link";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

function ContactUs({setting}) {
  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Contact us",
    },
  ];
  const onFinish = () => {};
  return (
    <div className="flex justify-center bg-[#FCFCFD]">
      <div className="max-w-[1440px] w-full">
        <div
          className={`py-[36px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col items-start md:items-center gap-[30px] md:gap-10`}
        >
          <BreadcrumbComp items={breadcrumb} />
          <div className="hidden md:flex flex-col gap-6 text-center">
            <div className="fs-48-400-lato txt-color-darkgray">Contact us</div>
            <div className="fs-16-400-lato txt-color-gray600">
              Our friendly team would love to hear from you.
            </div>
          </div>
         
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
            {contact_us_details?.map((item, index) => (
              <ContactCard data={item} setting={setting} key={index} />
            ))}
          </div>
       
        
          <div className="block md:hidden border-t border-[#F2F4F7]"></div>
          <div className="grid md:hidden grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
            {contact_us_details?.map((item, index) => (
              <ContactCard data={item} setting={setting} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
