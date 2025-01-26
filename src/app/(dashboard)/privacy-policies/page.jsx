"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
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
import RichTextEditor from "../components/RichTextEditor";

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState([]);
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
    const fetchPolicies = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/privacy-policies`,
          {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Fetched policies ::", data);
        setPolicy(data.docs);
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

    fetchPolicies();
  }, [session?.access_token]);

  const handleAddPolicy = async () => {
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
        `${process.env.NEXT_PUBLIC_API_URL}/api/privacy-policies`,
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

      if (!response.ok) throw new Error("Failed to add the policy");
      const { doc: newPolicy } = await response.json();
      setPolicy((prevPolicy) => [...prevPolicy, newPolicy]);
      setNewTitle("");
      setNewDescription("");
      setIsDialogOpen(false);
      toast({
        title: "Success",
        description: "Policy added successfully!",
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

  const handleEditPolicy = (id) => {
    const policyToEdit = policy.find((policy) => policy.id === id);
    setEditingTitle(policyToEdit.title);
    setEditingDescription(policyToEdit.description);
    setEditingId(id);
  };

  const handleUpdatePolicy = async () => {
    if (!editingId) return;

    try {
      const updatedPolicyData = {
        title: editingTitle.trim(),
        description: editingDescription.trim(),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/privacy-policies/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(updatedPolicyData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update policy");
      }

      const { doc: updatedPolicy } = await response.json();

      setPolicy((prevPolicy) =>
        prevPolicy.map((policy) =>
          policy.id === editingId ? { ...policy, ...updatedPolicy } : policy
        )
      );

      setEditingTitle("");
      setEditingDescription("");
      setEditingId(null);

      toast({
        title: "Success",
        description: "Policy updated successfully!",
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

  const handleDeletePolicy = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/privacy-policies/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete the policy");

      const updatedPolicy = policy.filter((policy) => policy.id !== id);
      setPolicy(updatedPolicy);
      toast({
        title: "Success",
        description: "The policy deleted successfully!",
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
              <BreadcrumbLink href="/privacy-policies">
                Privacy Policy
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="container mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <header className="">
          <div className="flex items-center gap-1 mx-auto justify-center">
            <Badge
              variant="secondary"
              className={"flex items-center gap-1 font-medium"}
            >
              <CircleHelp className="size-3" />
              Privacy Policies
            </Badge>
          </div>
          <h1 className="text-xl font-bold text-center text-gray-800 my-2">
            Privacy Policies
          </h1>
          <p className="text-sm text-center font-light mb-3 text-gray-600">
            Add and manage your company privacy policy to incorporate with the
            terms and conditions
          </p>
        </header>

        <div className="container mx-auto">
          <div className="bg-white rounded-lg p-6 flex flex-col gap-2">
            {isLoading ? (
              <LoadingSkeleton />
            ) : policy?.length > 0 ? (
              policy?.map((policy) => (
                <div key={policy.id} className="border-b border-gray-200 pb-4">
                  {editingId === policy.id ? (
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
                          onClick={handleUpdatePolicy}
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
                          {policy.title}
                        </h2>
                        <div
                          className="prose text-gray-700 leading-relaxed text-[13px] ml-2"
                          dangerouslySetInnerHTML={{
                            __html: policy.description,
                          }}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="xs"
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => handleEditPolicy(policy.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => handleDeletePolicy(policy.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-700">No data about privacy policies.</p>
            )}
          </div>
        </div>

        <FloatingActionButton
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          func="Add Policies"
          handleAdd={handleAddPolicy}
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

export default PrivacyPolicy;
