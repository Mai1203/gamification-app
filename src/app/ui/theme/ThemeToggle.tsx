'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = localStorage.theme === 'dark' ||
      (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    setIsDark(dark);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const isNowDark = html.classList.toggle('dark');
    localStorage.theme = isNowDark ? 'dark' : 'light';
    setIsDark(isNowDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="w-full md:w-auto flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-700 transition cursor-pointer"
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
      )}
      {/* Solo visible en mobile */}
      <span className="text-sm text-gray-700 dark:text-gray-300 md:hidden">
        {isDark ? 'Modo claro' : 'Modo oscuro'}
      </span>
    </button>
  );
};
