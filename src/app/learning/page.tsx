'use client';
import { Suspense } from "react";
import NivelTeoria from "@/app/ui/learning/NivelTeoria";
import AnimationLoaded from "@/app/ui/dashboard/animationLoaded";

export default function Page() {
  return (
    <Suspense fallback={<AnimationLoaded />}>
      <NivelTeoria />
    </Suspense>
  );
}