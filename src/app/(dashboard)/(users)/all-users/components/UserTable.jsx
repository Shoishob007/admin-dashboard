import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import OurPagination from "@/components/Pagination";
import {
  filterApplicants,
  filterJobs,
  filterOrganizations,
  filterUsers,
} from "@/lib/filters";

const UserTable = ({
  users,
  filters,
  currentPaginationPage,
  setCurrentPaginationPage,
  handleRowClick,
  isJobTable = false,
}) => {
  const filteredUsers = (() => {
    if (users.some((user) => user.hasOwnProperty("applicant"))) {
      return filterApplicants(users, filters);
    } else if (users.some((user) => user.hasOwnProperty("organization"))) {
      return filterOrganizations(users, filters);
    } else if (users.some((user) => user.hasOwnProperty("job"))) {
      return filterJobs(users, filters);
    } else {
      return filterUsers(users, filters);
    }
  })();
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return filters.sortBy === "latest" ? dateB - dateA : dateA - dateB;
  });

  const totalPages = Math.ceil(filteredUsers.length / 20);
  const startIndex = (currentPaginationPage - 1) * 20;
  const currentUsers = sortedUsers.slice(startIndex, startIndex + 20);

  console.log(currentUsers);

  return (
    <div className="">
      <Table className="w-full bg-white dark:bg-gray-800 dark:text-gray-300">
        <TableHeader>
          <TableRow>
            {isJobTable ? (
              <TableHead className="w-2/5">Job ID</TableHead>
            ) : (
              <TableHead className="w-2/5">User ID</TableHead>
            )}

            {isJobTable ? (
              <TableHead className="w-1/3">Job Title</TableHead>
            ) : (
              <TableHead className="w-1/3">User Email</TableHead>
            )}
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => (
            <TableRow
              key={user.id}
              className="cursor-pointer"
              onClick={() => handleRowClick(user)}
            >
              <TableCell className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={
                      user?.pictureUrl ||
                      user.applicant?.pictureUrl ||
                      user.organization?.pictureUrl ||
                      user.job?.organization?.img?.url ||
                      undefined
                    }
                  />
                  <AvatarFallback>
                    {user?.name?.[0]?.toUpperCase() ||
                      user.orgName?.[0]?.toUpperCase() ||
                      "U"}
                  </AvatarFallback>
                </Avatar>
                <span>{user.id || "Unknown User"}</span>
              </TableCell>
              {isJobTable ? (
                // <TableCell>
                //   {user.jobRole?.map((role) => role.title).join(", ")}
                // </TableCell>
                <TableCell>{user.title || "N/A"}</TableCell>
              ) : (
                <TableCell>
                  {user.email ||
                    user.applicant?.email ||
                    user.organization?.email}
                </TableCell>
              )}

              {isJobTable ? (
                <TableCell>
                  {user.jobRole?.map((role) => role.title).join(", ") || "N/A"}
                </TableCell>
              ) : (
                <TableCell>
                  {user.role ||
                    user.applicant?.role ||
                    user.organization?.role ||
                    "N/A"}
                </TableCell>
              )}
              {isJobTable ? (
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      new Date(user.deadline) > new Date()
                        ? "bg-green-100 text-green-800 hover:!bg-none"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {new Date(user.deadline) > new Date()
                      ? "Active"
                      : "Inactive"}
                  </Badge>
                </TableCell>
              ) : (
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      user._verified ||
                      user.applicant?._verified ||
                      user.organization?._verified
                        ? "bg-green-100 text-green-800 hover:!bg-none"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {user?._verified ||
                    user.applicant?._verified ||
                    user.organization?._verified
                      ? "Verified"
                      : "Not Verified"}
                  </Badge>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {currentUsers.length > 0 && (
        <OurPagination
          totalPages={totalPages}
          currentPage={currentPaginationPage}
          onPageChange={(page) => setCurrentPaginationPage(page)}
        />
      )}
    </div>
  );
};

export default UserTable;
