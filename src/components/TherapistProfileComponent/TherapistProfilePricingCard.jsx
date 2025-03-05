import React from "react";

function TherapistProfilePricingCard() {
  return (
    <div className="flex flex-col gap-5 py-8 px-6 border border-[#97B2A9] rounded-lg hidden">
      <div className="fs-24-400-lato txt-color-darkgray">Pricing</div>
      <div className="border border-[#97B2A9]"></div>
      <div className="fs-18-400-lato txt-color-gray1000">
        My Prices depends upon the service but here is general pricing details.
      </div>
      <div className="flex item-center gap-5">
        <div className="fs-18-400-lato txt-color-gray1000">Starting Price:</div>
        <div className="fs-18-700-lato txt-color-gray700">$60/hour</div>
      </div>
      <div className="flex item-center gap-5">
        <div className="fs-18-400-lato txt-color-gray1000">Max Price:</div>
        <div className="fs-18-700-lato txt-color-gray700">$120/hour</div>
      </div>
    </div>
  );
}

export default TherapistProfilePricingCard;
