"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar"; // Import your Navbar component 
import { AppProvider } from "@/app/context/AppContext"; // Import AppContext provider
import "./globals.css"; // Global styles
import Head from "next/head"; // Import Head for document metadata management

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProvider>
          <Head>
            {/* Manually add metadata */}
            <title>My Store</title>
            <meta name="description" content="Your go-to online store for amazing deals" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta charSet="UTF-8" />
          </Head>
          <Navbar />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
