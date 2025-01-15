import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { ActivityDialogue } from "../components/AcademicActivityDialogue";
import { addActivityFunc } from "../functions/AcademicActivitiesFunctions";

const AddAcademicActivities = ({ activities, accessToken }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (title) => {
    const activityExists = activities.some(
      (activity) => activity.title.toLowerCase() === title.toLowerCase()
    );

    if (activityExists) {
      alert("This activity already exists.");
      return;
    }

    setLoading(true);
    addActivityFunc({ title, accessToken, setIsDialogOpen, setLoading });
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
            <h3 className="font-medium">Add a new academic activity</h3>
            <p className="text-sm text-muted-foreground">
              Click to add a new academic activity with necessary information
              and save it
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dialog */}
      <ActivityDialogue
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        isEditing={false}
        loading={loading}
      />
    </div>
  );
};

export default AddAcademicActivities;
