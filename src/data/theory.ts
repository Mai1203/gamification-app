export const htmlLevel1 = {
  title: "Nivel 1 - Estructura básica de un documento HTML",
  objective: "Comprender qué es HTML y cómo se estructura un documento básico para crear una página web.",
  intro: {
    question: "¿Qué es HTML?",
    content: `HTML (HyperText Markup Language) es el lenguaje estándar para construir páginas web. No es un lenguaje de programación, sino un lenguaje de marcado que define la estructura y el contenido de una página.`,
    code: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`
  },
  tips: [
    "✔️ Todas las etiquetas (excepto algunas) se abren y se cierran.",
    "✔️ Las etiquetas se pueden anidar: unas dentro de otras.",
    "✔️ Siempre debes cerrar correctamente las etiquetas para que la página funcione bien."
  ],
  tags: ["<html>", "<head>", "<body>"],
  extra: {
    title: "¿Qué son las etiquetas HTML?",
    content: `Las etiquetas son instrucciones que le dicen al navegador cómo mostrar el contenido. Se escriben entre los signos menor y mayor que:`,
    example: `<etiqueta>Contenido</etiqueta>

Ejemplo:
<p>Hola mundo</p>`
  }
};
