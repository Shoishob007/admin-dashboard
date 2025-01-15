import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { addFieldOfStudyFunc } from "../functions/fieldOfStudyFunctions";
import { FieldOfStudyDialogue } from "../components/FieldOfStudyDialogue";

const AddFieldOfStudy = ({ fieldOfStudy, accessToken }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (title) => {
    const fieldOfStudyExists = fieldOfStudy.some(
      (fos) => fos.title.toLowerCase() === title.toLowerCase()
    );

    if (fieldOfStudyExists) {
      alert("This field already exists.");
      return;
    }

    setLoading(true);
    addFieldOfStudyFunc({ title, accessToken, setIsDialogOpen, setLoading });
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
            <h3 className="font-medium">Add a new field of study</h3>
            <p className="text-sm text-muted-foreground">
              Click to add a new field of study with necessary information and
              save it
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dialog */}
      <FieldOfStudyDialogue
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        isEditing={false}
        loading={loading}
      />
    </div>
  );
};

export default AddFieldOfStudy;
