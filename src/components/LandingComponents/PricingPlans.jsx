import React, {useEffect,useState} from "react";
import paypalLogo from "../../assets/images/paypal_logo.png";
import Image from "next/image";
import { capitalizeFirstLetter } from '../../helpers/helper';
import subscriptionService from '../../services/subscriptionService';

function PricingPlans() {
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
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

    fetchSubscriptionPlans();
  } , [] )

  return (
    <div className="flex justify-center bg-[#FCFCFD]">
      <div className="max-w-[1440px] w-full">
        <div
          className={`py-[16px] px-[24px] md:py-[56px] md:px-[64px] flex flex-col gap-[30px] md:gap-10`}
        >
          <div className="w-full flex flex-col gap-3 md:gap-6">
            <div className="fs-48-400-lato lh-57 txt-color-red text-left text-center md:text-center">
              Pricing Plans
            </div>
           
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 gap-y-10 md:gap-y-[32px]">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 md:p-8 shadow-[0px_20px_40px_0px_#0000001A] border-2 border-[#F2F4F7] rounded-lg"
              >
                <div className="flex flex-col gap-y-6 md:gap-y-8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="fs-24-400-lato txt-color-red">
                      {capitalizeFirstLetter(item.title)} 
                    </div>
                    <div className="fs-56-400-lato txt-color-black">
                      £{item.price}<span className="fs-32-400-lato">/mo</span>
                    </div>
                  </div>
                  <div className="hr-line"></div>
                  <div className="pt-3 flex flex-col gap-4 pb-4 sm:pb-0 border-b-2 border-[#F2F4F7] h-fit md:min-h-[312px]">

                    { item?.properties.map((property, index2)=>(
                    
                      <div className="flex gap-4"   key={index2}>
                        <svg
                          width="24"
                          height="25"
                          viewBox="0 0 24 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.8606 6.29313C22.2875 7.39772 21.6888 8.15397 20.5301 8.89891C19.5951 9.49997 18.4039 10.1511 17.1417 11.2644C15.9044 12.3557 14.6968 13.6701 13.6237 14.9639C12.5549 16.2524 11.6465 17.4874 11.0046 18.4019C10.5898 18.9928 10.011 19.8743 10.011 19.8743C9.60281 20.5201 8.86895 20.911 8.08206 20.9012C7.295 20.8914 6.57208 20.4826 6.18156 19.8265C5.18328 18.1494 4.41296 17.4871 4.05891 17.2492C3.11158 16.6126 2 16.5185 2 15.0349C2 13.8568 2.99489 12.9017 4.22216 12.9017C5.08862 12.9337 5.89398 13.2744 6.60756 13.754C7.06369 14.0605 7.54689 14.4659 8.04948 14.9995C8.63934 14.195 9.35016 13.2667 10.147 12.3061C11.3042 10.9111 12.6701 9.41446 14.1349 8.12253C15.5748 6.85252 17.2396 5.66372 19.0042 5.03518C20.1549 4.62534 21.4337 5.18855 21.8606 6.29313Z"
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
                    ))}

                  </div>
                  <div className="py-1 flex justify-center">
                    <Image src={paypalLogo} alt="paypal" />
                  </div>
                  <button className="btn sec-btn py-3 px-6 min-h-[48px] fs-16-700-lato text-white w-full">
                    GET LISTED
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPlans;
