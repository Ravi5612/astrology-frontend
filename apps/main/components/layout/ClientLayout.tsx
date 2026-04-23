"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Header, Footer } from "@repo/ui";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import ToastProvider from "./ToastProvider";
import FloatingChatButton from "../features/chat/FloatingChatButton";
import { merchantSocket } from "@/lib/socket";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const isAdminRoute = pathname?.startsWith("/admin");
  const isChatRoom = pathname?.includes("/chat/room");
  const { isClientAuthenticated, clientUser, clientLogout, clientBalance } = useAuthStore();
  const { cartCount } = useCartStore();


  useEffect(() => {
    setMounted(true);
    console.log("🌊 [Main App] ClientLayout mounted - WebSocket active:", merchantSocket.id || "Connecting...");
    // alert("Main App Code Loaded!"); // Only for extreme debugging
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {mounted && <ToastProvider />}
      {!isAdminRoute && !isChatRoom && (
        <Header
          authState={isClientAuthenticated}
          userData={clientUser}
          logoutHandler={clientLogout}
          balance={clientBalance}
          cartCount={cartCount}
        />
      )}
      <main suppressHydrationWarning className="flex-1">{children}</main>
      {mounted && !isAdminRoute && !isChatRoom && <FloatingChatButton />}
      {!isAdminRoute && !isChatRoom && <Footer />}
    </div>
  );
}


