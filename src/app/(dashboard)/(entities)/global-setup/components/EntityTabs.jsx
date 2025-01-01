import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  GraduationCap,
  List,
  User,
  Users,
  Network,
  FileText,
  BookOpen,
} from "lucide-react";

import Skills from "../skills/page.jsx";
import JobRole from "../jobRole/page.jsx";
import Designation from "../designation/page.jsx";
import DegreeLevel from "../degreeLevel/page.jsx";
import JobType from "../jobType/page.jsx";
import EmployeeType from "../employeeType/page.jsx";
import FieldOfStudy from "../fieldOfStudy/page.jsx";
import SocialMedia from "../socialMedia/page.jsx";

const EntityTabs = () => {
  return (
    <Tabs defaultValue="skills">
      <ScrollArea>
        <TabsList className="flex max-w-full overflow-hidden h-auto rounded-none  bg-transparent px-2">
          <TabsTrigger
            value="skills"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <FileText size={16} className="opacity-60" />
              <span>Skills</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="jobRole"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="opacity-60" />
              <span>Job Roles</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="designation"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <User size={16} className="opacity-60" />
              <span>Designation</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="degreeLevel"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <GraduationCap size={16} className="opacity-60" />
              <span>Degree Level</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="jobType"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <List size={16} className="opacity-60" />
              <span>Job Type</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="employeeType"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <Users size={16} className="opacity-60" />
              <span>Employee Type</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="fieldOfStudy"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="opacity-60" />
              <span>Field Of Study</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="socialMedia"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <Network size={16} className="opacity-60" />
              <span>Social Media</span>
            </div>
          </TabsTrigger>
        </TabsList>

      </ScrollArea>
      <TabsContent value="skills">
        <Skills />
      </TabsContent>
      <TabsContent value="jobRole">
        <JobRole />
      </TabsContent>
      <TabsContent value="designation">
        <Designation />
      </TabsContent>
      <TabsContent value="degreeLevel">
        <DegreeLevel />
      </TabsContent>
      <TabsContent value="jobType">
        <JobType />
      </TabsContent>
      <TabsContent value="employeeType">
        <EmployeeType />
      </TabsContent>
      <TabsContent value="fieldOfStudy">
        <FieldOfStudy />
      </TabsContent>
      <TabsContent value="socialMedia">
        <SocialMedia />
      </TabsContent>
    </Tabs>
  );
};

export default EntityTabs;
