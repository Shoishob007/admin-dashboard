"use client";
import React, { useEffect, useState } from "react";
import FieldOfStudyTable from "../components/FieldOfStudyTable.jsx";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

const MyFieldOfStudy = () => {
  const [fieldOfStudy, setFieldOfStudy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const accessToken = session?.access_token;

  useEffect(() => {
    const fetchFieldOfStudy = async () => {
      if (status !== "authenticated" || !session?.access_token) {
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/field-of-studies`,
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
        setFieldOfStudy(result.docs || []);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        setIsLoading(false);
      }
    };

    fetchFieldOfStudy();
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
      <FieldOfStudyTable fieldOfStudy={fieldOfStudy} />
    </div>
  );
};

export default MyFieldOfStudy;
