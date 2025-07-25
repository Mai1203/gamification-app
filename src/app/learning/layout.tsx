'use client';
import { Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from 'next/navigation';

import { useModulesWithProgress } from '@/app/hooks/useModulesWithProgress';
import { Header } from '@/app/ui/home/Header';
import Navbar from '@/app/ui/learning/navbar';
import Loading from '@/app/ui/loading';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams(); // Uso normal
  const moduleId = searchParams.get("module") || "html";
  const modules = useModulesWithProgress(); // Uso normal
  const currentModule = modules.find((m) => m.id === moduleId);

  if (!currentModule) return null;

  return (
    <>
      <Navbar 
        moduleId={currentModule.id}
        title={currentModule.title}
        lessons={currentModule.lessons}
      />
      {children}
    </>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-[#424242] dark:via-[#0D0D0D] dark:to-[#4d4d4d]"
    >
      <Header />
      <main className="container mx-auto py-8">
        <Suspense fallback={<Loading />}> {/* Envolver en Suspense */}
          <LayoutContent>{children}</LayoutContent>
        </Suspense>
      </main>
    </motion.div>
  );
}