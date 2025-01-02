import React from "react";
import SkillTable from "../components/SkillTable";
import { Skeleton } from "@/components/ui/skeleton";

const MySkills = ({skills, isLoading, error, accessToken}) => {

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!skills || skills.length === 0) {
    return <div>No skills available</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading skills: {error}</div>
    );
  }
  return (
    <div className="p-4">
      <SkillTable skills={skills} accessToken={accessToken} />
    </div>
  );
};

export default MySkills;
