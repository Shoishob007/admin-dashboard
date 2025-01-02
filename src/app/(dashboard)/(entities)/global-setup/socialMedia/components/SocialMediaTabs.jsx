import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileText,
  FilePlus2,
} from "lucide-react";

import MySocialMedia from "../mySocialMedia/page.jsx";
import AddSocialMedia from "../addSocialMedia/page.jsx";

const SocialMediaTabs = () => {
  return (
    <Tabs defaultValue="mySocialMedia">
      <ScrollArea>
        <TabsList className="flex max-w-full overflow-hidden h-auto rounded-none  bg-transparent px-2 justify-end">
          <TabsTrigger
            value="mySocialMedia"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <FileText size={16} className="opacity-60" />
              <span>My Social Media</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="addSocialMedia"
            className="relative flex-shrink-0 rounded-none px-3 py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
          >
            <div className="flex items-center gap-2">
              <FilePlus2 size={16} className="opacity-60" />
              <span>Add Social Media</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </ScrollArea>

      <TabsContent value="mySocialMedia">
        <MySocialMedia />
      </TabsContent>
      <TabsContent value="addSocialMedia">
        <AddSocialMedia />
      </TabsContent>
    </Tabs>
  );
};

export default SocialMediaTabs;
