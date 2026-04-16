"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, type ReactNode } from "react";

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, 
            refetchOnWindowFocus: false, 
          },
        },
      })
  );

  useState(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isMounted && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};
