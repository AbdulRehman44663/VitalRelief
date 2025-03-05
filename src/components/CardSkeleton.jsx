import React from "react";

const CardSkeleton = () => {
    return (
      <div className="elite_card flex flex-col group overflow-hidden shadow-lg transition animate-pulse">
        <div className="relative overflow-hidden bg-gray-300 h-[265px] w-full rounded-t-md"></div>
        <div className="p-3">
          <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center px-3 py-1 gap-2.5">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="flex items-center px-3 py-1 gap-2.5">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="flex items-center px-3 py-1 gap-2.5">
              <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>
          <div className="px-3 py-2">
            <div className="h-12 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CardSkeleton;
  