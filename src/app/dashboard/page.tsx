'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { createUserIfNotExists } from "@/app/services/userService";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import Carousel from "../ui/dashboard/carousel";
import Recommendations from "../ui/dashboard/recommendations";
import Card from "../ui/dashboard/card-score";
import AnimationLoaded from "../ui/dashboard/animationLoaded";

export default function Page() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [minLoadingDone, setMinLoadingDone] = useState(false);
  const [showGuestBanner, setShowGuestBanner] = useState(true);

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !user) return;

    const email = user.primaryEmailAddress?.emailAddress;
    const fullName = user.fullName || "";

    if (email) {
      createUserIfNotExists(user.id, fullName, email);
    }
  }, [isLoaded, isSignedIn, user]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMinLoadingDone(true);
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  if (!minLoadingDone || !isLoaded) {
    return <AnimationLoaded />;
  }

  return (
    <div className="max-h-[780px] overflow-y-auto pr-2">
      {/* Banner superior único para invitados */}
      {!isSignedIn && showGuestBanner && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border-b border-blue-200 dark:border-gray-700 p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-blue-800 dark:text-blue-300">¡Desbloquea todas las funciones!</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Regístrate para guardar tu progreso y ganar insignias
              </p>
            </div>
            <div className="flex gap-2">
              <SignInButton mode="modal">
                <button className="text-sm bg-white border border-blue-300 text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg transition">
                  Iniciar sesión
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition">
                  Crear cuenta
                </button>
              </SignUpButton>
            </div>
            <button 
              onClick={() => setShowGuestBanner(false)}
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold m-5 dark:text-white">
        {isSignedIn ? `¡Hola, ${user?.firstName}!` : "¡Bienvenido a EdoCode!"}
      </h1>

      <div className="mb-6">
        {isSignedIn ? (
          <Card />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 text-center border border-dashed border-gray-200 dark:border-gray-700">
            <div className="inline-block bg-gray-100 dark:bg-gray-700 rounded-full p-3 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-1 dark:text-gray-200">Tu progreso de aprendizaje</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              Registrate para ver tus estadísticas completas
            </p>
          </div>
        )}
      </div>

      <Carousel />
      
      <div className="mt-6">
        {isSignedIn ? (
          <Recommendations />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 mt-10">
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-300">Contenido recomendado</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Descubre lecciones personalizadas cuando inicies sesión
            </p>
            <div className="flex justify-center">
              <SignUpButton mode="modal">
                <button className="text-sm flex items-center bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Comenzar ahora
                </button>
              </SignUpButton>
            </div>
          </div>
        )}
      </div>

      {/* Sección de exploración */}
      <div className="mt-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-indigo-100 dark:border-gray-700">
        <div className="flex items-start">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-indigo-800 dark:text-indigo-300 mb-2">Aprende CSS Creativo</h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
              ¡Juega con colores, formas y estilos mientras aprendes CSS como nunca antes!
            </p>
            <button 
              onClick={() => router.push("/dashboard/css")}
              className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
            >
              Explorar módulo
            </button>
          </div>
          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}