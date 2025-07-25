import { Suspense } from "react";
import ActividadContent from "./ActividadContent";

export default function ActividadPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Cargando...</p>}>
      <ActividadContent />
    </Suspense>
  );
}
