import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { addSkillFunc } from "../functions/SkillFunctions";
import { SkillDialogue } from "../components/skillDialogue";

const AddSkills = ({ skills, accessToken }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (title) => {
    const skillExists = skills.some(
      (skill) => skill.title.toLowerCase() === title.toLowerCase()
    );

    if (skillExists) {
      alert("This skill already exists.");
      return;
    }

    setLoading(true);
    addSkillFunc({
      title,
      accessToken,
      setIsDialogOpen,
      setLoading,
    });
  };

  return (
    <div className="p-4">
      <Card
        className="bg-gray-200 dark:bg-gray-900 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Plus className="w-8 h-8 text-gray-500" />
            <h3 className="font-medium">Add a skill</h3>
            <p className="text-sm text-muted-foreground">
              Add a skill with necessary information and save it
            </p>
          </div>
        </CardContent>
      </Card>

      {/*SkillDialogue */}
      <SkillDialogue
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        isEditing={false}
        loading={loading}
      />
    </div>
  );
};

export default AddSkills;
