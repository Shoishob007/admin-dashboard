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
        console.log(accessToken);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/applicants?page=1&limit=50`,
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-28 w-full" />
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
    <div className="">
      <header className="flex h-16 items-center gap-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/applicants">All applicants</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-lg">
        {applicants.map((applicant) => (
          <Card
            key={applicant.id}
            className="relative shadow-md hover:shadow-lg transition-shadow"
          >
            {/* Avatar and Name */}
            <div className="flex bg-blue-100 rounded-t-lg items-center justify-between px-2 ">
              <CardHeader className="flex flex-row justify-start items-center space-x-2 py-3 px-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={applicant.applicant.pictureUrl || undefined}
                    alt={applicant.name}
                  />
                  <AvatarFallback className="bg-white">
                    {applicant.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-sm font-medium">
                    {applicant.firstName || "Unknown applicant"}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {applicant.applicant.email}
                  </p>
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
                <p className="font-semibold">{applicant.role || "N/A"}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">Status:</p>
                <p className="font-semibold">{applicant.status || "Unknown"}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-semibold">Contact:</p>
                <p className="font-semibold">
                  {applicant.contactInfo || "N/A"}
                </p>
              </div>
            </CardContent>

            {/* Actions */}
            <CardFooter className="flex justify-between items-center text-gray-700 px-3">
              <Button
                variant="outline"
                size="sm"
                className="p-2 hover:bg-blue-100 hover:border hover:border-blue-300"
              >
                {/* <Edit className="h-4 w-4" /> */} Edit Details
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="p-2 hover:bg-red-100 hover:border hover:border-red-300"
              >
                {/* <Trash className="h-4 w-4" /> */} Delete Applicant
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}