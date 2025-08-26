"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ActivityRenderer from "@/app/ui/activities/ActivityRenderer";
import { getActivityData } from "@/app/services/activitiesService";
import { ActivityProps } from "@/types/activities";
import AnimationLoaded  from "@/app/ui/dashboard/animationLoaded";

export default function ActividadContent() {
  const searchParams = useSearchParams();
  const modKey = searchParams.get("module") ?? "html";
  const level = parseInt(searchParams.get("level") ?? "1");
  const [data, setData] = useState<ActivityProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getActivityData(modKey, level);
        setData(result);
      } catch (err) {
        setError("Error al cargar la actividad");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [modKey, level]);

  if (isLoading) return <AnimationLoaded />;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!data) return <p className="text-center mt-10">No se encontró la actividad</p>;

  return (
    <main className="min-h-screen px-6 py-10 md:px-20">
      <ActivityRenderer {...data} />
    </main>
  );
}
