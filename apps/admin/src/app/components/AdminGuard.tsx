"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated || !user) {
        console.log("AdminGuard - No auth, redirecting to login");
        window.location.href = "/";
        return;
      }

      console.log("AdminGuard - Current User:", user);

      const roles = user?.roles || [];
      const isAdmin =
        user?.role === 'admin' ||
        user?.role === 'ADMIN' ||
        roles.some((r: any) =>
          (typeof r === 'string' ? r : r.name).toUpperCase() === "ADMIN"
        );

      console.log("AdminGuard - Is Admin:", isAdmin, "Role:", user?.role, "Roles:", roles);

      if (!isAdmin) {
        console.error("Access denied: User does not have ADMIN role");
        router.replace("/");
      }
    }
  }, [isAuthenticated, user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}




