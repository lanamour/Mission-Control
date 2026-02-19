import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SidebarProvider } from "@/components/SidebarProvider";
import { TopBar } from "@/components/TopBar";
import { QuickActions } from "@/components/QuickActions";
import { ChatWidget } from "@/components/ChatWidget";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mission Control",
  description: "Agent Network Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased`}
      >
        <ThemeProvider>
          <SidebarProvider>
            <div className="h-screen bg-[var(--mc-bg)]">
              <Sidebar />
              <main className="absolute top-0 bottom-0 left-0 md:left-60 right-0 flex flex-col">
                <div className="sticky top-0 z-40 bg-[var(--mc-bg)] border-b border-[var(--mc-border)] px-4 md:px-8 pt-4 pb-3">
                  <TopBar />
                </div>
                <div className="flex-1 overflow-auto p-4 md:p-8">
                  {children}
                </div>
              </main>
              <QuickActions />
              <ChatWidget />
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
