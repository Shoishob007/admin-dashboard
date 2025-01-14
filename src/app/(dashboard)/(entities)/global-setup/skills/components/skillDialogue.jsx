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

export const SkillDialogue = ({
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
          <DialogTitle>{isEditing ? "Edit Skill" : "Add a Skill"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {isEditing
                ? "Update the name of the skill you want to edit. For example: React, Next, Node, etc."
                : "Please enter the name of the skill you want to add. For example: React, Next, Node, etc."}
            </p>
            <Input
              type="text"
              placeholder="Enter skill name"
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
                ? "Update Skill"
                : "Add Skill"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
