import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { addJobDesignationFunc } from "../functions/JobDesignationFunctions";
import { JobDesignationDialogue } from "../components/JobDesignationDialogue";

const AddJobDesignation = ({ designations, accessToken }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (title) => {
    const designationExists = designations.some(
      (designation) => designation.title.toLowerCase() === title.toLowerCase()
    );

    if (designationExists) {
      alert("This platform already exists.");
      return;
    }

    setLoading(true);
    addJobDesignationFunc({ title, accessToken, setIsDialogOpen, setLoading });
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
            <h3 className="font-medium">Add a new designation</h3>
            <p className="text-sm text-muted-foreground">
              Click to add a new designation with necessary information and save
              it
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dialog */}
      <JobDesignationDialogue
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        isEditing={false}
        loading={loading}
      />
    </div>
  );
};

export default AddJobDesignation;
