import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { addSocialMediaFunc } from "../functions/SocialMediaFunctions";
import { SocialMediaDialogue } from "../components/SocialMedialDialogue";

const AddSocialMedia = ({ socialMedia, accessToken }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (title) => {
    const socialMediaExists = socialMedia.some(
      (socialMedium) => socialMedium.title.toLowerCase() === title.toLowerCase()
    );

    if (socialMediaExists) {
      alert("This platform already exists.");
      return;
    }

    setLoading(true);
    addSocialMediaFunc({ title, accessToken, setIsDialogOpen, setLoading });
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
            <h3 className="font-medium">Add a social media platform</h3>
            <p className="text-sm text-muted-foreground">
              Add a social media platform with necessary information and save it
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Dialog */}
      <SocialMediaDialogue
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        isEditing={false}
        loading={loading}
      />
    </div>
  );
};

export default AddSocialMedia;
