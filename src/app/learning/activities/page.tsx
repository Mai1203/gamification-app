'use client';
import { Suspense } from "react";
import ActividadContent from "./ActividadContent";
import AnimationLoaded from "@/app/ui/dashboard/animationLoaded";

export default function ActividadPage() {
  return (
    <Suspense fallback={<AnimationLoaded />}>
      <ActividadContent />
    </Suspense>
  );
}
