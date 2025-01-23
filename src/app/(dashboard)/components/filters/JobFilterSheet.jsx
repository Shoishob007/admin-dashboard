"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { AppFilters, JobFilters, OrgFilters, UserFilters } from "./JobFilters";

export const JobFilterSheet = ({
  filters,
  onFilterChange,
  jobRoles,
  onReset,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="flex items-center gap-2 p-2">
          <Filter className="size-3" />
          <span className="text-xs hidden md:block">Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-96 bg-white shadow-lg rounded-lg p-4"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">Filter Jobs</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-6">
          {/* Job Filters */}
          <div className="space-y-4">
            <JobFilters
              filters={filters}
              onFilterChange={onFilterChange}
              jobRoles={jobRoles}
            />
          </div>

          {/* 
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Experience Level</h2>
            <ExperienceLevelFilters onChange={onExperienceLevelChange} />
          </div> 
          */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const AppFilterSheet = ({
  filters,
  onFilterChange,
  jobRoles,
  onReset,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="flex items-center gap-2 p-2">
          <Filter className="size-3" />
          <span className="text-xs hidden md:block">Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-96 bg-white shadow-lg rounded-lg p-4"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            Filter Applicants
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-6">
          {/* Job Filters */}
          <div className="space-y-4">
            <AppFilters
              filters={filters}
              onFilterChange={onFilterChange}
              jobRoles={jobRoles}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const OrgFilterSheet = ({ filters, onFilterChange, onReset }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="flex items-center gap-2 p-2">
          <Filter className="size-3" />
          <span className="text-xs hidden md:block">Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-96 bg-white shadow-lg rounded-lg p-4"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            Filter Organizations
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-6">
          {/* Job Filters */}
          <div className="space-y-4">
            <OrgFilters filters={filters} onFilterChange={onFilterChange} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const UserFilterSheet = ({ filters, onFilterChange, onReset }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="flex items-center gap-2 p-2">
          <Filter className="size-3" />
          <span className="text-xs hidden md:block">Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:w-96 bg-white shadow-lg rounded-lg p-4"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold">
            Filter All Users
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-6">
          {/* Job Filters */}
          <div className="space-y-4">
            <UserFilters filters={filters} onFilterChange={onFilterChange} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
