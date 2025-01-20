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
import { OrgFilters } from "../../components/filters/JobFilters";
import UserTable from "../all-users/components/UserTable";
import UserSheet from "../all-users/components/UserSheet";

export default function AllOrganizations() {
  const [organizations, setOrganizations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrganizationDetails, setSelectedOrganizationDetails] =
    useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { data: session, status } = useSession();
  const [filters, setFilters] = useState({
    searchQuery: "",
    sortBy: "latest",
  });
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleReset = () => {
    setFilters({
      searchQuery: "",
      sortBy: "latest",
    });
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      if (status !== "authenticated" || !session?.access_token) {
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/organizations?page=1&limit=5000`,
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
        setOrganizations(result.docs || []);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, [status, session?.access_token]);

  const handleRowClick = async (user) => {
    try {
      const endpoint = "/api/organizations?page=1&limit=5000";

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
      console.log(data);
      const document = data.docs.find((doc) => doc.id === user.id);

      if (!document) {
        console.error("Document not found");
        return;
      }

      const detailedEndpoint = `/api/organizations/${document.id}`;

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
      setSelectedOrganizationDetails(detailsData);
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

  if (!organizations || organizations.length === 0) {
    return <div>No organizations available</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading organizations: {error}
      </div>
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
              <BreadcrumbLink href="/organizations">All Organizations</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <OrgFilters
          jobs={organizations}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </header>

      <UserTable
        users={organizations}
        filters={filters}
        currentPaginationPage={currentPaginationPage}
        setCurrentPaginationPage={setCurrentPaginationPage}
        handleRowClick={handleRowClick}
      />

      {/* Sheet for User Details */}
      <UserSheet
        selectedUserDetails={selectedOrganizationDetails}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
    </div>
  );
}
