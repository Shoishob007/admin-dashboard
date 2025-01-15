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

export const SocialMediaDialogue = ({
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
          <DialogTitle>
            {isEditing ? "Edit Social Media" : "Add a Social Media"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {isEditing
                ? "Update social media you want. For example: Facebook, Twitter, LinkedIn, etc."
                : "Please enter the title of the new social media you want to add. For example: Facebook, Twitter, LinkedIn, etc."}
            </p>
            <Input
              type="text"
              placeholder="Enter social media title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Make sure the title is unique and easy to identify.
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
                ? "Update Social Media"
                : "Add Social Media"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
