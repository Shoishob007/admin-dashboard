"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { UserFilters } from "../../components/filters/JobFilters";
import UserTable from "./components/UserTable";
import UserSheet from "./components/UserSheet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { House } from "lucide-react";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
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
    const fetchUsers = async () => {
      if (status !== "authenticated" || !session?.access_token) {
        return;
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=1&limit=5000`,
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
        setIsLoading(false);
        setUsers(result.docs);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [status, session?.access_token]);

  const handleRowClick = async (user) => {
    try {
      const endpoint =
        user.role === "org"
          ? "/api/organizations?page=1&limit=5000"
          : "/api/applicants?page=1&limit=5000";

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
      console.log(data)
      const document = data.docs.find(
        (doc) => (doc.organization?.id || doc.applicant?.id) === user.id
      );

      if (!document) {
        console.error("Document not found");
        return;
      }

      const detailedEndpoint =
        user.role === "org"
          ? `/api/organizations/${document.id}`
          : `/api/applicants/${document.id}`;

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
      setSelectedUserDetails(detailsData);
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

  if (!users || users.length === 0) {
    return <div className="p-4">No users available</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error loading users: {error}</div>;
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
              <BreadcrumbLink href="/all-users">All Users</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <UserFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
      </header>

      <UserTable
        users={users}
        filters={filters}
        currentPaginationPage={currentPaginationPage}
        setCurrentPaginationPage={setCurrentPaginationPage}
        handleRowClick={handleRowClick}
      />

      {/* Sheet for User Details */}
      <UserSheet
        selectedUserDetails={selectedUserDetails}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
    </div>
  );
}
