'use client';
import { Layout, Palette, House, FolderOpen, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useIsAdmin } from '@/app/hooks/useIsAdmin';

const links = [
  { name: 'Inicio', href: '/dashboard', icon: House },
  { name: 'HTML Básico', href: '/dashboard/html', icon: Layout },
  { name: 'CSS Creativo', href: '/dashboard/css', icon: Palette },
  { name: 'Proyectos', href: '/dashboard/projects', icon: FolderOpen },
];

export default function NavLinks() {
  const pathname = usePathname();
  const { isAdmin, loading } = useIsAdmin();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <motion.div
            key={link.name}
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98, transition: { duration: 0.2 } }}
          >
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
                'hover:bg-indigo-50 hover:text-black dark:hover:bg-zinc-800 dark:hover:text-white',
                {
                  'bg-indigo-600 text-white': pathname === link.href,
                  'text-gray-700 dark:text-gray-300': pathname !== link.href,
                }
              )}
            >
              <LinkIcon className="h-5 w-5" />
              <span>{link.name}</span>
            </Link>
          </motion.div>
        );
      })}
      
      {!loading && isAdmin && (
        <motion.div
          whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          whileTap={{ scale: 0.98, transition: { duration: 0.2 } }}
        >
          <Link
            href="/dashboard/admin"
            className={clsx(
              'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
              'hover:bg-indigo-50 hover:text-black dark:hover:bg-zinc-800 dark:hover:text-white',
              {
                'bg-indigo-600 text-white': pathname === '/admin',
                'text-gray-700 dark:text-gray-300': pathname !== '/admin',
              }
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Administración</span>
          </Link>
        </motion.div>
      )}
    </>
  );
}