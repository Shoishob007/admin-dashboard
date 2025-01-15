"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Trash, Info, House } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { filterUsers } from "@/lib/filters";
import OurPagination from "@/components/Pagination";
import { DeleteButton, DetailsButton } from "../../components/Buttons";
import { UserFilters } from "../../components/filters/JobFilters";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  const [filters, setFilters] = useState({
    searchQuery: "",
    sortBy: "latest",
  });
  const itemsPerPage = 16;
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=1&limit=50`,
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

  const filteredUsers = filterUsers(users, filters);

  // Sorting users based on creation date
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return filters.sortBy === "latest" ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  // Slicing jobs for current page
  const startIndex = (currentPaginationPage - 1) * itemsPerPage;
  const currentUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-28 w-full" />
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
    <div className="space-y-4">
      <div className="flex flex-col">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4">
          <Breadcrumb className="min-w-24 mt-4 sm:mt-0">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/"><House className="w-4 h-4" /></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/all-users">All users</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <UserFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </header>
      </div>
      {currentUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-lg">
          {currentUsers.map((user) => (
            <Card
              key={user.id}
              className="relative shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Avatar and Name */}
              <div className="flex bg-gray-700 text-white rounded-t-lg items-center justify-between px-2">
                <CardHeader className="flex flex-row justify-start items-center space-x-2 py-3 px-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.pictureUrl || undefined} />
                    <AvatarFallback className="bg-white text-gray-700">
                      {user.name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-medium">
                      {user.name || "Unknown user"}
                    </CardTitle>
                    <p className="text-xs text-gray-200">{user.email}</p>
                  </div>
                </CardHeader>
                <div className="py-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="p-2 hover:bg-transparent hover:scale-110 transition-all duration-200 cursor-pointer">
                          <Info className="h-4 w-4" />
                        </div>
                      </TooltipTrigger>

                      <TooltipContent>
                        <p>View Details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/* Card Content */}
              <CardContent className="mt-2 text-sm text-gray-700">
                <div className="flex gap-2">
                  <p className="font-medium">Role:</p>
                  <p className="font-medium">{user.role || "N/A"}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-medium">Status:</p>
                  <p className="font-medium">{user.status || "Unknown"}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-medium">Contact:</p>
                  <p className="font-medium">{user.contactInfo || "N/A"}</p>
                </div>
              </CardContent>

              {/* Actions */}
              <CardFooter className="flex justify-between items-center text-gray-700 px-3">
                <DetailsButton />
                <DeleteButton user={"User"} />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No user match your filters.
        </div>
      )}

      {currentUsers.length > 0 && (
        <OurPagination
          totalPages={totalPages}
          currentPage={currentPaginationPage}
          onPageChange={(page) => setCurrentPaginationPage(page)}
        />
      )}
    </div>
  );
}
