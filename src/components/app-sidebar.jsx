"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Command,
  Frame,
  GalleryVerticalEnd,
  Info,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
  Users,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    // avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "HireHub Ltd",
      logo: GalleryVerticalEnd,
    },
    {
      name: "Demo Profile 1",
      logo: AudioWaveform,
    },
    {
      name: "Demo Profile 2",
      logo: Command,
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      // items: [
      //   {
      //     title: "History",
      //     url: "#",
      //   },
      //   {
      //     title: "Starred",
      //     url: "#",
      //   },
      //   {
      //     title: "Settings",
      //     url: "#",
      //   },
      // ],
    },
    {
      title: "Users",
      url: "/all-users",
      icon: Users,
      items: [
        {
          title: "All Users",
          url: "/all-users",
        },
        {
          title: "Applicants",
          url: "/applicants",
        },
        {
          title: "Organizations",
          url: "/organizations",
        },
      ],
    },
    {
      title: "Jobs",
      url: "/jobs",
      icon: BriefcaseBusiness,
    },
    {
      title: "Global Entities",
      url: "#",
      icon: Info,
      items: [
        {
          title: "Skills",
          url: "/global-setup/skills",
        },
        {
          title: "Job Roles",
          url: "/global-setup/jobRole",
        },
        {
          title: "Designation",
          url: "/global-setup/designation",
        },
        {
          title: "Degree Level",
          url: "/global-setup/degreeLevel",
        },
        {
          title: "Job Type",
          url: "/global-setup/jobType",
        },
        {
          title: "Employee Type",
          url: "/global-setup/employeeType",
        },
        {
          title: "Field Of Study",
          url: "/global-setup/fieldOfStudy",
        },
        {
          title: "Social Media",
          url: "/global-setup/socialMedia",
        },
        {
          title: "Academic Activity",
          url: "/global-setup/academicActivity",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Aplicant",
          url: "#",
        },
        {
          title: "Organization",
          url: "#",
        },
        {
          title: "Job",
          url: "#",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
