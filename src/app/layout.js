"use client";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import VerticalNavbar from "@/components/VerticalNavbar";

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <SessionProvider session={session}>
          <SidebarProvider>
            <div className="flex flex-col md:flex-row w-full">
              <AppSidebar />
              
              <div className="flex-1 flex flex-col">
                <VerticalNavbar />
                
                <main className="flex-1 px-4">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
