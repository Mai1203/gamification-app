'use client';
import { Suspense } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from 'next/navigation';

import { useModulesWithProgress } from '@/app/hooks/useModulesWithProgress';
import { Header } from '@/app/ui/home/Header';
import Navbar from '@/app/ui/learning/navbar';
import Loading from '@/app/ui/loading';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams(); 
  const moduleId = searchParams.get("module") || "html";
  const modules = useModulesWithProgress(); 
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
      className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-black dark:via-black dark:to-black"
    >
      <div className="hidden dark:block fixed inset-0 z-0">
        <div className="absolute top-[5%] left-[5%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-purple-600 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-[5%] right-[5%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-indigo-600 rounded-full blur-3xl opacity-30" />
      </div> 

      <div className="relative z-10">
        <Header />
        <main className="container mx-auto py-8">
          <Suspense fallback={<Loading />}>
            <LayoutContent>{children}</LayoutContent>
          </Suspense>
        </main>
      </div>
    </motion.div>
  );
}