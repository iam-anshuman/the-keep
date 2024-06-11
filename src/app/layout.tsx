import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provide";
import { NoteProvider } from "@/context/NoteContext";
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Keep",
  description: "A note-taking app for developers.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <NoteProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </NoteProvider>
      </body>
    </html>
  );
}
