import { Select } from "antd";
import React from "react";

function SelectBox({ defaultValue, options, handleChange,mode=null }) {
  return (
    <div>
      <Select
        mode={mode}
        
        className="w-full border border-[#5B8581] rounded-lg h-[48px] hover:border-[#78B6B6] ant-select-box"
        value={defaultValue}
        
        style={{}}
        onChange={handleChange}
        options={options}
        suffixIcon={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.3977 15.203C12.178 15.4226 11.8219 15.4226 11.6022 15.203L5.86739 9.46808C5.64772 9.24841 5.64772 8.89231 5.86739 8.67263L6.13256 8.40743C6.35222 8.18776 6.70838 8.18776 6.92805 8.40743L12 13.4794L17.0719 8.40743C17.2916 8.18776 17.6477 8.18776 17.8674 8.40743L18.1326 8.67263C18.3522 8.89231 18.3522 9.24841 18.1326 9.46808L12.3977 15.203Z"
              fill="#5B8581"
            />
            <defs>
              <linearGradient
                id="paint0_linear_51_1703"
                x1="17.9771"
                y1="11.8052"
                x2="5.70264"
                y2="11.8052"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#B07B59" />
                <stop offset="1" stopColor="#C2A891" />
              </linearGradient>
            </defs>
          </svg>
        }
      />
    </div>
  );
}

export default SelectBox;
