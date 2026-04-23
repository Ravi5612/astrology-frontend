"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Header, Footer } from "@repo/ui";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import ToastProvider from "./ToastProvider";
import FloatingChatButton from "../features/chat/FloatingChatButton";
import { merchantSocket } from "@/lib/socket";
import PlatformReviewModal from "../features/reviews/PlatformReviewModal";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const isAdminRoute = pathname?.startsWith("/admin");
  const isChatRoom = pathname?.includes("/chat/room");
  const isHomePage = pathname === "/";
  const { isClientAuthenticated, clientUser, clientLogout, clientBalance } = useAuthStore();
  const { cartCount } = useCartStore();


  useEffect(() => {
    setMounted(true);
    console.log("🌊 [Main App] ClientLayout mounted - WebSocket active:", merchantSocket.id || "Connecting...");
  }, []);

  // Show review modal after 10s on homepage for logged-in users (every visit)
  useEffect(() => {
    if (!mounted || !isClientAuthenticated || !isHomePage) return;

    const timer = setTimeout(() => {
      setShowReviewModal(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, [mounted, isClientAuthenticated, isHomePage]);

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
      {mounted && showReviewModal && (
        <PlatformReviewModal
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          userName={clientUser?.name?.split(" ")[0]}
        />
      )}
      {!isAdminRoute && !isChatRoom && <Footer />}
    </div>
  );
}


