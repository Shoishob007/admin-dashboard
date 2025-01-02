"use client";
import React from "react";
import DegreeLevelTable from "../components/DegreeLevelTable.jsx";
import { Skeleton } from "@/components/ui/skeleton";

const MyDegreeLevels = ({degreeLevels, isLoading, error, accessToken}) => {

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!degreeLevels || degreeLevels.length === 0) {
    return <div>No degree-level is available</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading degree-levels: {error}</div>
    );
  }
  return (
    <div className="p-4">
      <DegreeLevelTable degreeLevels={degreeLevels} accessToken={accessToken} />
    </div>
  );
};

export default MyDegreeLevels;
