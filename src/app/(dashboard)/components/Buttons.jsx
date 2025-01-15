import { Button } from "@/components/ui/button";
import React from "react";

export const DetailsButton = () => {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="p-2 hover:bg-gray-700 hover:text-gray-200 border border-gray-700 transition-all duration-300"
      >
        Edit Details
      </Button>
    </>
  );
};

export const DeleteButton = ({user}) => {
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="p-2 hover:bg-red-700  hover:text-white border border-red-700 transition-all duration-300"
      >
        {`Delete ${user}`}
      </Button>
    </>
  );
};
