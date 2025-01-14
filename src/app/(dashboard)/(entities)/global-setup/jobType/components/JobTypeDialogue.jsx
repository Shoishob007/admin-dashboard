import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const JobTypeDialogue = ({
    isOpen,
    onClose,
    onSubmit,
    initialTitle = "",
    isEditing = false,
    loading,
  }) => {
    const [title, setTitle] = useState(initialTitle);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(title);
    };
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit job type" : "Add a job type"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {isEditing
                  ? "Update the title of the job-type you want to edit. For example: Home, Physical, Hybrid etc."
                  : "Please enter the title of the new job type you want to add. For example: Home, Physical, Hybrid etc."}
              </p>
              <Input
                type="text"
                placeholder="Enter job-type title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Make sure the name is unique and easy to identify.
              </p>
            </div>
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading
                  ? isEditing
                    ? "Updating..."
                    : "Adding..."
                  : isEditing
                  ? "Update Job-type"
                  : "Add Job-type"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };