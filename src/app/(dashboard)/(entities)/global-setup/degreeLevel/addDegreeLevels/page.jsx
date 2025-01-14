import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { DegreeLevelDialogue } from "../components/DegreeLevelDialogue";
import { addDegreeLevelFunc } from "../functions/DegreeLevelFunctions";

const AddDegreeLevels = ({ degreeLevels, accessToken }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (title) => {
    const degreeLevelExists = degreeLevels.some(
      (degreeLevel) => degreeLevel.title.toLowerCase() === title.toLowerCase()
    );

    if (degreeLevelExists) {
      alert("This degree level already exists.");
      return;
    }

    setLoading(true);
    addDegreeLevelFunc({ title, accessToken, setIsDialogOpen, setLoading });
  };

  return (
    <div className="p-4">
      <Card
        className="bg-gray-200 dark:bg-gray-900"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardContent className="p-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <Plus className="w-8 h-8 text-gray-500" />
            <h3 className="font-medium">Add a new degree level</h3>
            <p className="text-sm text-muted-foreground">
              Click to add a new degree level with necessary information and
              save it
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dialog */}
      <DegreeLevelDialogue
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        isEditing={false}
        loading={loading}
      />
    </div>
  );
};

export default AddDegreeLevels;
