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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import OurPagination from "@/components/Pagination";
import {
  filterApplicants,
  filterJobs,
  filterOrganizations,
  filterUsers,
} from "@/lib/filters";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";

const UserTable = ({
  users,
  filters,
  currentPaginationPage,
  setCurrentPaginationPage,
  handleRowClick,
  isJobTable = false,
}) => {
  const router = useRouter();

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

  return (
    <div className="">
      <Table className="w-full bg-white dark:bg-gray-800 dark:text-gray-300 text-center rounded-lg shadow-lg">
        <TableHeader className="">
          <TableRow>
            {isJobTable ? (
              <TableHead className="w-2/6 text-center font-semibold">
                Job ID
              </TableHead>
            ) : (
              <TableHead className="w-2/6 text-center font-semibold">
                User ID
              </TableHead>
            )}

            {isJobTable ? (
              <TableHead className="text-center font-semibold">
                Job Title
              </TableHead>
            ) : (
              <TableHead className="text-center font-semibold">
                User Email
              </TableHead>
            )}
            <TableHead className="text-center font-semibold">Role</TableHead>
            <TableHead className="text-center font-semibold">Status</TableHead>
            <TableHead className="text-center font-semibold">Action</TableHead>
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
                {isJobTable ? (
                  <span>{user?.job?.id || "Unknown Job"}</span>
                ) : (
                  <span>{user.id || "Unknown User"}</span>
                )}
              </TableCell>
              {isJobTable ? (
                <TableCell>{user.title || "N/A"}</TableCell>
              ) : (
                <TableCell>
                  {user.email ||
                    user.applicant?.email ||
                    user.organization?.email}
                </TableCell>
              )}

              {isJobTable ? (
                <TableCell className="text-sm">
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
                  {isJobTable ? (
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/job-applications/${user?.job.id}`);
                        }}
                      >
                        View Applications
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Edit Job", user?.job.id);
                        }}
                      >
                        Edit Job
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Delete Job", user?.job.id);
                        }}
                      >
                        Delete Job
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  ) : (
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Edit Job", user?.id);
                        }}
                      >
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log("Delete Job", user?.id);
                        }}
                      >
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  )}
                </DropdownMenu>
              </TableCell>
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
