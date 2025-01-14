import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { addJobTypeFunc } from "../functions/jobTypeFunctions";
import { JobTypeDialogue } from "../components/JobTypeDialogue";

const AddJobType = ({ jobTypes, accessToken }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (title) => {
    const jobTypeExists = jobTypes.some(
      (jobType) => jobType.title.toLowerCase() === title.toLowerCase()
    );

    if (jobTypeExists) {
      alert("This job type already exists.");
      return;
    }

    setLoading(true);
    addJobTypeFunc({
      title,
      accessToken,
      setIsDialogOpen,
      setLoading,
    });
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
            <h3 className="font-medium">Add a new job type</h3>
            <p className="text-sm text-muted-foreground">
              Add a new job type with necessary information and save it
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dialog */}
      <JobTypeDialogue
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        isEditing={false}
        loading={loading}
      />
    </div>
  );
};

export default AddJobType;
