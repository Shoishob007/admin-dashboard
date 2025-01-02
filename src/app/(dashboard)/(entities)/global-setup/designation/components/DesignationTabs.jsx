import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  FilePlus2,
} from "lucide-react";

import MyJobDesignation from "../myJobDesignation/page.jsx";
import AddJobDesignation from "../addJobDesignation/page.jsx";

const DesignationTabs = () => {
  return (
    <Tabs defaultValue="myDesignation">
      <ScrollArea>
        <TabsList className="flex max-w-full overflow-hidden h-auto rounded-none  bg-transparent px-2 justify-end">
          <TabsTrigger
            value="myDesignation"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <FileText size={16} className="opacity-60" />
              <span>My Job Designations</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="addDesignation"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <FilePlus2 size={16} className="opacity-60" />
              <span>Add Job Designation</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </ScrollArea>

      <TabsContent value="myDesignation">
        <MyJobDesignation />
      </TabsContent>
      <TabsContent value="addDesignation">
        <AddJobDesignation />
      </TabsContent>
    </Tabs>
  );
};

export default DesignationTabs;
