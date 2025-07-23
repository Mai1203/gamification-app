import CodeFillGame from "@/app/ui/activities/CompleteCodeGame";

export default function page() {
  return (
    <section className="max-w-4xl mx-auto p-4">
    <h2 className="text-xl font-semibold text-center mb-2">
      Actividad: Completa el Código HTML
    </h2>
    <p className="text-sm text-center text-zinc-600 mb-4">
      ✍️ Escribe manualmente en los espacios en blanco para completar la estructura HTML.
    </p>
    <CodeFillGame content={`<!DOCTYPE html>
  <html>
  _____
    <title>Mi Página</title>
  </head>
  <body>
    <h1>Hola Mundo</h1>
  _____
  </html>`} 
  answers={["<head>", "</body>"]}/>
  </section>
  );
}