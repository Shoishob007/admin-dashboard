import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const JobSheet = ({ selectedJobDetails, isSheetOpen, setIsSheetOpen }) => {
    console.log(selectedJobDetails)
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetContent
        side="right"
        className="w-full sm:w-96 overflow-y-auto border-none"
      >
        <SheetHeader className="p-6 bg-gray-800">
          <SheetTitle className="text-white">
            <div className="flex items-center space-x-2 gap-2">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={
                    selectedJobDetails?.job?.organization?.img?.url || undefined
                  }
                />
                <AvatarFallback className="text-gray-600 dark:text-gray-300">
                  {selectedJobDetails?.job?.organization?.orgName?.[0]?.toUpperCase() ||
                    "J"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm">
                  {selectedJobDetails?.job?.organization?.orgName}
                </p>
                <p className="text-sm font-medium text-gray-200 dark:text-gray-400">
                  Job Title: {selectedJobDetails?.title}
                </p>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
        {selectedJobDetails ? (
          <div className="pb-6 pt-3 px-6">
            {/* Job Details */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold">Job Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Salary: {selectedJobDetails?.salary}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Location: {selectedJobDetails?.location}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Year of Experience: {selectedJobDetails?.yearOfExperience}
              </p>
              {/* <p className="text-sm text-gray-600 dark:text-gray-400">
                Publish Date: {new Date(selectedJobDetails.publishDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Deadline: {new Date(selectedJobDetails.deadline).toLocaleDateString()}
              </p> */}
            </div>

            {/* Organization Details */}
            <div className="space-y-2 mt-2">
              <h3 className="text-base font-semibold">Organization Details</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Name: {selectedJobDetails?.job?.organization?.orgName}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Address: {selectedJobDetails?.job?.organization?.orgAddress}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Email: {selectedJobDetails?.job?.organization?.orgEmail}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Phone: {selectedJobDetails?.job?.organization?.orgPhone}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Website: {selectedJobDetails?.job?.organization?.orgWebsiteUrl}
              </p>
            </div>

            {/* Job Roles */}
            <div className="space-y-2 mt-2">
              <h3 className="text-base font-semibold">Job Roles</h3>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                {selectedJobDetails?.jobRole?.map((role, index) => (
                  <li key={index}>{role.title}</li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="space-y-2 mt-2">
              <h3 className="text-base font-semibold">Required Skills</h3>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                {selectedJobDetails?.skills?.map((skill, index) => (
                  <li key={index}>{skill.title}</li>
                ))}
              </ul>
            </div>

            {/* Degree Level */}
            <div className="space-y-2 mt-2">
              <h3 className="text-base font-semibold">Required Degree Level</h3>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                {selectedJobDetails?.degreeLevel?.map((degree, index) => (
                  <li key={index}>{degree.title}</li>
                ))}
              </ul>
            </div>

            {/* Field of Study */}
            <div className="space-y-2 mt-2">
              <h3 className="text-base font-semibold">Required Field of Study</h3>
              <ul className="list-disc ml-4 space-y-1 text-sm">
                {selectedJobDetails?.fieldOfStudy?.map((field, index) => (
                  <li key={index}>{field?.title}</li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="space-y-2 mt-2">
              <h3 className="text-base font-semibold">Contact Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Email: {selectedJobDetails?.email}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Phone: {selectedJobDetails?.phone}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Contact Info: {selectedJobDetails?.contactInfo}
              </p>
            </div>

            {/* Social Links */}
            {(selectedJobDetails?.job?.organization?.socialLinks || []).length >
              0 && (
              <div className="space-y-1 mt-2">
                <h3 className="text-base font-semibold">Social Links</h3>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  {selectedJobDetails?.job?.organization?.socialLinks.map(
                    (link, index) => (
                      <li key={index}>
                        <a
                          href={link.socialMediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.socialMediaUrl}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* Basic Visual Effects */}
            <div className="mt-6 text-center">
              <Button
                className="w-full"
                size="sm"
                onClick={() => setIsSheetOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-40 text-sm text-gray-500">
            No job details available.
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default JobSheet;
