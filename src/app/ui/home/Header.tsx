'use client';

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  ClerkLoaded,
} from "@clerk/nextjs";
import { Code2, UserPlus, LogIn, Menu, X } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/app/ui/theme/ThemeToggle";
import { useState } from "react";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-sm dark:shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Code2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              EdoCode
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6 dark:text-white" /> : <Menu className="h-6 w-6 dark:text-white" />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />

            <ClerkLoaded>
              <SignedOut>
                <SignInButton forceRedirectUrl="/dashboard" mode="modal">
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-zinc-800 rounded-lg transition-all duration-300 cursor-pointer">
                    <LogIn className="h-5 w-5" />
                    Iniciar Sesión
                  </button>
                </SignInButton>

                <SignUpButton forceRedirectUrl="/dashboard" mode="modal">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:bg-indigo-800 dark:from-indigo-500 dark:to-purple-500 dark:hover:bg-indigo-700 rounded-lg transition-all duration-300 cursor-pointer">
                    <UserPlus className="h-5 w-5" />
                    Registrarse
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 items-start">
            <ThemeToggle />

            <ClerkLoaded>
              <SignedOut>
                <SignInButton forceRedirectUrl="/dashboard" mode="modal">
                  <button className="w-full flex items-center gap-2 px-4 py-2 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-zinc-800 rounded-lg transition-all duration-300 cursor-pointer">
                    <LogIn className="h-4 w-4" />
                    Iniciar Sesión
                  </button>
                </SignInButton>

                <SignUpButton forceRedirectUrl="/dashboard" mode="modal">
                  <button className="w-full flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:bg-indigo-800 dark:from-indigo-500 dark:to-purple-500 dark:hover:bg-indigo-700 rounded-lg transition-all duration-300 cursor-pointer">
                    <UserPlus className="h-4 w-4" />
                    Registrarse
                  </button>
                </SignUpButton>
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </ClerkLoaded>
          </div>
        )}
      </div>
    </header>
  );
};
