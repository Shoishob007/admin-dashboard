"use client";
import React, { useEffect, useState } from "react";
import SkillTable from "../components/SkillTable";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

const MySkills = () => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const accessToken = session?.access_token;

  useEffect(() => {
    const fetchSkills = async () => {
      if (status !== "authenticated" || !session?.access_token) {
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/skills`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        setSkills(result.docs || []);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        setIsLoading(false);
      }
    };

    fetchSkills();
  }, [status, session?.access_token]);

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
      <SkillTable skills={skills} />
    </div>
  );
};

export default MySkills;