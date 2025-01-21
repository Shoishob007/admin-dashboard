"use client";

import React, { useEffect, useState } from "react";
import { use } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import OurPagination from "@/components/Pagination";
import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ApplicantSheet from "../components/ApplicantSheet";

const JobApplicants = ({ params }) => {
  const { jobId } = use(params);
  const { data: session } = useSession();
  const [applicants, setApplicants] = useState([]);
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const [selectedApplicantDetails, setSelectedApplicantDetails] =
    useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jobId) {
      const fetchApplicants = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/job-applications`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${session?.access_token}`,
              },
            }
          );
          const data = await response.json();
          const jobApplicants = data?.docs?.filter(
            (doc) => doc?.job.id === jobId
          );
          setApplicants(jobApplicants);
        } catch (error) {
          console.error("Error fetching applicants:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchApplicants();
    }
  }, [jobId]);

  const handleRowClick = async (applicant) => {
    try {
      const endpoint = "/api/applicants?limit=5000";

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
      const document = data.docs.find((doc) => doc.id === applicant.id);

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

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  const totalPages = Math.ceil(applicants?.length / 20);
  const startIndex = (currentPaginationPage - 1) * 20;
  const currentApplicants = applicants?.slice(startIndex, startIndex + 20);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold">Applicants for Job {jobId}</h1>
      <Table className="w-full bg-white dark:bg-gray-800 dark:text-gray-300 text-center rounded-lg shadow-lg mt-4">
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-semibold">
              Applicant
            </TableHead>
            <TableHead className="text-center font-semibold">Skills</TableHead>
            <TableHead className="text-center font-semibold">
              Latest Education
            </TableHead>
            <TableHead className="text-center font-semibold">
              Latest Experience
            </TableHead>
            <TableHead className="text-center font-semibold">CV</TableHead>
            <TableHead className="text-center font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentApplicants?.map((doc) => (
            <TableRow
              key={doc.id}
              className="cursor-pointer"
              onClick={() => handleRowClick(doc?.applicant)}
            >
              {/* Applicant Avatar and Name */}
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={doc?.applicant?.pictureUrl || "/default-avatar.png"}
                  />
                  <AvatarFallback>
                    {doc?.applicant?.name?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span>{doc?.applicant?.name || "N/A"}</span>
              </TableCell>

              {/* Skills */}
              <TableCell>
                {doc?.applicant?.skills?.length > 0
                  ? doc.applicant.skills.join(", ")
                  : "No skills listed"}
              </TableCell>

              {/* Latest Education */}
              <TableCell>
                {doc.applicant.educations.length > 0
                  ? doc.applicant.educations[0].degree || "N/A"
                  : "No education listed"}
              </TableCell>

              {/* Latest Experience */}
              <TableCell>
                {doc.applicant.experiences.length > 0
                  ? doc.applicant.experiences[0].position || "N/A"
                  : "No experience listed"}
              </TableCell>

              {/* CV Link */}
              <TableCell>
                {doc.applicant.cvUrl ? (
                  <a
                    href={doc.applicant.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Download CV
                  </a>
                ) : (
                  "No CV available"
                )}
              </TableCell>

              {/* Action Button */}
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EllipsisVertical className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(doc);
                      }}
                    >
                      {" "}
                      Edit Applicant
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(doc);
                      }}
                    >
                      {" "}
                      Delete Applicant
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {currentApplicants?.length > 0 && (
        <OurPagination
          totalPages={totalPages}
          currentPage={currentPaginationPage}
          onPageChange={(page) => setCurrentPaginationPage(page)}
        />
      )}

      {/* Sheet for User Details */}
      <ApplicantSheet
        selectedUserDetails={selectedApplicantDetails}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
    </div>
  );
};

const handleAction = (applicant) => {
  console.log(applicant);
};

export default JobApplicants;
