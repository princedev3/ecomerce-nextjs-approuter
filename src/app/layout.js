import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CreateContext } from "@/libs/ContextApi";
import { NextAuthProvider } from "@/libs/AuthProvider";
import toast, { Toaster } from 'react-hot-toast';
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className } md:w-[720px]  lg:w-[1024px] xl:w-[1200px]  overflow-x-hidden mx-auto`}>
        <NextAuthProvider>
        <CreateContext>
      <Navbar/>
        {children}
        <Footer/>
        </CreateContext>
        </NextAuthProvider>
        <Toaster/>
        
        </body>
    </html>
  );
}
