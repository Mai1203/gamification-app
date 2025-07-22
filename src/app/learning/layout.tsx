'use client';
import { motion } from "framer-motion";
import { useSearchParams } from 'next/navigation';

import { useModulesWithProgress } from '@/app/hooks/useModulesWithProgress';
import { Header } from '@/app/ui/home/Header';
import Navbar from '@/app/ui/learning/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const moduleId = searchParams.get("module") || "html"; // valor por defecto
  const modules = useModulesWithProgress();

  const currentModule = modules.find((m) => m.id === moduleId);

  if (!currentModule) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-[#424242] dark:via-[#0D0D0D] dark:to-[#4d4d4d]"
    >
      <Header />
      <main className="container mx-auto  py-8">
        <Navbar 
          moduleId={currentModule.id}
          title={currentModule.title}
          lessons={currentModule.lessons}
        />
        {children}
      </main>
    </motion.div>
  );
}