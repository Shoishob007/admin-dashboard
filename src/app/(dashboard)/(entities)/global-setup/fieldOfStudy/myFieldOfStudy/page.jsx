import React from "react";
import FieldOfStudyTable from "../components/FieldOfStudyTable.jsx";
import { Skeleton } from "@/components/ui/skeleton";

const MyFieldOfStudy = ({fieldOfStudy, isLoading, error, accessToken}) => {

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!fieldOfStudy || fieldOfStudy.length === 0) {
    return <div>No field of study is available</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading field of study: {error}</div>
    );
  }
  return (
    <div className="p-4">
      <FieldOfStudyTable fieldOfStudy={fieldOfStudy} accessToken={accessToken}/>
    </div>
  );
};

export default MyFieldOfStudy;
