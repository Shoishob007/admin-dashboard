import React from "react";
import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FloatingActionButton = ({ onClick, isInputVisible }) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onClick}
              className={`fixed bottom-6 right-6 bg-blue-500 text-white rounded-full size-12 shadow-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center ${
                isInputVisible ? "animate-rotate-in" : "animate-rotate-out"
              } `}
              aria-label="Add FAQ"
            >
              <span className="text-2xl transition-transform duration-300">
              {isInputVisible ? "×" : "+"}
            </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isInputVisible ? "Close" : "Add FAQs"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default FloatingActionButton;
