import { Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { neobrutalism } from '@clerk/themes'
import { Toaster } from "@/components/ui/sonner";
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
});


export const metadata = {
  title: "Ai Recipe Platform",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} font-sans`}>
        <ClerkProvider appearance={{ baseTheme: neobrutalism }}>
          <Header />
          <main className="min-h-screen pt-16">
            <Toaster richColors />
            {children}
          </main>
          <footer className="py-8 px-4 border-t">
            <div className="max-w-6xl mx-auto flex justify-center items-center">
            </div>
          </footer>
        </ClerkProvider>
      </body>
    </html>
  );
}
