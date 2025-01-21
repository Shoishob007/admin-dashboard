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
import { House, Plus, X } from "lucide-react";
import { useSession } from "next-auth/react";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
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
        if (!response.ok) throw new Error("Failed to fetch FAQs");
        const data = await response.json();
        console.log("Fetched FAQS::", data);
        setFaqs(data.docs);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "ourDestructive",
        });
      }
    };

    fetchFAQs();
  }, []);

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

      console.log(newQuestion, newAnswer)

    
      if (!response.ok) throw new Error("Failed to add FAQ");
      const newFAQ = await response.json();
      setFaqs([...faqs, newFAQ]);
      setNewQuestion("");
      setNewAnswer("");
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

  const handleEditFAQ = (index) => {
    const faqToEdit = faqs[index];
    setNewQuestion(faqToEdit.question);
    setNewAnswer(faqToEdit.answer);
    setEditingIndex(index);
  };

  const handleUpdateFAQ = async () => {
    if (editingIndex === null) return;

    try {
      const updatedFAQData = { question: newQuestion, answer: newAnswer };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/faqs/${faqs[editingIndex].id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(updatedFAQData),
        }
      );
      if (!response.ok) throw new Error("Failed to update FAQ");

      const updatedFaqs = faqs.map((faq, index) =>
        index === editingIndex ? updatedFAQData : faq
      );

      setFaqs(updatedFaqs);
      setNewQuestion("");
      setNewAnswer("");
      setEditingIndex(null);
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
    console.log(id)
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

      const updatedFaqs = faqs.filter((_, i) => i !== index);
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
      setEditingIndex(null);
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
              <BreadcrumbLink href="/faqs">FAQs</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="container mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-xl text-center font-bold mb-4">Frequently Asked Questions</h1>

        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.id} value={`faq-${index}`}>
              <AccordionTrigger className="bg-white hover:bg-gray-100 transition duration-200 rounded-md p-3">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-white border border-gray-200 rounded-md shadow-md">
                <div className="flex justify-between">
                  <p>{faq.answer}</p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => handleEditFAQ(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDeleteFAQ(faq.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Floating Action Button */}
        <FloatingActionButton onClick={toggleInputVisibility}>
          {isInputVisible ? (
            <X className="w-6 h-6" />
          ) : (
            <Plus className="w-6 h-6" />
          )}
        </FloatingActionButton>

        {/* Input Fields for Adding/Editing FAQ */}
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
            className="mb-2"
          />
          <Input
            placeholder="Answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="mb-2"
          />
          <Button
            onClick={editingIndex !== null ? handleUpdateFAQ : handleAddFAQ}
          >
            {editingIndex !== null ? "Update FAQ" : "Add FAQ"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default FAQs;
