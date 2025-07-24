"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ActivityRenderer from "@/app/ui/activities/ActivityRenderer";
import { getActivityData } from "@/app/services/activitiesService";
import { ActivityProps } from "@/types/activities"; // Importa el tipo ya definido

export default function ActividadPage() {
  const searchParams = useSearchParams();
  const modKey = searchParams.get("module") ?? "html";
  const level = parseInt(searchParams.get("level") ?? "1");

  const [data, setData] = useState<ActivityProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getActivityData(modKey, level);
      setData(result);
    };
    fetchData();
  }, [modKey, level]);

  if (!data) return <p className="text-center mt-10">Cargando actividad...</p>;

  console.log(data);

  return (
    <main className="min-h-screen px-6 py-10 md:px-20">
      <ActivityRenderer {...data} />
    </main>
  );
}
