import React from "react";
import JobRoleTable from "../components/JobRoleTable.jsx";
import { Skeleton } from "@/components/ui/skeleton";

const MyJobRoles = ({jobRoles, isLoading, error, accessToken}) => {

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!jobRoles || jobRoles.length === 0) {
    return <div>No job-role is available</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading job-roles: {error}</div>
    );
  }
  return (
    <div className="p-4">
      <JobRoleTable jobRoles={jobRoles} accessToken={accessToken}/>
    </div>
  );
};

export default MyJobRoles;
