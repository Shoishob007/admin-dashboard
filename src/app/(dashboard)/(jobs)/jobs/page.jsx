"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House} from "lucide-react";
import { JobFilters } from "../../components/filters/JobFilters";
import UserTable from "../../(users)/all-users/components/UserTable";
import JobSheet from "../../(users)/all-users/components/JobSheet";


export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJobDetails, setSelectedJobDetails] =
  useState(null);
const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { data: session, status } = useSession();
  const [filters, setFilters] = useState({
    searchQuery: "",
    status: "all",
    jobRole: "all",
    experienceRange: "all",
    sortBy: "latest",
  });

  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleReset = () => {
    setFilters({
      searchQuery: "",
      status: "all",
      jobRole: "all",
      experienceRange: "all",
      sortBy: "latest",
    });
  };

  useEffect(() => {
    const fetchJobs = async () => {
      if (status !== "authenticated" || !session?.access_token) {
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-details?page=1&limit=6000`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        setJobs(result.docs || []);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [status, session?.access_token]);

  // unique job roles for the filter
  const getJobRoles = () => {
    const roles = new Set();
    jobs.forEach((job) => {
      if (job.jobRole?.[0]?.title) {
        roles.add(job.jobRole[0].title);
      }
    });
    return Array.from(roles);
  };

  const handleRowClick = async (user) => {
    console.log(user)
    try {
      const endpoint = "/api/job-details?page=1&limit=5000";

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data ::", data)
      const document = data.docs.find((doc) => doc.id === user.id);

      console.log("document :", document)

      if (!document) {
        console.error("Document not found");
        return;
      }

      const detailedEndpoint = `/api/job-details/${document.id}`;

      console.log("Detailed Endpoint ::" , detailedEndpoint)

      const detailsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${detailedEndpoint}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!detailsResponse.ok) {
        throw new Error(`HTTP error! status: ${detailsResponse.status}`);
      }

      const detailsData = await detailsResponse.json();
      setSelectedJobDetails(detailsData);
      setIsSheetOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };


  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return <div>No jobs available</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading jobs: {error}</div>;
  }

  console.log("Selected job details :", selectedJobDetails)

  return (
    <div className="rounded-lg">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4">
        <Breadcrumb className="min-w-24 mt-4 sm:mt-0">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <House className="w-4 h-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/jobs">All Jobs</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <JobFilters
          jobs={jobs}
          filters={filters}
          onFilterChange={handleFilterChange}
          getJobRoles={getJobRoles}
          onReset={handleReset}
        />
      </header>

      <UserTable
        users={jobs}
        filters={filters}
        currentPaginationPage={currentPaginationPage}
        setCurrentPaginationPage={setCurrentPaginationPage}
        handleRowClick={handleRowClick}
        isJobTable={true}
      />

      {/* Sheet for Job Details */}
      <JobSheet
        selectedJobDetails={selectedJobDetails}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
    </div>
  );
}
