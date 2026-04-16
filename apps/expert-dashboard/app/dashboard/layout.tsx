"use client";
import React, { useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { ChatNotificationListener } from "@/components/notifications/ChatNotificationListener";
import { CallNotificationListener } from "@/components/notifications/CallNotificationListener";
import { LayoutProps } from "@/types/expert";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isAuthenticated, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !loading && !isAuthenticated) {
      router.push("/");
    }
  }, [isMounted, loading, isAuthenticated, router]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  if (!isMounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50" suppressHydrationWarning>
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600" suppressHydrationWarning></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <ChatNotificationListener />
      <CallNotificationListener />
      <div className="min-h-screen flex bg-[#FFF9F4] relative" suppressHydrationWarning>
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Section */}
        <div className="flex-1 min-w-0 lg:ml-64 flex flex-col min-h-screen">
          <Header toggleSidebar={toggleSidebar} />
          <main className="p-4 sm:p-6 text-black flex-1"> {children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;


