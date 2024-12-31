"use client";

import React from "react";
import { SearchBar } from "./SearchBar";
import { RangeFilter } from "./RangeFilters";
import { Button } from "@/components/ui/button";
import { Plus, RotateCcw } from "lucide-react";

const statusOptions = [
  { label: "Any Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

const experienceOptions = [
  { label: "Any Experience", value: "all" },
  { label: "0-2 years", value: "0-2" },
  { label: "2-5 years", value: "2-5" },
  { label: "5+ years", value: "5-999" },
];

const sortOptions = [
  { label: "Latest First", value: "latest" },
  { label: "Oldest First", value: "oldest" },
];

export const JobFilters = ({
  jobs,
  filters,
  onFilterChange,
  jobRoles,
  onReset,
}) => {
  return (
    <div className="flex mx-auto max-w-5xl items-center">
      <div className="w-full space-y-2 dark:bg-gray-900 rounded-lg">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div className="flex items-center gap-4">
              <SearchBar
                placeholder="Search by title, role, designation..."
                value={filters.searchQuery}
                onSearch={(value) => onFilterChange("searchQuery", value)}
              />
              <div className="block md:hidden">
                <Button
                  variant="outline"
                  onClick={onReset}
                  className="flex items-center gap-2 p-2 dark:border-gray-500 dark:hover:bg-gray-900 h-7 md:h-9"
                >
                  <RotateCcw className="w-2 h-2" />
                  <span className="text-[10px] md:text-xs">Reset</span>
                </Button>
              </div>
            </div>

            <div className="flex gap-0 md:gap-4">
              <RangeFilter
                placeholder="Status"
                options={statusOptions}
                value={filters.status}
                onChange={(value) => onFilterChange("status", value)}
                className="min-w-24 max-w-40"
              />
              {jobRoles && (
                <RangeFilter
                  placeholder="Job Role"
                  options={[
                    { value: "all", label: "Any Job Roles" },
                    ...jobRoles.map((role) => ({
                      value: role,
                      label: role,
                    })),
                  ]}
                  value={filters.jobRole}
                  onChange={(value) => onFilterChange("jobRole", value)}
                  className="min-w-24 max-w-40"
                />
              )}
              <RangeFilter
                placeholder="Experience"
                options={experienceOptions}
                value={filters.experienceRange}
                onChange={(value) => onFilterChange("experienceRange", value)}
                className="min-w-24 max-w-40"
              />
              <RangeFilter
                placeholder="Sort By"
                options={sortOptions}
                value={filters.sortBy}
                onChange={(value) => onFilterChange("sortBy", value)}
                className="min-w-24 max-w-40"
              />
            </div>

            <div className="hidden md:block">
              <Button
                variant="outline"
                onClick={onReset}
                className="flex items-center gap-2 px-3 py-2 dark:border-gray-500 dark:hover:bg-gray-900 h-7 md:h-9"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="text-xs hidden md:block">Reset Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserFilters = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className="flex mx-auto max-w-5xl items-center">
      <div className="w-full space-y-2 dark:bg-gray-900 rounded-lg">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div className="flex items-center gap-4">
              <SearchBar
                placeholder="Search by title, role, designation..."
                value={filters.searchQuery}
                onSearch={(value) => onFilterChange("searchQuery", value)}
              />
              <div className="block md:hidden">
                <Button
                  variant="outline"
                  onClick={onReset}
                  className="flex items-center gap-2 p-2 dark:border-gray-500 dark:hover:bg-gray-900 h-7 md:h-9"
                >
                  <RotateCcw className="w-2 h-2" />
                  <span className="text-[10px] md:text-xs">Reset</span>
                </Button>
              </div>
            </div>

            <div className="flex gap-0 md:gap-4">
              {/* <RangeFilter
                placeholder="Status"
                options={statusOptions}
                value={filters.status}
                onChange={(value) => onFilterChange("status", value)}
                className="min-w-24 max-w-40"
              />
              {jobRoles && <RangeFilter
                placeholder="Job Role"
                options={[
                  { value: "all", label: "Any Job Roles" },
                  ...jobRoles.map((role) => ({
                    value: role,
                    label: role,
                  })),
                ]}
                value={filters.jobRole}
                onChange={(value) => onFilterChange("jobRole", value)}
                className="min-w-24 max-w-40"
              />}
              <RangeFilter
                placeholder="Experience"
                options={experienceOptions}
                value={filters.experienceRange}
                onChange={(value) => onFilterChange("experienceRange", value)}
                className="min-w-24 max-w-40"
              /> */}
              <RangeFilter
                placeholder="Sort By"
                options={sortOptions}
                value={filters.sortBy}
                onChange={(value) => onFilterChange("sortBy", value)}
                className="min-w-24 max-w-40"
              />
            </div>

            <div className="hidden md:block">
              <Button
                variant="outline"
                onClick={onReset}
                className="flex items-center gap-2 px-3 py-2 dark:border-gray-500 dark:hover:bg-gray-900 h-7 md:h-9"
              >
                <RotateCcw className="h-3 w-3" />
                <span className="text-xs hidden md:block">Reset Filters</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
