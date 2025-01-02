"use client"
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  FilePlus2,
} from "lucide-react";

import MyEmployeeTypes from "../myEmployeeTypes/page.jsx";
import AddEmployeeTypes from "../addEmployeeTypes/page.jsx";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const EmployeeTypeTabs = () => {
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const accessToken = session?.access_token;

  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      if (status !== "authenticated" || !session?.access_token) {
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/employee-types`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        setEmployeeTypes(result.docs || []);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        setIsLoading(false);
      }
    };

    fetchEmployeeTypes();
  }, [status, session?.access_token]);

  return (
    <Tabs defaultValue="myEmployeeTypes">
      <ScrollArea>
        <TabsList className="flex max-w-full overflow-hidden h-auto rounded-none  bg-transparent px-2 justify-end">
          <TabsTrigger
            value="myEmployeeTypes"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <FileText size={16} className="opacity-60" />
              <span>Employee Types</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="addEmployeeTypes"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <FilePlus2 size={16} className="opacity-60" />
              <span>Add Employee Type</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </ScrollArea>

      <TabsContent value="myEmployeeTypes">
        <MyEmployeeTypes employeeTypes={employeeTypes} isLoading={isLoading} error={error} />
      </TabsContent>
      <TabsContent value="addEmployeeTypes">
        <AddEmployeeTypes employeeTypes={employeeTypes} accessToken={accessToken} />
      </TabsContent>
    </Tabs>
  );
};

export default EmployeeTypeTabs;
