import React from "react";
import AcademicActivitiesTable from "../components/AcademicActivitiesTable.jsx";
import { Skeleton } from "@/components/ui/skeleton";

const AcademicActivities = ({activities, isLoading, error}) => {
  
  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return <div>No activity type is available</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading activity types: {error}</div>
    );
  }
  return (
    <div className="p-4">
      <AcademicActivitiesTable activities={activities} />
    </div>
  );
};

export default AcademicActivities;
