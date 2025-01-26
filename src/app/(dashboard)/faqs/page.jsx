"use client";

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { CircleHelp, House, Edit, Trash } from "lucide-react"; // Import icons
import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import LoadingSkeleton from "./components/LoadingSkeleton";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState("");
  const [editingAnswer, setEditingAnswer] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/faqs`,
          {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        const data = await response.json();
        console.log("Fetched FAQS::", data);
        setFaqs(data.docs);
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

    fetchFAQs();
  }, [session?.access_token]);

  const handleAddFAQ = async () => {
    if (!newQuestion || !newAnswer) {
      toast({
        title: "Error",
        description: "Please fill in both fields.",
        variant: "ourDestructive",
      });
      return;
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/faqs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ question: newQuestion, answer: newAnswer }),
        }
      );

      if (!response.ok) throw new Error("Failed to add FAQ");
      const { doc: newFAQ } = await response.json();
      setFaqs((prevFaqs) => [...prevFaqs, newFAQ]);
      setNewQuestion("");
      setNewAnswer("");
      setIsInputVisible(false);
      toast({
        title: "Success",
        description: "FAQ added successfully!",
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

  const handleEditFAQ = (id) => {
    const faqToEdit = faqs.find((faq) => faq.id === id);
    setEditingQuestion(faqToEdit.question);
    setEditingAnswer(faqToEdit.answer);
    setEditingId(id);
    setIsInputVisible(false); // Hide the add input when editing
  };

  const handleUpdateFAQ = async () => {
    if (!editingId) return;

    try {
      const updatedFAQData = {
        question: editingQuestion.trim(),
        answer: editingAnswer.trim(),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/faqs/${editingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(updatedFAQData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update FAQ");
      }

      const { doc: updatedFAQ } = await response.json();

      setFaqs((prevFaqs) =>
        prevFaqs.map((faq) =>
          faq.id === editingId ? { ...faq, ...updatedFAQ } : faq
        )
      );

      setEditingQuestion("");
      setEditingAnswer("");
      setEditingId(null);

      toast({
        title: "Success",
        description: "FAQ updated successfully!",
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

  const handleDeleteFAQ = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/faqs/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete FAQ");

      const updatedFaqs = faqs.filter((faq) => faq.id !== id);
      setFaqs(updatedFaqs);
      toast({
        title: "Success",
        description: "FAQ deleted successfully!",
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

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
    if (isInputVisible) {
      setNewQuestion("");
      setNewAnswer("");
    }
    setEditingId(null); // Reset editing state when toggling add input
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
              <BreadcrumbLink href="/faqs">FAQs</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="container mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <div className="flex items-center gap-1 mx-auto justify-center">
          <Badge
            variant="secondary"
            className={"flex items-center gap-1 font-medium"}
          >
            <CircleHelp className="size-3" />
            FAQs
          </Badge>
        </div>
        <h1 className="text-xl text-center font-bold my-2">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-center font-light mb-3 text-gray-600">
          Find questions and answers related to design system, purchase, updates
          or support
        </p>
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <Accordion type="single" collapsible>
            {faqs?.map((faq) => (
              <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                <AccordionTrigger className="bg-white hover:bg-gray-100 transition duration-200 rounded-md p-3">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-white border border-gray-200 rounded-md shadow-md">
                  {editingId === faq.id ? (
                    <div className="space-y-2">
                      <Input
                        placeholder="Question"
                        value={editingQuestion}
                        onChange={(e) => setEditingQuestion(e.target.value)}
                        className="placeholder:text-sm"
                      />
                      <Input
                        placeholder="Answer"
                        value={editingAnswer}
                        onChange={(e) => setEditingAnswer(e.target.value)}
                        className="placeholder:text-sm"
                      />
                      <div className="flex justify-end items-center gap-2">
                        <Button
                          size="xs"
                          className="border border-emerald-400 bg-emerald-100 hover:bg-emerald-100 hover:text-emerald-500 text-emerald-500 text-xs min-w-16"
                          onClick={handleUpdateFAQ}
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
                      <p>{faq.answer}</p>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="xs"
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => handleEditFAQ(faq.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => handleDeleteFAQ(faq.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <FloatingActionButton
          onClick={toggleInputVisibility}
          isInputVisible={isInputVisible}
          func= "Add FAQs"

        />

        <div
          className={`mt-4 transition-all duration-300 ease-in-out ${
            isInputVisible
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <Input
            placeholder="Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="mb-2 placeholder:text-sm"
          />
          <Input
            placeholder="Answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="mb-2 placeholder:text-sm"
          />
          <Button
            onClick={handleAddFAQ}
            className="border border-emerald-400 bg-emerald-100 hover:bg-emerald-100 hover:text-emerald-500 text-emerald-500 text-xs min-w-16"
          >
            Add FAQ
          </Button>
        </div>
      </div>
    </>
  );
};

export default FAQs;