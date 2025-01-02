"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  FilePlus2,
} from "lucide-react";

import MyFieldOfStudy from "../myFieldOfStudy/page.jsx";
import AddFieldOfStudy from "../addFieldOfStudy/page.jsx";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const FieldOfStudyTabs = () => {
  const [fieldOfStudy, setFieldOfStudy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();
  const accessToken = session?.access_token;

  useEffect(() => {
    const fetchFieldOfStudy = async () => {
      if (status !== "authenticated" || !session?.access_token) {
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/field-of-studies`,
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
        setFieldOfStudy(result.docs || []);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
        setIsLoading(false);
      }
    };

    fetchFieldOfStudy();
  }, [status, session?.access_token]);


  return (
    <Tabs defaultValue="myFieldOfStudy">
      <ScrollArea>
        <TabsList className="flex max-w-full overflow-hidden h-auto rounded-none  bg-transparent px-2 justify-end">
          <TabsTrigger
            value="myFieldOfStudy"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <FileText size={16} className="opacity-60" />
              <span>Field Of Study</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="addFieldOfStudy"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <FilePlus2 size={16} className="opacity-60" />
              <span>Add Field Of Study</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </ScrollArea>

      <TabsContent value="myFieldOfStudy">
        <MyFieldOfStudy fieldOfStudy={fieldOfStudy} isLoading={isLoading} error={error} />
      </TabsContent>
      <TabsContent value="addFieldOfStudy">
        <AddFieldOfStudy fieldOfStudy={fieldOfStudy} accessToken={accessToken} />
      </TabsContent>
    </Tabs>
  );
};

export default FieldOfStudyTabs;
