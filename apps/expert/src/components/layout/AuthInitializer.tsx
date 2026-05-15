"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export const AuthInitializer = ({
    children,
    initialUser = null
}: {
    children: React.ReactNode,
    initialUser?: any
}) => {
    const { login, refreshAuth } = useAuthStore();
    const pathname = usePathname();
    const authCheckRef = useRef(false);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (authCheckRef.current) return;

        const initAuth = async () => {
            if (initialUser) {
                login("", initialUser);
                return;
            }

            const publicPaths = ["/", "/register", "/forgot-password", "/reset-password", "/verify-email", "/verify-ip"];
            const isPublic = publicPaths.includes(pathname || "/");
            
            if (isPublic) {
                return;
            }

            await refreshAuth();
        };

        authCheckRef.current = true;
        initAuth();
    }, [login, refreshAuth, initialUser, pathname]);

    if (!isMounted) {
        return null;
    }

    return <>{children}</>;
};
