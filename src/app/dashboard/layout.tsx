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
      className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-black dark:via-black dark:to-black overflow-hidden"
    >
      <div className="hidden dark:block fixed inset-0 z-0">
        <div className="absolute top-[5%] left-[5%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-purple-600 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-[5%] right-[5%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-indigo-600 rounded-full blur-3xl opacity-30" />
      </div> 

      <div className="relative z-10">
        <Header />
        <main className="container mx-auto py-8">
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
      </div>
    </motion.div>
  );
}