"use client";
import React, { useEffect, useState } from "react";
import JobTypeTable from "../components/JobTypeTable.jsx";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

const myJobTypes = ({jobTypes, isLoading, error, accessToken}) => {

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!jobTypes || jobTypes.length === 0) {
    return <div>No job type is available</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading job-types: {error}</div>
    );
  }
  return (
    <div className="p-4">
      <JobTypeTable jobTypes={jobTypes} accessToken={accessToken} />
    </div>
  );
};

export default myJobTypes;
