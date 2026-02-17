import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import {ClerkProvider} from "@clerk/nextjs";
import { neobrutalism } from '@clerk/themes'
const inter = Inter({ subsets: ["latin"]});


export const metadata = {
  title: "Ai Recipe Platform",
  description: "",
};

export default function RootLayout({ children }) {
  return (
     <ClerkProvider appearance={{baseTheme:neobrutalism}}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      ><Header/>
        <main className="min-h-screen">{children}</main>
        <footer className="py-8 px-4 border-t">
          <div className="max-w-6xl mx-auto flex justify-centeritems-center">
          
          </div>
        </footer>
      </body>
    </html>
    </ClerkProvider>
  );
}   
