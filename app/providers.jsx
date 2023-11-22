"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

const Providers = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={2000}
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      preventDuplicate
      dense
    >
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProvider>
    </SnackbarProvider>
  );
};
export default Providers;
