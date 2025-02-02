"use client";

import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import FloatingActionButton from "@/components/ui/floatingButton";
import { House, Edit, Trash, CircleHelp } from "lucide-react";
import LoadingSkeleton from "../faqs/components/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import RichTextEditor from "../components/RichTextEditor";

const TermsAndConditions = () => {
  const [terms, setTerms] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingDescription, setEditingDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/terms-and-conditions`,
          {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Fetched terms ::", data);
        setTerms(data.docs);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "ourDestructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTerms();
  }, [session?.access_token]);

  const handleAddTerm = async () => {
    if (!newTitle || !newDescription) {
      toast({
        title: "Error",
        description: "Please fill in both fields.",
        variant: "ourDestructive",
      });
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/terms-and-conditions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            title: newTitle,
            description: newDescription,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to add the term");
      const { doc: newTerm } = await response.json();
      setTerms((prevTerms) => [...prevTerms, newTerm]);
      setNewTitle("");
      setNewDescription("");
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Term added successfully!",
        variant: "ourSuccess",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "ourDestructive",
      });
    }
  };

  const handleEditTerm = (id) => {
    const termToEdit = terms.find((term) => term.id === id);
    setEditingTitle(termToEdit.title);
    setEditingDescription(termToEdit.description);
    setEditingId(id);
  };

  const handleUpdateTerm = async () => {
    if (!editingId) return;

    try {
      const updatedTermData = {
        title: editingTitle.trim(),
        description: editingDescription.trim(),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/terms-and-conditions/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(updatedTermData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update term");
      }

      const { doc: updatedTerm } = await response.json();

      setTerms((prevTerms) =>
        prevTerms.map((term) =>
          term.id === editingId ? { ...term, ...updatedTerm } : term
        )
      );

      setEditingTitle("");
      setEditingDescription("");
      setEditingId(null);

      toast({
        title: "Success",
        description: "Term updated successfully!",
        variant: "ourSuccess",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "ourDestructive",
      });
    }
  };

  const handleDeleteTerm = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/terms-and-conditions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete the term");

      const updatedTerms = terms.filter((term) => term.id !== id);
      setTerms(updatedTerms);
      toast({
        title: "Success",
        description: "The term deleted successfully!",
        variant: "ourSuccess",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "ourDestructive",
      });
    }
  };

  return (
    <>
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4">
        <Breadcrumb className="min-w-24 mt-4 sm:mt-0">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <House className="w-4 h-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/terms-and-conditions">
                Terms and Conditions
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="container mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        {/* Header */}
        <header className="">
          <div className="flex items-center gap-1 mx-auto justify-center">
            <Badge
              variant="secondary"
              className={"flex items-center gap-1 font-medium"}
            >
              <CircleHelp className="size-3" />
              Terms and Conditions
            </Badge>
          </div>
          <h1 className="text-xl font-bold text-center text-gray-800 my-2">
            Terms and Conditions
          </h1>
          <p className="text-sm text-center font-light mb-3 text-gray-600">
            Add and manage your company terms and conditions
          </p>
        </header>

        <div className="container mx-auto">
          <div className="bg-white rounded-lg p-6 flex flex-col gap-2">
            {isLoading ? (
              <LoadingSkeleton />
            ) : terms?.length > 0 ? (
              terms?.map((term) => (
                <div key={term.id} className="border-b border-gray-200 pb-4">
                  {editingId === term.id ? (
                    <div className="space-y-2">
                      <Input
                        placeholder="Title"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="placeholder:text-sm"
                      />
                      <RichTextEditor
                        value={editingDescription}
                        onChange={setEditingDescription}
                      />
                      <div className="flex justify-end items-center gap-2">
                        <Button
                          size="xs"
                          className="border border-emerald-400 bg-emerald-100 hover:bg-emerald-100 hover:text-emerald-500 text-emerald-500 text-xs min-w-16"
                          onClick={handleUpdateTerm}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="xs"
                          className="border border-blue-400 bg-blue-100 hover:bg-blue-100 hover:text-blue-500 text-blue-500 text-xs min-w-16"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-md font-medium text-gray-800">
                          {term.title}
                        </h2>
                        <div
                          className="prose text-gray-700 leading-relaxed text-[13px] ml-2"
                          dangerouslySetInnerHTML={{ __html: term.description }}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="xs"
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => handleEditTerm(term.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => handleDeleteTerm(term.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-700">
                No data about terms and conditions.
              </p>
            )}
          </div>
        </div>

        <FloatingActionButton
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          func="Add Terms"
          handleAdd={handleAddTerm}
          newQuestion={newTitle}
          setNewQuestion={setNewTitle}
          newAnswer={newDescription}
          setNewAnswer={setNewDescription}
        />

        <footer className="">
          <p className="text-center text-gray-600 text-xs">
            &copy; 2025 FintechHub Limited. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default TermsAndConditions;
