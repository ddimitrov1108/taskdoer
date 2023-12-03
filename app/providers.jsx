"use client";
import { NotistackProvider } from "@/components/providers";
import { SessionProvider } from "next-auth/react";

const Providers = ({ children }) => {
  return (
    <NotistackProvider>
      <SessionProvider>{children}</SessionProvider>
    </NotistackProvider>
  );
};
export default Providers;
