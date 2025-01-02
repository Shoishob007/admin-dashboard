import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  FilePlus2,
} from "lucide-react";

import MyDegreeLevels from "../myDegreeLevels/page.jsx";
import AddDegreeLevels from "../addDegreeLevels/page.jsx";

const DegreeLevelTabs = () => {
  return (
    <Tabs defaultValue="myDegreeLevels">
      <ScrollArea>
        <TabsList className="flex max-w-full overflow-hidden h-auto rounded-none  bg-transparent px-2 justify-end">
          <TabsTrigger
            value="myDegreeLevels"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <FileText size={16} className="opacity-60" />
              <span>Degree Levels</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="addDegreeLevels"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <FilePlus2 size={16} className="opacity-60" />
              <span>Add Degree Level</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </ScrollArea>

      <TabsContent value="myDegreeLevels">
        <MyDegreeLevels />
      </TabsContent>
      <TabsContent value="addDegreeLevels">
        <AddDegreeLevels />
      </TabsContent>
    </Tabs>
  );
};

export default DegreeLevelTabs;
