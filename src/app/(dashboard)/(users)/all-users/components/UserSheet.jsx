import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const UserSheet = ({
  selectedUserDetails,
  isSheetOpen,
  setIsSheetOpen,
}) => {
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto border-none">
          <SheetHeader className="p-6 bg-gray-800">
            <SheetTitle className="text-white">
              <div className="flex items-center space-x-2 gap-2">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={
                      selectedUserDetails?.organization?.pictureUrl ||
                      selectedUserDetails?.applicant?.pictureUrl ||
                      undefined
                    }
                  />
                  <AvatarFallback className="text-gray-600 dark:text-gray-300">
                    {selectedUserDetails?.orgName?.[0]?.toUpperCase() ||
                      selectedUserDetails?.name?.[0]?.toUpperCase() ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    {selectedUserDetails?.orgName || selectedUserDetails?.name}
                  </p>
                  <p className="text-sm font-medium text-gray-200 dark:text-gray-400">
                    Role:{" "}
                    {selectedUserDetails?.organization?.role ||
                      selectedUserDetails?.applicant?.role}
                  </p>
                </div>
              </div>
            </SheetTitle>
          </SheetHeader>
          {selectedUserDetails ? (
            <div className="pb-6 pt-3 px-6">
              {/* Basic Info */}
              <div className="space-y-2">
                <h3 className="text-base font-semibold">Basic Information</h3>
              </div>

              {/* Contact Details */}
              <div className="space-y-2 text-sm">
                <p className="flex items-center space-x-2">
                  <span className="material-icons text-gray-500">email</span>
                  <span>
                    {selectedUserDetails.organization?.email ||
                      selectedUserDetails.applicant?.email ||
                      selectedUserDetails.orgEmail ||
                      selectedUserDetails.email ||
                      "N/A"}
                  </span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="material-icons text-gray-500">phone</span>
                  <span>
                    {selectedUserDetails?.phone ||
                      selectedUserDetails.orgPhone ||
                      "N/A"}
                  </span>
                </p>
              </div>

              {/* Organization Specific Details */}
              {selectedUserDetails.organization && (
                <div className="space-y-2 mt-2">
                  <h3 className="text-base font-semibold">
                    Organization Details
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Name: {selectedUserDetails.orgName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Tagline: {selectedUserDetails.orgTagline}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Mission: {selectedUserDetails.orgMission}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Vision: {selectedUserDetails.orgVision}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Address: {selectedUserDetails.orgAddress}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Website: {selectedUserDetails.orgWebsiteUrl}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Established Year: {selectedUserDetails.orgEstablishedYear}
                  </p>
                </div>
              )}

              {/* Applicant Specific Details */}
              {selectedUserDetails.applicant && (
                <div className="space-y-2 mt-2">
                  <h3 className="text-lg font-semibold">Applicant Details</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    First Name: {selectedUserDetails.firstName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Last Name: {selectedUserDetails.lastName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Address: {selectedUserDetails.address}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Phone: {selectedUserDetails.phone}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Email: {selectedUserDetails.email}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Contact Info: {selectedUserDetails.contactInfo}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Website: {selectedUserDetails.applicantWebsiteUrl}
                  </p>
                </div>
              )}

              {/* Social Links */}
              {(selectedUserDetails.socialLinks || []).length > 0 && (
                <div className="space-y-1 mt-2">
                  <h3 className="text-base font-semibold">Social Links</h3>
                  <ul className="list-disc ml-4 space-y-1">
                    {selectedUserDetails.socialLinks.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.socialMediaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.socialMedia.title}
                        </a>
                      </li>
                    ))}
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
              No user details available.
            </div>
          )}
        </SheetContent>
      </Sheet>
  );
};

export default UserSheet;
