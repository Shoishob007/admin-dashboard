import React from "react";
import { SearchBar } from "./SearchBar";
import { RangeFilter } from "./RangeFilters";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

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

export const JobFilters = ({ filters, onFilterChange, jobRoles, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        {/* Search Bar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search
          </label>
          <SearchBar
            placeholder="Search by title, role, designation..."
            value={filters.searchQuery}
            onSearch={(value) => onFilterChange("searchQuery", value)}
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <RangeFilter
            placeholder="Select Status"
            options={statusOptions}
            value={filters.status}
            onChange={(value) => onFilterChange("status", value)}
            className="w-full"
          />
        </div>

        {/* Job Role Filter */}
        {jobRoles && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Role
            </label>
            <RangeFilter
              placeholder="Select Job Role"
              options={[
                { value: "all", label: "Any Job Roles" },
                ...jobRoles.map((role) => ({
                  value: role,
                  label: role,
                })),
              ]}
              value={filters.jobRole}
              onChange={(value) => onFilterChange("jobRole", value)}
              className="w-full"
            />
          </div>
        )}

        {/* Experience Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Experience
          </label>
          <RangeFilter
            placeholder="Select Experience"
            options={experienceOptions}
            value={filters.experienceRange}
            onChange={(value) => onFilterChange("experienceRange", value)}
            className="w-full"
          />
        </div>

        {/* Sort By Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sort By
          </label>
          <RangeFilter
            placeholder="Select Sort By"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(value) => onFilterChange("sortBy", value)}
            className="w-full"
          />
        </div>

        {/* Reset Button */}
        <div className="flex">
          <Button
            variant="outline"
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 dark:border-gray-500 dark:hover:bg-gray-800 w-full"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm">Reset Filters</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const AppFilters = ({ filters, onFilterChange, jobRoles, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        {/* Search Bar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search
          </label>
          <SearchBar
            placeholder="Search by name, location, organization..."
            value={filters.searchQuery}
            onSearch={(value) => onFilterChange("searchQuery", value)}
          />
        </div>

        {/* Job Role Filter */}
        {jobRoles && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Job Role
            </label>
            <RangeFilter
              placeholder="Select Job Role"
              options={[
                { value: "all", label: "Any Job Roles" },
                ...jobRoles.map((role) => ({
                  value: role,
                  label: role,
                })),
              ]}
              value={filters.jobRole}
              onChange={(value) => onFilterChange("jobRole", value)}
              className="w-full"
            />
          </div>
        )}

        {/* Experience Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Experience
          </label>
          <RangeFilter
            placeholder="Select Experience"
            options={experienceOptions}
            value={filters.experienceRange}
            onChange={(value) => onFilterChange("experienceRange", value)}
            className="w-full"
          />
        </div>

        {/* Sort By Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sort By
          </label>
          <RangeFilter
            placeholder="Select Sort By"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(value) => onFilterChange("sortBy", value)}
            className="w-full"
          />
        </div>

        {/* Reset Button */}
        <div className="flex">
          <Button
            variant="outline"
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 dark:border-gray-500 dark:hover:bg-gray-800 w-full"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm">Reset Filters</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const OrgFilters = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        {/* Search Bar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search
          </label>
          <SearchBar
            placeholder="Search by title, designation..."
            value={filters.searchQuery}
            onSearch={(value) => onFilterChange("searchQuery", value)}
          />
        </div>

        {/* Sort By Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sort By
          </label>
          <RangeFilter
            placeholder="Select Sort By"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(value) => onFilterChange("sortBy", value)}
            className="w-full"
          />
        </div>

        {/* Reset Button */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 dark:border-gray-500 dark:hover:bg-gray-800"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm">Reset Filters</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const UserFilters = ({ filters, onFilterChange, onReset }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="space-y-6">
        {/* Search Bar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search
          </label>
          <SearchBar
            placeholder="Search by title, role, designation..."
            value={filters.searchQuery}
            onSearch={(value) => onFilterChange("searchQuery", value)}
          />
        </div>

        {/* Sort By Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sort By
          </label>
          <RangeFilter
            placeholder="Select Sort By"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(value) => onFilterChange("sortBy", value)}
            className="w-full"
          />
        </div>

        {/* Reset Button */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-2 dark:border-gray-500 dark:hover:bg-gray-800"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-sm">Reset Filters</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
