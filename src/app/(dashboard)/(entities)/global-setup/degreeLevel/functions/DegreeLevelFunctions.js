import { toast } from "@/hooks/use-toast";

export const addDegreeLevelFunc = async ({
    title,
    accessToken,
    setIsDialogOpen,
    setLoading
}) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/degree-levels`,
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
                description: "New degree level added successfully.",
                variant: "ourSuccess",
            });
            setTitle("");
            setIsDialogOpen(false);
        } else {
            toast({
                title: "Failed!",
                description: "Failed to add new degree level",
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

export const editDegreeLevelFunc = async ({
    id,
    updatedTitle,
    accessToken,
    setData,
    setIsDialogOpen,
    setLoading
}) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/degree-levels`,
            {
                method: "POST",
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
                description: "New degree level added successfully.",
                variant: "ourSuccess",
            });
            setIsDialogOpen(false);
        } else {
            toast({
                title: "Failed!",
                description: "Failed to add new degree level",
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

export const deleteDegreeLevelFunc = async ({ id, accessToken, setData }) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/degree-levels/${id}`, {
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