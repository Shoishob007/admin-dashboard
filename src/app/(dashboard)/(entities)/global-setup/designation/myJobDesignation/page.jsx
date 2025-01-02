import React from "react";
import JobDesignationTable from "../components/JobDesignationTable.jsx";
import { Skeleton } from "@/components/ui/skeleton";

const MyJobDesignation = ({designations, isLoading, error}) => {
  
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!designations || designations.length === 0) {
    return <div>No designation is available</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading job-designation: {error}</div>
    );
  }
  return (
    <div className="p-4">
      <JobDesignationTable designations={designations} />
    </div>
  );
};

export default MyJobDesignation;
