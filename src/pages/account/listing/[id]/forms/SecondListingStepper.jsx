import React ,{useState,useEffect,useRef } from "react";
import { Form, Input, InputNumber } from "antd";
import Image from "next/image";
import BreadcrumbComp from "@/components/Breadcrumb";
import paypalLogo from "../../../../../assets/icons/paypal_logo.png";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useRouter } from "next/router";
import useStore from "@/store";
import subscriptionService from "@/services/subscriptionService";
import {capitalizeFirstLetter } from "@/helpers/helper";
import { API_DOMAIN, BUSINESS_EMAIL, SITE_URL,PAYPAL_MODE } from "@/config/constants";
dayjs.extend(customParseFormat);

const monthFormat = "YYYY/MM";

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

function SecondListingStepper({ moveForward }) {
  const [loading,setLoading] = useState(false);
  const formRefs = useRef([]);
  const [items, setItems] = useState([]);
  const router = useRouter();
  var user = useStore((state) => state.user);
  var {id}= router.query;
  
  
  const breadcrumb = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Account",
      href: "/",
    },
    {
      title: "Create Listing",
    },
  ];

   // Function to handle form submission
  const handleSubmit = (index) => {
    formRefs.current[index].submit();
  };


  const fetchSubscriptionPlans = async (filter) => {
    try {
     
      var data = null;
      var filter = {type:'Home'}
      
      data = await subscriptionService.list(filter);
     
      if(data){
        setItems(data.data);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect( () =>{
    if(!id){
      id = localStorage.getItem('toPayId') ?  localStorage.getItem('toPayId'):null;
      
      if(!id){
        router.push('/account/listing/draft')
      }
    }
    fetchSubscriptionPlans();
  } , [id] )

  
  return (
    <div className="flex justify-center bg-[#FCFCFD] sm:bg-white shadow-[2px_4px_8px_0px_#0000001A]">
      <div className="max-w-[1440px] w-full">
        <div className="px-6 py-8 md:p-16">
          <div className="flex flex-col gap-[60px] md:gap-10">
            <div className="flex flex-col gap-6 pt-10 md:pt-0">
              <div className="block md:hidden">
                <BreadcrumbComp items={breadcrumb} />
              </div>
              <button
                onClick={() => moveForward(1)}
                className="py-[10px] px-4 rounded-lg gap-2 bg-white flex items-center border border-[#97B2A9] shadow-[0px_1px_2px_0px_#1018280D] w-[102px]"
              >
                 <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12H20"
                    stroke="#33443C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.99996 17C8.99996 17 4.00001 13.3176 4 12C3.99999 10.6824 9 7 9 7"
                    stroke="#33443C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="fs-14-700-lato txt-color-gray700">BACK</div>
              </button>
            </div>

            <div className="flex flex-col gap-10 md:gap-11">
              <div className="px-0 md:px-8 flex flex-col gap-6">
                <div className="pb-5 flex justify-between gap-4 border-b border-[#F2F4F7]">
                  <div className="flex flex-col gap-1">
                    <div className="fs-20-700-lato txt-color-darkgray">
                      Select Subscription Plan
                    </div>
                    <div className="fs-16-400-lato txt-color-gray1000">
                      Select any of below subscription plans to publish listings
                    </div>
                  </div>
                  <div className="hidden md:flex gap-3">
                    {/* <button className="h-[41px] fs-14-700-lato text-white py-[10px] px-4 rounded-lg bg-[#2F464B] border border-[#2F464B] shadow-[0px_1px_2px_0px_#1018280D]">
                      PUBLISH LISTING
                    </button> */}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 md:gap-8">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 md:p-8 flex flex-col gap-6 md:gap-8 bg-white border-2 border-[#F2F4F7] rounded-lg shadow-[0px_20px_40px_0px_#0000001A]"
                  >
                    <div className="flex flex-col gap-2 items-center">
                      <div className="fs-24-400-lato txt-color-darkgray">
                          {capitalizeFirstLetter(item.title)} 
                      </div>
                      <div className="fs-56-400-lato text-black">
                          £{item.price}<span className="fs-32-400-lato">/mo</span>
                      </div>
                    </div>
                    <div className="border border-[#F2F4F7]"></div>
                    <div className="py-2 border-b-2 border-[#F2F4F7] min-h-auto md:min-h-[312px]">
                      { item?.properties.map((property, index2)=>(
                        <>
                        <div className="flex items-center gap-4">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M21.8606 5.39176C22.2875 6.49635 21.6888 7.2526 20.5301 7.99754C19.5951 8.5986 18.4039 9.24975 17.1417 10.363C15.9044 11.4543 14.6968 12.7687 13.6237 14.0625C12.5549 15.351 11.6465 16.586 11.0046 17.5005C10.5898 18.0914 10.011 18.9729 10.011 18.9729C9.60281 19.6187 8.86895 20.0096 8.08206 19.9998C7.295 19.99 6.57208 19.5812 6.18156 18.9251C5.18328 17.248 4.41296 16.5857 4.05891 16.3478C3.11158 15.7112 2 15.6171 2 14.1335C2 12.9554 2.99489 12.0003 4.22216 12.0003C5.08862 12.0323 5.89398 12.373 6.60756 12.8526C7.06369 13.1591 7.54689 13.5645 8.04948 14.0981C8.63934 13.2936 9.35016 12.3653 10.147 11.4047C11.3042 10.0097 12.6701 8.51309 14.1349 7.22116C15.5748 5.95115 17.2396 4.76235 19.0042 4.13381C20.1549 3.72397 21.4337 4.28718 21.8606 5.39176Z"
                              stroke="#5B8581"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="fs-16-400-lato txt-color-gray700">
                            {property.property}
                          </div>
                        </div>
                        </>
                      ))}
                   
                    </div>
                    <div className="flex justify-center">
                      <Image src={paypalLogo} alt="paypal" className="" />
                    </div>
                    <form  ref={(el) => (formRefs.current[index] = el)} action={PAYPAL_MODE =='sandbox'? 'https://www.sandbox.paypal.com/cgi-bin/webscr':'https://www.paypal.com/cgi-bin/webscr'} method="post" target="_top" style={{ display:'none'}}>
                      <input type="hidden" name="cmd" value="_xclick-subscriptions" />
                      <input type="hidden" name="item_number" value={item.id} />
                      <input type="hidden" name="userid" value={user?.id} />
                      <input type="hidden" name="listing_id" value={id} />
                      <input type="hidden" name="business" value={BUSINESS_EMAIL} />
                      <input type="hidden" name="item_name" value={item.title} />
                      <input type="hidden" name="cancel_return" value={SITE_URL+`/account/listing/${id}?ss=Canceled`} />
                      <input type="hidden" name="notify_url" value={API_DOMAIN+`/paypal/notify?listing_id=${id}&userid=${user.id}`} />
                      <input type="hidden" name="return" value={API_DOMAIN+`/paypal/return/${id}?itemid=${item.id}&userid=${user?.id}`} />
                      <input type="hidden" name="rm" value="0"  />
                      <input type="image" src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online!"  />
                      <input type="hidden" name="currency_code" value="GBP" />
                      <input type="hidden" name="a3" value={item.price} /> {/*" Monthly subscription amount "*/}
                      <input type="hidden" name="p3" value="1" /> {/*" Number of months for subscription "*/}
                      <input type="hidden" name="t3" value="M" /> {/*" Subscription period (M for month) "*/}
                      <input type="hidden" name="src" value="1" /> {/*" Recurrent payments enabled "*/}
                      <input type="hidden" name="sra" value="1" /> {/*" Retry failed payments "*/}
                  </form>

                    <button onClick={() => handleSubmit(index)} className=" fs-14-700-lato text-white py-3 px-6 rounded-md sec-btn border border-[#78B6B6] shadow-[0px_1px_2px_0px_#1018280D]">
                      GET LISTED
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-center fs-20-700-lato txt-color-gray600 hidden">
                OR
              </div>
              <div className="flex flex-col gap-1 border-b border-[#F2F4F7] pb-5 md:pb-0 md:border-0 hidden">
                <div className="fs-20-700-lato txt-color-gray">
                  Enter Bank Details
                </div>
                <div className="fs-16-400-lato txt-color-gray600">
                  Supporting/ explanation text for bank payment
                </div>
              </div>
            </div>

            <div className="hidden">
              <Form
                className=""
                name="payment-form"
                onFinish={() => {}}
                layout="vertical"
                validateMessages={validateMessages}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 md:mb-6">
                  <Form.Item
                    name={["name"]}
                    label="Name on card"
                    className="payment-form-item mb-0"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    colon={false}
                  >
                    <Input
                      className="py-[10px] px-[14px] rounded-lg w-full shadow-[0px_1px_2px_0px_#1018280D] border border-[#EAECF0] "
                      placeholder="James bond"
                    />
                  </Form.Item>
                  <Form.Item
                    name={["card_number"]}
                    label="Card number"
                    className="payment-form-item mb-0"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    colon={false}
                  >
                    <InputNumber
                      prefix={
                        <svg
                          width="19"
                          height="12"
                          viewBox="0 0 19 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="mr-2"
                        >
                          <path
                            d="M12.0707 1.38904H6.93359V10.6084H12.0707V1.38904Z"
                            fill="#FF5F00"
                          />
                          <path
                            d="M7.25848 5.99866C7.25848 4.20692 8.09019 2.49662 9.49269 1.389C6.94862 -0.614495 3.26298 -0.174704 1.25708 2.3826C-0.748817 4.92362 -0.308497 8.60483 2.25188 10.6083C4.38825 12.286 7.37263 12.286 9.509 10.6083C8.09019 9.5007 7.25848 7.7904 7.25848 5.99866Z"
                            fill="#EB001B"
                          />
                          <path
                            d="M18.9991 5.99866C18.9991 9.24008 16.3735 11.8625 13.1282 11.8625C11.8073 11.8625 10.5352 11.4228 9.50781 10.6083C12.0519 8.60483 12.4922 4.92362 10.4863 2.36631C10.1928 2.00796 9.86659 1.6659 9.50781 1.389C12.0519 -0.614495 15.7538 -0.174704 17.7434 2.3826C18.5588 3.40878 18.9991 4.67929 18.9991 5.99866Z"
                            fill="#F79E1B"
                          />
                          <path
                            d="M18.4462 9.63099V9.43553H18.5277V9.40295H18.332V9.43553H18.4136V9.63099H18.4462ZM18.8213 9.63099V9.40295H18.756L18.6908 9.56584L18.6256 9.40295H18.5603V9.63099H18.6093V9.45182L18.6745 9.59842H18.7234L18.7887 9.45182V9.63099H18.8213Z"
                            fill="#F79E1B"
                          />
                        </svg>
                      }
                      className="py-[10px] px-[14px] rounded-lg w-full shadow-[0px_1px_2px_0px_#1018280D] border border-[#EAECF0] "
                      placeholder="Card number"
                    />
                  </Form.Item>
                  <Form.Item
                    name={["expiration"]}
                    label="Expiration"
                    className="payment-form-item mb-0"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    colon={false}
                  >
                    <DatePicker
                      defaultValue={dayjs("2024/11", monthFormat)}
                      format={monthFormat}
                      picker="month"
                      className="py-[10px] px-[14px] rounded-lg w-full shadow-[0px_1px_2px_0px_#1018280D] border border-[#EAECF0] "
                    />
                  </Form.Item>
                  <Form.Item
                    name={["cvv"]}
                    label="CVV"
                    className="payment-form-item mb-0"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    colon={false}
                  >
                    <InputNumber
                      className="py-[10px] px-[14px] rounded-lg w-full shadow-[0px_1px_2px_0px_#1018280D] border border-[#EAECF0] "
                      placeholder="456"
                    />
                  </Form.Item>
                </div>
                <div className="flex gap-4 mb-10 md:mb-0">
                  <button className=" fs-14-700-lato text-white flex items-center justify-center py-[10px] px-4 rounded-md bg-[#CE2029] border border-[#78B6B6] shadow-[0px_1px_2px_0px_#1018280D] w-full sm:w-[168px]">
                    CONFIRM PAYMENT
                  </button>
                  <button className="py-[10px] px-4 rounded-lg gap-2 bg-[#F2F4F7] flex items-center justify-center border border-[#EAECF0] shadow-[0px_1px_2px_0px_#1018280D] w-full sm:w-[87px]">
                    <div className="fs-14-700-lato txt-color-gray700">BACK</div>
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondListingStepper;
