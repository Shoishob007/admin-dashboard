import { toast } from "@/hooks/use-toast";

export const addActivityFunc = async ({
  title,
  accessToken,
  setIsDialogOpen,
  setLoading
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/academic-activity-types`,
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
        description: "New academic activity added successfully.",
        variant: "ourSuccess",
      });
      setIsDialogOpen(false);
    } else {
      toast({
        title: "Failed!",
        description: "Failed to add new academic activity",
        variant: "ourDestructive",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    toast({
      title: "Failed!",
      description: "An error occurred.",
      variant: "ourDestructive",
    });
  } finally {
    setLoading(false);
  }
};

export const editActivityFunc = async ({
  id,
  updatedTitle,
  accessToken,
  setData,
  setIsDialogOpen,
  setLoading
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/academic-activity-types/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: updatedTitle }),
      }
    );
    if (response.ok) {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, title: updatedTitle } : item
        )
      );
      toast({
        title: "Success!",
        description: "Academic activity updated successfully.",
        variant: "ourSuccess",
      });
      setIsDialogOpen(false);
    } else {
      toast({
        title: "Failed!",
        description: "Failed to update academic activity",
        variant: "ourDestructive",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    toast({
      title: "Failed!",
      description: "An error occurred.",
      variant: "ourDestructive",
    });
  } finally {
    setLoading(false);
  }
};

export const deleteActivityFunc = async ({ id, accessToken, setData }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/academic-activity-types/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete the document.");
    }

    setData((prevData) => prevData.filter((item) => item.id !== id));
    toast({
      title: "Success!",
      description: "Deleted selected file",
      variant: "ourSuccess",
    });
  } catch (error) {
    console.error("Error deleting document:", error);
    toast({
      title: "Failed!",
      description: "Failed to delete the document. Please try again.",
      variant: "ourDestructive",
    });
  }
};