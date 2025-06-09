"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      
    </ProtectedRoute>
  );
}
