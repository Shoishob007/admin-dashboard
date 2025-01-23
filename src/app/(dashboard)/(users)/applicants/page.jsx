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
import { House } from "lucide-react";
import UserTable from "../all-users/components/UserTable";
import UserSheet from "../all-users/components/UserSheet";
import { AppFilterSheet } from "../../components/filters/JobFilterSheet";

export default function AllApplicants() {
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedApplicantDetails, setSelectedApplicantDetails] =
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
    const fetchApplicants = async () => {
      if (status !== "authenticated" || !session?.access_token) {
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/applicants?page=1&limit=5000`,
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
        setApplicants(result.docs || []);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        setIsLoading(false);
      }
    };

    fetchApplicants();
  }, [status, session?.access_token]);

  const handleRowClick = async (user) => {
    try {
      const endpoint = "/api/applicants?page=1&limit=5000";

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
      const document = data.docs.find((doc) => doc.id === user.id);

      if (!document) {
        console.error("Document not found");
        return;
      }

      const detailedEndpoint = `/api/applicants/${document.id}`;

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
      setSelectedApplicantDetails(detailsData);
      setIsSheetOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // unique job roles for the filter
  const getJobRoles = () => {
    const roles = new Set();
    applicants.forEach((applicant) => {
      if (applicant.jobRole?.[0]?.title) {
        roles.add(applicant.jobRole[0].title);
      }
    });
    return Array.from(roles);
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

  if (!applicants || applicants.length === 0) {
    return <div className="">No applicants available</div>;
  }

  if (error) {
    return (
      <div className=" text-red-500">Error loading applicants: {error}</div>
    );
  }

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
              <BreadcrumbLink href="/applicants">All Applicants</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Filter Button */}
        <AppFilterSheet
          filters={filters}
          onFilterChange={handleFilterChange}
          jobRoles={getJobRoles()}
          onReset={handleReset}
        />
      </header>

      <UserTable
        users={applicants}
        filters={filters}
        currentPaginationPage={currentPaginationPage}
        setCurrentPaginationPage={setCurrentPaginationPage}
        handleRowClick={handleRowClick}
      />

      {/* Sheet for User Details */}
      <UserSheet
        selectedUserDetails={selectedApplicantDetails}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
    </div>
  );
}
