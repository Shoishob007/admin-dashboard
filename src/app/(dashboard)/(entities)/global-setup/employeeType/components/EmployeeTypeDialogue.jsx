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

export const EmployeeTypeDialogue = ({
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
          <DialogTitle>{isEditing ? "Edit Employee Type" : "Add an Employee Type"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {isEditing
                ? "Update the employee type you want to edit. For example: Full-Stack, Backend, Frontend etc."
                : "Please enter the title of the new Employee type you want to add. For example: Full-time , Part-time , Contructual etc."}
            </p>
            <Input
              type="text"
              placeholder="Enter employee type"
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
                ? "Update Employee Type"
                : "Add Employee Type"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};