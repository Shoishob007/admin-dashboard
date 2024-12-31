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
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Trash, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        console.log(accessToken);
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
    return <div className="p-4 text-red-500">Error loading jobs: {error}</div>;
  }

  return (
    <div className="">
      <header className="flex h-16 items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/jobs">All jobs</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-lg">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="relative shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Avatar and Name */}
            <div className="flex bg-orange-100 rounded-t-lg items-center justify-between px-2">
              <CardHeader className="flex flex-row justify-start items-center space-x-2 py-3 px-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={`${process.env.NEXT_PUBLIC_API_URL}${job.job?.organization?.img?.url}`}
                  />
                  <AvatarFallback className="bg-white">
                    {job.job?.organization?.orgName?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-sm font-medium">
                    {job?.title || "Unknown job"}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{job?.employeeType?.title}</p>
                </div>
              </CardHeader>
              <div className="py-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-2 hover:bg-transparent hover:scale-110 transition-all duration-200"
                      >
                        <Info className="h-4 w-4" />
                      </Button>
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
                <p className="font-semibold">Role:</p>
                <p className="font-semibold">
                  {job.jobRole[0]?.title || "N/A"}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">Designation:</p>
                <p className="font-semibold">
                  {job?.designation?.title || "Unknown"}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">Status:</p>
                <p className="font-semibold">{(job?.jobStatus) ? "Active" : "Not Active"}</p>
              </div>
            </CardContent>

            {/* Actions */}
            <CardFooter className="flex justify-between items-center text-gray-700 px-3">
              <Button
                variant="outline"
                size="sm"
                className="p-2 hover:bg-orange-100 hover:border hover:border-orange-300"
              >
                {/* <Edit className="h-4 w-4" /> */} Edit Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="p-2 hover:bg-red-100 hover:border hover:border-red-300"
              >
                {/* <Trash className="h-4 w-4" /> */} Delete Job
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}