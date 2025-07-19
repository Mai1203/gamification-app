import Navbar from "@/app/ui/learning/navbar";
import NivelUno from "@/app/ui/learning/contenido";
import ActivityList from "../Activities/nivelUno_Actividad";

export default function Page() {
  return (
    <>
      <Navbar />
      <NivelUno />
      <ActivityList />
    </>
  );
}