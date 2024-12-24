"use client";
import { AxiosError } from "axios";
import { QueryClientProvider } from "@tanstack/react-query";
import "@tanstack/react-query";

import { getQueryClient } from "./get-query-client";
import { useRouter } from "next/navigation";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}

export default function QueryClientProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const queryClient = getQueryClient(router);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
