import { Suspense } from "react";
import NivelTeoria from "@/app/ui/learning/NivelTeoria";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Cargando contenido...</div>}>
      <NivelTeoria />
    </Suspense>
  );
}