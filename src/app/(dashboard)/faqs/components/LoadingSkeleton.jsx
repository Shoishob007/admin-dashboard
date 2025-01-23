import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

export default LoadingSkeleton;
