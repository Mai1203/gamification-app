'use client';
import { motion } from "framer-motion";
import { Header } from '@/app/ui/home/Header';
import Sidenav from '@/app/ui/dashboard/sidenav';

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100  dark:from-[#424242] dark:via-[#0D0D0D] dark:to-[#4d4d4d]"
    >
      <Header />
      <main className="container mx-auto  py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Sidenav />
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="lg:col-span-9"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}