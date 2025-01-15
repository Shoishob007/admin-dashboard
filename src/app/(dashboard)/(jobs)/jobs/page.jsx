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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { House, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { JobFilters } from "../../components/filters/JobFilters";
import { filterJobs } from "@/lib/filters";
import OurPagination from "@/components/Pagination";
import { DeleteButton, DetailsButton } from "../../components/Buttons";

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const accessToken = session?.access_token;

  const [filters, setFilters] = useState({
    searchQuery: "",
    status: "all",
    jobRole: "all",
    experienceRange: "all",
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/job-details?page=1&limit=60`,
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

  const filteredJobs = filterJobs(jobs, filters);

  // Sorting jobs based on creation date
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return filters.sortBy === "latest" ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
  // Slicing jobs for current page
  const startIndex = (currentPaginationPage - 1) * itemsPerPage;
  const currentJobs = sortedJobs.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(8)].map((_, i) => (
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
                <BreadcrumbLink href="/jobs">All jobs</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <JobFilters
            jobs={jobs}
            filters={filters}
            onFilterChange={handleFilterChange}
            jobRoles={getJobRoles()}
            onReset={handleReset}
          />
        </header>
      </div>

      {currentJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-lg">
          {currentJobs.map((job) => (
            <Card
              key={job.id}
              className="relative shadow-md hover:shadow-lg transition-shadow "
            >
              <div className="flex bg-gray-700 text-white rounded-t-lg items-center justify-between px-2">
                <CardHeader className="flex flex-row justify-start items-center space-x-2 py-3 px-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={`${process.env.NEXT_PUBLIC_API_URL}${job.job?.organization?.img?.url}`}
                    />
                    <AvatarFallback className="bg-white  text-gray-700">
                      {job.job?.organization?.orgName?.[0]?.toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-medium text-gray-200">
                      {job?.title || "Unknown job"}
                    </CardTitle>
                    <p className="text-xs text-gray-200">
                      {job?.employeeType?.title}
                    </p>
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

              <CardContent className="mt-2 text-sm text-gray-700">
                <div className="flex gap-2">
                  <p className="font-medium">Role:</p>
                  <p className="font-medium">
                    {job.jobRole[0]?.title || "N/A"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="font-medium">Designation:</p>
                  <p className="font-medium">
                    {job?.designation?.title || "Unknown"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="font-medium">Status:</p>
                  <p className="font-medium">
                    {job?.jobStatus ? "Active" : "Not Active"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="font-medium">Experience needed:</p>
                  <p className="font-medium">
                    {job?.yearOfExperience
                      ? parseInt(job?.yearOfExperience)
                      : "N/A"}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="flex justify-between items-center text-gray-700 px-3">
                <DetailsButton />
                <DeleteButton user={"Job"} />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No jobs match your filters.
        </div>
      )}

      {currentJobs.length > 0 && (
        <OurPagination
          totalPages={totalPages}
          currentPage={currentPaginationPage}
          onPageChange={(page) => setCurrentPaginationPage(page)}
        />
      )}
    </div>
  );
}
