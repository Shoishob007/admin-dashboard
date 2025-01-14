import { toast } from "@/hooks/use-toast";

export const addSkillFunc = async ({
    title,
    accessToken,
    setIsDialogOpen,
    setLoading
}) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/skills`,
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
                description: "Skill added successfully.",
                variant: "ourSuccess",
            });
            setIsDialogOpen(false);
        } else {
            toast({
                title: "Failed!",
                description: "Failed to add skill.",
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

export const editSkillFunc = async ({
    id,
    updatedTitle,
    accessToken,
    setData,
    setIsDialogOpen,
    setLoading
}) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/skills/${id}`,
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
                description: "Skill updated successfully.",
                variant: "ourSuccess",
            });
            setIsDialogOpen(false);
        } else {
            toast({
                title: "Failed!",
                description: "Failed to update the skill.",
                variant: "ourDestructive",
            });
        }
    } catch (error) {
        console.error("Error updating skill:", error);
        toast({
            title: "Failed!",
            description: "An error occurred while updating the skill.",
            variant: "ourDestructive",
        });
    } finally {
        setLoading(false);
    }
};

export const deleteSkillFunc = async ({ id, accessToken, setData }) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/skills/${id}`,
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
            description: "Deleted selected document.",
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