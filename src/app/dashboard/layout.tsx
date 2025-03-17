'use client';
import { Header } from '@/app/ui/Header';
import { motion } from "framer-motion";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100"
    >
      <Header />

      {children}
    </motion.div>
  );
}