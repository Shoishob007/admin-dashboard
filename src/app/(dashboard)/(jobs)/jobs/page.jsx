"use client"

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  const accessToken = session?.access_token;

  useEffect(() => {
    const fetchJobs = async () => {
      if (status !== "authenticated" || !session?.access_token) {
        return;
      }

      try {
        console.log(accessToken)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs?page=1&limit=50`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
        
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
  
        const result = await response.json();
        console.log(result.docs);
        setJobs(result.docs || []);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        setIsLoading(false);
      }
    };
  
    fetchJobs();
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

  if (!jobs || jobs.length === 0) {
  return <div>No jobs available</div>;
}


  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading jobs: {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Applicants</h1>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="font-semibold">{job.organization.orgName}</h2>
            <p className="text-gray-600">{job.organization.orgEmail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
