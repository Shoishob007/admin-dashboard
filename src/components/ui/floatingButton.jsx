"use client";

import React from "react";
import { Button } from "./button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/app/(dashboard)/components/RichTextEditor";

const FloatingActionButton = ({
  isDialogOpen,
  setIsDialogOpen,
  func,
  handleAdd,
  newQuestion,
  setNewQuestion,
  newAnswer,
  setNewAnswer,
}) => {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full size-12 shadow-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                  aria-label="Add Doc"
                >
                  <span className="text-2xl">+</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{func}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Title"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="placeholder:text-sm"
                  />
                  <RichTextEditor
                    value={newAnswer}
                    onChange={setNewAnswer}
                  />
                  <Button
                    onClick={handleAdd}
                    className="border border-emerald-400 bg-emerald-100 hover:bg-emerald-100 hover:text-emerald-500 text-emerald-500 text-xs min-w-16"
                  >
                    Add {func}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </TooltipTrigger>
          <TooltipContent>
            <p>{func}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default FloatingActionButton;