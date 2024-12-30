"use client"

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useSession } from 'next-auth/react';

export default function AllApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  const accessToken = session?.access_token;

  useEffect(() => {
    const fetchApplicants = async () => {
      if (status !== "authenticated" || !session?.access_token) {
        return;
      }

      try {
        console.log(accessToken)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/applicants?page=1&limit=50`, {
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
        setApplicants(result.docs || []);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        setIsLoading(false);
      }
    };
  
    fetchApplicants();
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

  if (!applicants || applicants.length === 0) {
  return <div>No applicants available</div>;
}


  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading applicants: {error}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Applicants</h1>
      <div className="space-y-4">
        {applicants.map((applicant) => (
          <div
            key={applicant.id}
            className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="font-semibold">{applicant.firstName}</h2>
            <p className="text-gray-600">{applicant.applicant.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
