import React from "react";

const SkeletonLoader = () => {
    return (
        <div className="animate-pulse">
          <div className="bg-gray-200 rounded-lg h-[200px] w-full"></div>
          <div className="mt-4">
            <div className="bg-gray-200 h-6 w-3/4 rounded"></div>
            <div className="bg-gray-200 h-4 w-1/2 mt-2 rounded"></div>
            <div className="bg-gray-200 h-4 w-full mt-2 rounded"></div>
            <div className="bg-gray-200 h-4 w-2/3 mt-2 rounded"></div>
          </div>
        </div>
      );
};

export default SkeletonLoader;
