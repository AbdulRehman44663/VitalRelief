import { Breadcrumb } from "antd";
import React from "react";

function BreadcrumbComp({ items }) {
  return (
    <div>
      <Breadcrumb
        className="flex items-center fs-18-400-lato txt-color-gray500 hover:bg-transparent"
        separator={
          <svg
            width="7"
            height="13"
            viewBox="0 0 7 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1.5L6 6.5L1 11.5"
              stroke="#98A2B3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        items={items ? items : []}
      />
    </div>
  );
}

export default BreadcrumbComp;
