/** @format */
"use client";

import { Bell, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";
// import SearchComponent from "./SearchComponent";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const VerticalNavbar = () => {
  // const handleSearch = (query) => {
  //   console.log("Searching for:", query);
  // };

  return (
    <nav
      className={`bg-white dark:bg-gray-800 py-6 px-2 mx-4 mt-2 sm:px-6 rounded-lg text-gray-600 dark:text-gray-200 shadow-md text-sm flex items-center justify-between`}
    >
      <div
        className={`flex flex-col space-y-2 transition-all duration-300 ease-in-out`}
      >
        <ul className="flex space-x-4 items-center">
          <div className="flex">
            <li className="items-center text-center">
              {" "}
              <SidebarTrigger />
              {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
            </li>
          </div>
          {
            <div className="sm:flex space-x-4 items-center hidden">
              <li>
                <Link href="/" className={cn("hover:underline")}>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/applicants" className={cn("hover:underline")}>
                  Applicants
                </Link>
              </li>
              <li>
                <Link href="/organizations" className={cn("hover:underline")}>
                  Organizations
                </Link>
              </li>
              <li>
                <Link href="/jobs" className={cn("hover:underline")}>
                  Jobs
                </Link>
              </li>
              {/* <li>
                <Link href="#" className={cn("hover:underline")}>
                  Contact Us
                </Link>
              </li> */}
            </div>
          }
        </ul>
      </div>

      <div
        className={`flex items-center ml-2 gap-2 sm:gap-5 transition-all duration-300 ease-in-out`}
      >
        {/* Notification dropdown */}
        <section>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative w-5 h-5 flex items-center justify-center">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 p-0 m-0 " />
                <div className="absolute bg-black dark:bg-gray-200 rounded-full w-5 text-white dark:text-black -top-3 -right-2 flex items-center justify-center">
                  <span className="">1</span>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4">
              <DropdownMenuLabel>Notification</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View Notifications</DropdownMenuItem>
              <DropdownMenuItem>Notification Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>

        <section>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className=" w-5 h-5 flex items-center justify-center">
                <User className="w-4 h-4 sm:w-5 sm:h-5 p-0 m-0" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-6">
              <DropdownMenuLabel>User Profile</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/profile-settings">View Profile Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/profile-settings/password">Change password</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="#">Try Enterprize</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  className="w-32 h-8 shadow-none border-none"
                  variant="outline"
                  // onClick={() => {
                  //   signOut();
                  // }}
                  // disabled={status === "unauthenticated"}
                >
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </section>
      </div>
    </nav>
  );
};

export default VerticalNavbar;
