import { toast } from "@/hooks/use-toast";

export const addFieldOfStudyFunc = async ({
    title,
    accessToken,
    setIsDialogOpen,
    setLoading
}) => {
    try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/field-of-studies`,
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
              description: "New field of study added successfully.",
              variant: "ourSuccess",
            });
            setIsDialogOpen(false);
          } else {
            toast({
              title: "Failed!",
              description: "Failed to add new field of study",
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

export const editFieldOfStudyFunc = async ({
    id,
    updatedTitle,
    accessToken,
    setData,
    setIsDialogOpen,
    setLoading
}) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/field-of-studies/${id}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: updatedTitle  }),
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
                description: "Field of study updated successfully.",
                variant: "ourSuccess",
            });
            setIsDialogOpen(false);
        } else {
            toast({
                title: "Failed!",
                description: "Failed to update field of study",
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

export const deleteFieldOfStudyFunc = async ({ id, accessToken, setData }) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/field-of-studies/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

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
        alert("Failed to delete the document. Please try again.");
        toast({
            title: "Failed!",
            description: "Failed to delete the document. Please try again.",
            variant: "ourDestructive",
        });
    }
};