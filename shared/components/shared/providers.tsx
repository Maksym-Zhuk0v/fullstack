"use client";

import React from "react";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "../theme-provider";
import Header from "./Header";

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
        <Toaster />
      </ThemeProvider>
      <NextTopLoader />
    </>
  );
};
