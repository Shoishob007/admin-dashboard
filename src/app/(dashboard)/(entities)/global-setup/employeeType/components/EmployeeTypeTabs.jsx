import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  FilePlus2,
} from "lucide-react";

import MyEmployeeTypes from "../myEmployeeTypes/page.jsx";
import AddEmployeeTypes from "../addEmployeeTypes/page.jsx";

const EmployeeTypeTabs = () => {
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
        <MyEmployeeTypes />
      </TabsContent>
      <TabsContent value="addEmployeeTypes">
        <AddEmployeeTypes />
      </TabsContent>
    </Tabs>
  );
};

export default EmployeeTypeTabs;
