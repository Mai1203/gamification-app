'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { createUserIfNotExists } from "@/app/services/userService";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import Carousel from "../ui/dashboard/carousel";
import Recommendations from "../ui/dashboard/recommendations";
import Card from "../ui/dashboard/card-score"

export default function Page() {
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const email = user.primaryEmailAddress?.emailAddress;
    const fullName = user.fullName || "";

    if (email) {
      createUserIfNotExists(user.id, fullName, email);
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return(
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <DotLottieReact
          autoplay
          loop
          src="/animation/loaded.json" 
          className="w-64 h-64"
        />
        <p className="text-indigo-600 font-medium text-lg">Cargando usuario...</p>
      </div>
    );
  }

  return (
    <div className="max-h-[780px] overflow-y-auto pr-2">
      <h1 className="text-2xl font-bold m-5 dark:text-white">¡Hola, {user?.firstName}!</h1>
      <Card />
      <Carousel />
      <Recommendations />
    </div>
  );
}