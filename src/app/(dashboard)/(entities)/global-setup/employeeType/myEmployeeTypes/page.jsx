import React from "react";
import EmployeeTypesTable from "../components/EmployeeTypesTable.jsx";
import { Skeleton } from "@/components/ui/skeleton";

const MyEmployeeTypes = ({employeeTypes, isLoading, error, accessToken}) => {
  
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!employeeTypes || employeeTypes.length === 0) {
    return <div>No job-role is available</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading employee-types: {error}</div>
    );
  }
  return (
    <div className="p-4">
      <EmployeeTypesTable employeeTypes={employeeTypes} accessToken={accessToken}/>
    </div>
  );
};

export default MyEmployeeTypes;
