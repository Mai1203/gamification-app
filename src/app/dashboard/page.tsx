'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { createUserIfNotExists } from "@/app/services/userService";
import { SignUpButton } from "@clerk/nextjs";


import Carousel from "../ui/dashboard/carousel";
import Recommendations from "../ui/dashboard/recommendations";
import Card from "../ui/dashboard/card-score"
import AnimationLoaded from "../ui/dashboard/animationLoaded";

export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [minLoadingDone, setMinLoadingDone] = useState(false);

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
      {isSignedIn ? (
        <h1 className="text-2xl font-bold m-5 dark:text-white">¡Hola, {user?.firstName}!</h1>
      ):(
        <h1 className="text-2xl font-bold m-5 dark:text-white">¡Bienvenido a EdoCode!</h1>
      )}

      <div className="mb-6">
        {isSignedIn ? (
          <Card />
        ):(
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center border-2 border-dashed border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold mb-2 dark:text-gray-300">Regístrate para ver tu progreso</h3>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              Crea una cuenta para guardar tus estadísticas y ganar insignias
            </p>
            <SignUpButton mode="modal">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition cursor-pointer">
                Crear cuenta
              </button>
            </SignUpButton>
          </div>
        )}
      </div>
      <Carousel />
      <Recommendations />
    </div>
  );
}