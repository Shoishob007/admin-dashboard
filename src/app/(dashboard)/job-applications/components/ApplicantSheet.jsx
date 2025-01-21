"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const ApplicantSheet = ({ selectedUserDetails, isSheetOpen, setIsSheetOpen }) => {
  console.log(selectedUserDetails);

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
                  src={selectedUserDetails?.applicant?.pictureUrl || undefined}
                />
                <AvatarFallback className="text-gray-600 dark:text-gray-300">
                  {selectedUserDetails?.applicant?.firstName?.[0]?.toUpperCase() ||
                    selectedUserDetails?.applicant?.lastName?.[0]?.toUpperCase() ||
                    "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm">
                  {selectedUserDetails?.applicant?.firstName} {selectedUserDetails?.applicant?.lastName || ""}
                </p>
                <p className="text-sm font-medium text-gray-200 dark:text-gray-400">
                  Email: {selectedUserDetails?.applicant?.email || "N/A"}
                </p>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>

        {selectedUserDetails ? (
          <div className="pb-6 pt-3 px-6">
            {/* Applicant Information */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold">Applicant Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Role: {selectedUserDetails?.applicant?.role || "N/A"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Verified: {selectedUserDetails?.applicant?._verified ? "Yes" : "No"}
              </p>
            </div>

            {/* Skills Count */}
            <div className="space-y-2 mt-2">
              <h3 className="text-base font-semibold">Skills</h3>
              {selectedUserDetails.skills.length > 0 ? (
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  {selectedUserDetails.skills.map((skill, index) => (
                    <li key={index}>{skill || "N/A"}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">No skills listed.</p>
              )}
            </div>

            {/* Latest Education Count */}
            <div className="space-y-2 mt-2">
              <h3 className="text-base font-semibold">Latest Education</h3>
              {selectedUserDetails.educations.length > 0 ? (
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  {selectedUserDetails.educations.map((edu, index) => (
                    <li key={index}>
                      {edu.degree || "N/A"} - {edu.institution || "Unknown Institution"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">No education listed.</p>
              )}
            </div>

            {/* Latest Experience Count */}
            <div className="space-y-2 mt-2">
              <h3 className="text-base font-semibold">Latest Experience</h3>
              {selectedUserDetails.experiences.length > 0 ? (
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  {selectedUserDetails.experiences.map((exp, index) => (
                    <li key={index}>
                      {exp.position || "N/A"} at {exp.company || "Unknown Company"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">No experience listed.</p>
              )}
            </div>

            {/* Certifications Count */}
            <div className="space-y-2 mt-2">
              <h3 className="text-base font-semibold">Certifications</h3>
              {selectedUserDetails.trainingAndCertifications.length > 0 ? (
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  {selectedUserDetails.trainingAndCertifications.map((certification, index) => (
                    <li key={index}>{certification.title || "N/A"}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">No certifications listed.</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-2 mt-2">
              <h3 className="text-base font-semibold">Contact Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Phone: {selectedUserDetails.phone || "N/A"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Website: {selectedUserDetails.applicantWebsiteUrl || "N/A"}
              </p>
            </div>

            {/* Social Links */}
            {(selectedUserDetails.socialLinks || []).length > 0 && (
              <div className="space-y-1 mt-2">
                <h3 className="text-base font-semibold">Social Links</h3>
                <ul className="list-disc ml-4 space-y-1 text-sm">
                  {selectedUserDetails.socialLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.socialMediaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {link.socialMediaUrl}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Close Button */}
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
          // Fallback if no details are available
          <div className="flex items-center justify-center h-40 text-sm text-gray-500">
            No applicant details available.
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ApplicantSheet;
