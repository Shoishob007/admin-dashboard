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

const AddEmployeeTypes = ({ employeeTypes, accessToken }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeeTypeExists = employeeTypes.some(
      (employeeType) => employeeType.title.toLowerCase() === title.toLowerCase()
    );

    if (employeeTypeExists) {
      alert("This employee type already exists.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/employee-types`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        }
      );
      if (response.ok) {
        toast({
          title: "Success!",
          description: "New employee type added successfully.",
          variant: "ourSuccess",
        });
        setTitle("");
        setIsDialogOpen(false);
      } else {
        toast({
          title: "Failed!",
          description: "Failed to add new employee type",
          variant: "ourDestructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    } finally {
      setLoading(false);
    }
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
            <h3 className="font-medium">Add a new employee type</h3>
            <p className="text-sm text-muted-foreground">
              Click to add a new employee type with necessary information and
              save it
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add a new employee type</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Please enter the title of the new Employee type you want to add.
                For example: Full-time , Part-time , Contructual etc.
              </p>
              <Input
                type="text"
                placeholder="Enter Employee type title"
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
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Employee Type"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddEmployeeTypes;
