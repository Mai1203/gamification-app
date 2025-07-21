'use client';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { createUserIfNotExists } from "@/app/services/userService";


import Carousel from "../ui/dashboard/carousel";
import Recommendations from "../ui/dashboard/recommendations";
import Card from "../ui/dashboard/card-score"
import AnimationLoaded from "../ui/dashboard/animationLoaded";

export default function Page() {
  const { isLoaded, user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const email = user.primaryEmailAddress?.emailAddress;
    const fullName = user.fullName || "";

    if (email) {
      createUserIfNotExists(user.id, fullName, email);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800); 

    return () => clearTimeout(timeout);
  }, [user]);

  if (isLoading || !isLoaded) {
    return <AnimationLoaded />;
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