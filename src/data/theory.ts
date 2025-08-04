export const theoryData = {
  html: {
    "1": {
      title: "🤖 Nivel 1 - Estructura básica de un documento HTML",
      objective:
        "Comprender qué es HTML y cómo se estructura un documento básico.",
      intro: {
        question: "💻 ¿Qué es HTML?",
        content:
          "HTML (HyperText Markup Language) es el lenguaje estándar para construir páginas web. No es un lenguaje de programación, sino un lenguaje de marcado que define la estructura y el contenido de una página, su estructura básica es la siguiente:",
        code: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`,
      },
      tags: [
        { label: "<head>", description: "Contiene metadatos y configuraciones de la página." },
        { label: "<body>", description: "Contiene el contenido visible del sitio web." }
      ],
      tips: [
        "✔️ Todas las etiquetas (excepto algunas) se abren y se cierran <abrir></cerrar>",
        "✔️ Las etiquetas se pueden anidar: unas dentro de otras.",
        "✔️ Siempre debes cerrar correctamente las etiquetas.",
      ],
      extra: {
        title: "💻 ¿Que son las etiquetas HTML?",
        content:
          "Son instrucciones que le dicen al navegador cómo mostrar el contenido, las etiquetas <head> y <body> son como el cerebro y el cuerpo de una página web. En <head> van cosas que ayudan a que funcione bien, como el título y estilos. En <body> va todo lo que ves: textos, imágenes, botones y más.",
        example: `<etiqueta>Contenido</etiqueta>

Ejemplo:
<head>
  <title>Mi primera Página</title>
</head>`,
      },
      lifeCode: {
        html: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <!-- Escribe tu código aquí-->
    <h1>¡Bienvenido!</h1>
  </body>
</html>`,
        css: ""
      },
    },
    "2": {
      title: "📝 Nivel 2 – Encabezados y párrafos en HTML",
      objective:
        "Aprender a utilizar las etiquetas que permiten crear títulos, subtítulos y párrafos en una página web.",
      intro: {
        question: "📌 ¿Qué son los encabezados en HTML?",
        content:
          "Los encabezados (también llamados títulos o headers) permiten organizar jerárquicamente el contenido de una página web. Existen seis niveles: desde <h1> (más importante) hasta <h6> (menos importante).",
        code:`<h1>Este es un encabezado principal</h1>
<h2>Este es un subtítulo</h2>
<h3>Este es un subtítulo de nivel 3</h3>
<h4>Subtítulo nivel 4</h4>
<h5>Subtítulo nivel 5</h5>
<h6>Subtítulo menos importante</h6>`,
      },
      tags: [
        { label: "<h1>", description: "Encabezado principal, se usa para títulos importantes" },
        { label: "<h2>", description: "Subtítulo, un poco menos importante que <h1>" },
        { label: "...", description: "Representa otros niveles de encabezado intermedios" },
        { label: "<h5>", description: "Encabezado de menor jerarquía, usado para subtítulos secundarios" },
        { label: "<h6>", description: "El encabezado de menor jerarquía posible" },
        { label: "<p>", description: "Define un párrafo de texto" }
      ],
      tips: [
        "✔️ Usa <h1> solo una vez por página, como título principal.",
        "✔️ Usa <p> para separar párrafos, no <br> múltiples veces.",
        "✔️ Usa encabezados para jerarquizar información, no solo para agrandar el texto.",
      ],
      extra: {
        title: "📌 ¿Qué son los párrafos en HTML?",
        content:
          "Los párrafos son bloques de texto que se escriben con la etiqueta <p>. Son usados para mostrar contenido textual regular.",
        example: `<p>Este es un párrafo de texto 
que puede tener varias líneas 
de contenido.</p>`,
      },
      lifeCode: {
        html: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página con Párrafos</title>
  </head>
  <body>
    <h1>Este es un encabezado principal</h1>
    <h2>Este es un subtítulo</h2>
    <h3>Este es un subtítulo de nivel 3</h3>
    <h4>Subtítulo nivel 4</h4>
    <h5>Subtítulo nivel 5</h5>
    <h6>Subtítulo menos importante</h6>

    <p>Este es un párrafo de texto 
    que puede tener varias líneas 
    de contenido.</p>
  </body>
</html>`,
        css: ""
      },
    },
    "3": {
      title: "🔗 Nivel 3 – Enlaces en HTML",
      objective:
        "Aprender a crear enlaces que permitan navegar entre páginas o acceder a otros sitios web.",
      intro: {
        question: "🌐 ¿Qué es un enlace en HTML?",
        content:
          "Un enlace conecta una página con otra o con un recurso externo. Se crea con la etiqueta <a> y el atributo href, que indica la dirección del enlace. Los atributos en HTML dan información extra sobre un elemento.",
        code: `<a href="https://www.google.com">Ir a Google</a>`,
      },
      tags: [
        { label: "<a>", description: "Define un enlace (hipervínculo) en HTML" },
        { label: "href", description: "Especifica la URL del destino del enlace" },
        { label: "target", description: "Indica dónde se abrirá el enlace (por ejemplo, en una nueva pestaña con '_blank')" }
      ],
      tips: [
        "✔️ Usa enlaces para mejorar la navegación de tu sitio.",
        "✔️ El texto que pongas entre las etiquetas <a> es el que verá el usuario.",
        '✔️ Puedes usar el atributo target="_blank" para abrir el enlace en una nueva pestaña.',
      ],
      extra: {
        title: "📌 Enlaces internos vs externos",
        content:
          "Los enlaces internos apuntan a otras páginas dentro del mismo sitio. Los externos llevan a sitios fuera del dominio.",
        example: `<a href="contacto.html">Página de contacto</a> <!-- Enlace interno -->
<a href="https://ejemplo.com" target="_blank">Visitar sitio externo</a>`,
      },
      lifeCode: {
        html: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página con Enlaces</title>
  </head>
  <body>
    <a href="https://www.youtube.com/" target="_blank">Visitar YouTube en Sitio Externo</a>
  </body>
</html>`,
        css: ""
      },
    },
    "4": {
      title: "🖼️ Nivel 4 – Imágenes en HTML",
      objective:
        "Aprender a insertar imágenes en una página web utilizando la etiqueta <img>, entendiendo sus atributos y buenas prácticas.",
      intro: {
        question: "📸 ¿Qué es la etiqueta <img>?",
        content:
          "La etiqueta <img> se utiliza para mostrar imágenes en una página web. Es autocontenida y requiere los atributos 'src' y 'alt'.",
        code: `<img src="gato.jpg" alt="Un gato durmiendo">`,
      },
      tags: [
        { label: "<img>", description: "Inserta una imagen en la página HTML" },
        { label: "src", description: "Especifica la ruta o URL de la imagen" },
        { label: "alt", description: "Texto alternativo que describe la imagen, útil si no se carga o para accesibilidad" }
      ],
      tips: [
        "✔️ La etiqueta <img> no se cierra.",
        "✔️ Usa imágenes livianas para mejorar el rendimiento.",
        "✔️ Usa nombres de archivo sin espacios y descriptivos.",
        "✔️ Siempre incluye el atributo alt para mejorar la accesibilidad.",
      ],
      extra: {
        title: "🛠️ Explicación de los atributos",
        content:
          "El atributo src indica la ruta de la imagen (puede ser local o externa). El atributo alt proporciona un texto alternativo visible si la imagen no se carga.",
        example: `<img src="imagenes/paisaje.jpg" alt="Paisaje natural">`,
      },
      lifeCode: {
        html: `<!DOCTYPE html>
<html>
  <head>
    <title>Insertando una Imagen</title>
  </head>
  <body>
    <h2>Esto es una imagen</h2>
    <img src="https://i.blogs.es/c7b68e/chatgpt-studio-ghibli-portada/1200_800.jpeg" alt="Imagen de ChatGPT Studio GHIBLI" width="300">
  </body>
</html>`,
        css: ""
      },
    },
    "5": {
      title: "📋 Nivel 5 – Listas en HTML",
      objective:
        "Aprender a estructurar contenido en forma de listas ordenadas y desordenadas usando HTML.",
      intro: {
        question: "📑 ¿Qué tipos de listas existen en HTML?",
        content:
          "HTML permite crear listas ordenadas (numeradas) y desordenadas (con viñetas). Las listas ayudan a presentar información clara y estructurada.",
        code: `<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<ol>
  <li>Instalar editor de código</li>
  <li>Crear archivo HTML</li>
  <li>Escribir contenido</li>
</ol>`,
      },
      tags: [
        { label: "<ul>", description: "Define una lista desordenada (con viñetas)" },
        { label: "<ol>", description: "Define una lista ordenada (con números)" },
        { label: "<li>", description: "Define un ítem o elemento dentro de una lista" }
      ],
      tips: [
        "✔️ Usa <ul> para listas sin orden específico (viñetas).",
        "✔️ Usa <ol> cuando el orden importa (numeración).",
        "✔️ Cada elemento de la lista va dentro de una etiqueta <li>.",
      ],
      extra: {
        title: "🔎 ¿Cuál usar: <ul> o <ol>?",
        content:
          "Elige <ul> para listas como menús o características. Usa <ol> para pasos, instrucciones o rankings.",
        example: 
`<ul>
  <li>Rojo</li>
  <li>Verde</li>
  <li>Azul</li>
</ul>

<ol>
  <li>Encender el computador</li>
  <li>Abrir el navegador</li>
  <li>Visitar un sitio web</li>
</ol>`,
      },
      lifeCode: {
        html: `<!DOCTYPE html>
<html>
  <head>
    <title>Listas Ordenadas y Desordenadas</title>
  </head>
  <body>
    <h2>Listas Desordenadas</h2>
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>

    <h2>Listas Ordenadas</h2>
    <ol>
      <li>Instalar editor de código</li>
      <li>Crear archivo HTML</li>
      <li>Escribir contenido</li>
    </ol>
  </body>
</html>`,
        css: ""
      },
    },
    "6": {
      title: "📊 Nivel 6 – Tablas en HTML",
      objective:
        "Aprender a crear tablas para organizar datos en filas y columnas usando etiquetas HTML.",
      intro: {
        question: "📐 ¿Qué son las tablas en HTML?",
        content:
          "Las tablas permiten mostrar datos estructurados en filas y columnas. Se construyen con varias etiquetas: <table>, <tr>, <td> y <th>.",
        code: 
`<table>
  <-- Cabecera -->
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Edad</th>
    </tr>
  </thead>

  <-- Cuerpo -->
  <tbody>
    <tr>
      <td>Ana</td>
      <td>22</td>
    </tr>
    <tr>
      <td>Luis</td>
      <td>30</td>
    </tr>
  </tbody>
  <-- Pie de página -->
  <tfoot>
    <tr>
      <td colspan="2">Sin datos adicionales</td>
    </tr>
  </tfoot>
</table>`,
      },
      tags: [
        { label: "<table>", description: "Define una tabla" },
        { label: "<thead>", description: "Agrupa el encabezado de una tabla" },
        { label: "<tbody>", description: "Agrupa el contenido principal de una tabla" },
        { label: "<tfoot>", description: "Agrupa el pie de una tabla" },
        { label: "<tr>", description: "Define una fila dentro de la tabla" },
        { label: "<td>", description: "Define una celda de datos dentro de una fila" },
        { label: "<th>", description: "Define una celda de encabezado dentro de una fila" }
      ],
      tips: [
        "✔️ <thead> se usa para encabezados de columna (generalmente la primera fila).",
        "✔️ <tbody> se usa para contener los datos de cada fila.",
        "✔️ <td> contiene los datos de cada celda.",
        "✔️ <tr> representa una fila de la tabla.",
      ],
      extra: {
        title: "🧩 ¿Cómo organizar la tabla?",
        content:
          `Primero defines la tabla con <table>. Luego, cada fila se escribe con <tr> y dentro de cada fila colocas celdas de datos <td> o encabezados <th>.
          También se puede unir dos celdas con el atributo colspan = 'number'.`,
        example: 
  `<table>
    <thead>
      <tr>
        <th>Producto</th>
        <th>Precio</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Camisa</td>
        <td>$25</td>
      </tr>
      <tr>
        <td colspan="2">Sin datos adicionales</td>
      </tr>
    </tbody>
  </table>`,
      },
      lifeCode: {
        html: `<!DOCTYPE html>
<html>
  <head>
    <title>Tablas con Encabezados y columnas</title>
  </head>
  <body>
    <h2>Tabla de Edades</h2>
    
    <table border="1">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Ana</td>
          <td>22</td>
        </tr>
        <tr>
          <td>Luis</td>
          <td>30</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">Sin datos adicionales</td>
        </tr>
      </tfoot>
    </table>
  </body>
</html>`,
        css: ""
      },
    },
    "7": {
      title: "📨 Nivel 7 – Formularios en HTML",
      objective:
        "Aprender a construir formularios HTML básicos que permitan al usuario ingresar y enviar datos, utilizando etiquetas como <form>, <input>, <label> y <button>.",
      intro: {
        question: "🧾 ¿Qué es un formulario en HTML?",
        content:
          "Un formulario permite al usuario introducir datos (nombre, correo, comentarios, Contraseña, etc.) y enviarlos al servidor para su procesamiento. Se define con la etiqueta <form>.",
        code: 
`<form action="procesar.php" method="post">
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre">

  <label for="contraseña">Constraseña:</label>
  <input type="password" id="contraseña" name="contraseña">

  <button type="submit">Enviar</button>
</form>`,
      },
      tags: [
        { label: "<form>", description: "Define un formulario para la recopilación de datos del usuario" },
        { label: "<input>", description: "Define un campo de entrada para que el usuario introduzca datos" },
        { label: "<label>", description: "Define una etiqueta para un elemento <input>" },
        { label: "<button>", description: "Define un botón clickeable" },
        { label: "type", description: "Atributo que especifica el tipo de entrada de un <input> o <button>" },
        { label: "checkbox", description: "Valor del atributo 'type' que define una casilla de verificación" },
        { label: "radio", description: "Valor del atributo 'type' que define un botón de opción" },
        { label: "required", description: "Atributo que indica que un campo debe completarse antes de enviar el formulario" }
      ],
      tips: [
        "✔️ Usa <label> para cada campo para mejorar la accesibilidad.",
        "✔️ Conecta <label> con <input> usando el atributo for.",
        "✔️ Usa el atributo required en campos obligatorios.",
        "✔️ Usa type='email', 'number', 'password', etc. para validaciones automáticas.",
      ],
      extra: {
        title: "🧪 Tipos de campos comunes en formularios",
        content:
          `Puedes usar distintos tipos de entrada como texto, correo, número, contraseña, etc. También puedes agrupar campos con <fieldset> y darles contexto con <legend>.
          
          * En el código de prueba se muestran ejemplos de los tipos de campos comunes en HTML.`,
        example: 
`<form>
  <fieldset>
    <legend>Datos personales</legend>

    <label for="correo">Correo electrónico:</label>
    <input type="email" id="correo" name="correo" required>

    <label for="edad">Edad:</label>
    <input type="number" id="edad" name="edad">
  </fieldset>

  <label for="mensaje">Mensaje:</label>
  <textarea id="mensaje" name="mensaje"></textarea>

  <button type="submit">Enviar</button>
</form>`,
      },
      lifeCode: {
        html: `<!DOCTYPE html>
<html>
  <head>
    <title>Formulario Básico de Aprendizaje</title>
  </head>
  <body>
    <h1>Formulario HTML</h1>
    
    <form>
        <!-- Grupo: Información Personal -->
        <fieldset>
            <legend>Información Personal</legend>
            
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre"><br><br>
            
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required><br><br>
            
            <label for="password">Contraseña:</label>
            <input type="password" id="password" name="password"><br><br>
            
            <label for="edad">Edad:</label>
            <input type="number" id="edad" name="edad" min="18" max="99"><br><br>
            
            <label for="fecha">Fecha de nacimiento:</label>
            <input type="date" id="fecha" name="fecha">
        </fieldset>
        
        <!-- Grupo: Preferencias -->
        <fieldset>
            <legend>Preferencias</legend>
            
            <label for="mensaje">Mensaje:</label><br>
            <textarea id="mensaje" name="mensaje" rows="4" cols="40"></textarea><br><br>
            
            <label>Intereses:</label><br>
            <input type="checkbox" id="deportes" name="intereses" value="deportes">
            <label for="deportes">Deportes</label><br>
            
            <input type="checkbox" id="musica" name="intereses" value="musica">
            <label for="musica">Música</label><br>
            
            <input type="checkbox" id="lectura" name="intereses" value="lectura">
            <label for="lectura">Lectura</label><br><br>
            
            <label>Género:</label><br>
            <input type="radio" id="masculino" name="genero" value="masculino">
            <label for="masculino">Masculino</label><br>
            
            <input type="radio" id="femenino" name="genero" value="femenino">
            <label for="femenino">Femenino</label><br>
            
            <input type="radio" id="otro" name="genero" value="otro">
            <label for="otro">Otro</label><br><br>
            
            <label for="pais">País:</label>
            <select id="pais" name="pais">
                <option value="">--Seleccione--</option>
                <option value="es">España</option>
                <option value="mx">México</option>
                <option value="ar">Argentina</option>
                <option value="co">Colombia</option>
            </select>
        </fieldset>
        
        <!-- Botones -->
        <button type="submit">Enviar</button>
        <button type="reset">Limpiar</button>
    </form>
  </body>
</html>`,
        css: ""
      },
    },
    "8": {
      title: "🧠 Nivel 8 – Semántica en HTML5",
      objective:
        "Comprender qué son las etiquetas semánticas en HTML5, para estructurar correctamente una página web y facilitar su lectura por humanos, navegadores y tecnologías de asistencia.",
      intro: {
        question: "📘 ¿Qué es la semántica en HTML?",
        content:
          "La semántica se refiere al significado del contenido. HTML5 introdujo etiquetas que explican la función del contenido dentro de la página, mejorando la accesibilidad y el posicionamiento.",
        code: 
`<body>
  <header>
    <h1>Mi Blog</h1>
  </header>

  <nav>
    <ul>
      <li><a href="inicio.html">Inicio</a></li>
      <li><a href="blog.html">Blog</a></li>
    </ul>
  </nav>

  <main>
    <article>
      <h2>Título del artículo</h2>
      <p>Contenido del artículo...</p>
    </article>

    <aside>
      <p>Contenido extra: enlaces, banners, etc.</p>
    </aside>
  </main>

  <footer>
    <p>© 2025 - Todos los derechos reservados</p>
  </footer>
</body>`,
      },
      tags: [
        { label: "<header>", description: "Define el encabezado de una página o sección, generalmente incluye logotipos o títulos" },
        { label: "<nav>", description: "Define una sección que contiene enlaces de navegación" },
        { label: "<main>", description: "Representa el contenido principal del documento, único por página" },
        { label: "<section>", description: "Define una sección temática dentro del contenido" },
        { label: "<article>", description: "Define contenido independiente y auto-contenido como publicaciones o entradas de blog" },
        { label: "<aside>", description: "Contiene contenido relacionado pero no esencial, como barras laterales o widgets" },
        { label: "<footer>", description: "Define el pie de página de una sección o página, usualmente con información de contacto o derechos" }
      ],
      tips: [
        "✔️ Usa etiquetas semánticas en lugar de múltiples <div>.",
        "✔️ Usa solo un <main> por página.",
        "✔️ Usa <article> para contenido independiente (como un post).",
        "✔️ Usa <section> para dividir contenido por temas.",
      ],
      extra: {
        title: "🔍 ¿Por qué evitar <div> cuando puedes usar semántica?",
        content:
          "Un <div> no tiene significado por sí mismo. Las etiquetas semánticas como <section>, <article>, <nav>, etc. permiten entender el propósito del contenido.",
        example: 
`<section>
  <h2>Servicios</h2>
  <p>Ofrecemos desarrollo web y diseño UX.</p>
</section>

<article>
  <h2>Última publicación</h2>
  <p>Consejos para aprender HTML desde cero.</p>
</article>`,
      },
      lifeCode: {
        html: `<!DOCTYPE html>
<html>
  <head>
    <title>Navegación con HTML</title>
  </head>
  <body>
    <header>
      <h1>Mi Blog</h1>
    </header>

    <nav>
      <ul>
        <li><a href="inicio.html">Inicio</a></li>
        <li><a href="blog.html">Blog</a></li>
      </ul>
    </nav>

    <main>
      <article>
        <h2>Título del artículo</h2>
        <p>Contenido del artículo...</p>
      </article>

      <aside>
        <p>Contenido extra: enlaces, banners, etc.</p>
      </aside>
    </main>

    <footer>
      <p>© 2025 - Todos los derechos reservados</p>
    </footer>
  </body>
</html>`,
        css: ""
      },
    },
    "9": {
      title: "🎵 Nivel 9 – Multimedia en HTML (Audio y Video)",
      objective:
        "Aprender a insertar archivos de audio y video en una página web usando las etiquetas <audio> y <video>, incluyendo sus atributos y buenas prácticas de accesibilidad.",
      intro: {
        question: "📽️ ¿Por qué usar multimedia en HTML?",
        content:
          "HTML5 permite reproducir contenido multimedia (audio y video) directamente en el navegador, sin necesidad de plugins externos. Esto mejora la experiencia del usuario y hace el sitio más dinámico.",
        code: 
`<audio controls>
  <source src="musica.mp3" type="audio/mpeg">
  Tu navegador no soporta audio HTML5.
</audio>

<video width="320" height="240" controls>
  <source src="video.mp4" type="video/mp4">
  Tu navegador no soporta video HTML5.
</video>`,
      },
      tags: [
        { label: "<audio>", description: "Incorpora contenido de audio en la página web" },
        { label: "<video>", description: "Incorpora contenido de video en la página web" },
        { label: "<source>", description: "Especifica múltiples recursos multimedia para <audio> o <video>" },
        { label: "controls", description: "Muestra los controles de reproducción (play, pausa, volumen)" },
        { label: "width", description: "Define el ancho del reproductor de video" },
        { label: "height", description: "Define la altura del reproductor de video" },
        { label: "autoplay", description: "Hace que el medio se reproduzca automáticamente al cargar" },
        { label: "loop", description: "Hace que el medio se repita en bucle" },
        { label: "muted", description: "Comienza el medio silenciado" },
        { label: "poster", description: "Define una imagen que se muestra antes de que se reproduzca el video" }
      ],
      tips: [
        "✔️ Usa el atributo controls para mostrar los botones de reproducción.",
        "✔️ Incluye varios formatos (.mp4, .webm) para mejor compatibilidad.",
        "✔️ Agrega texto alternativo dentro de <audio> o <video> por si el navegador no los soporta.",
        "✔️ Comprime los archivos multimedia para mejorar la carga.",
      ],
      extra: {
        title: "🎬 ¿Qué es <source> y cómo usar varios formatos?",
        content:
          "La etiqueta <source> dentro de <video> o <audio> permite definir múltiples versiones del mismo archivo. El navegador elegirá el primero que pueda reproducir.",
        example: `<video width="400" controls autoplay muted loop>
  <source src="clip.mp4" type="video/mp4">
  <source src="clip.webm" type="video/webm">
  Tu navegador no puede reproducir el video.
</video>`,
      },
      lifeCode: {
        html: `<!DOCTYPE html>
<html>
  <head>
    <title>Reproducción de Audio y Video</title>
  </head>
  <body>
    <h1>🎵 Audio y 🎥 Video en HTML</h1>

    <p>Ejemplo de audio:</p>
    <audio controls>
      <source src="/audio/Hear What They Say.mp3" type="audio/mpeg">
      Tu navegador no soporta audio HTML5.
    </audio>
    
    <p>Ejemplo de video:</p>
    <video width="320" height="240" controls>
      <source src="/video/coding-loop.mp4" type="video/mp4">
      Tu navegador no soporta video HTML5.
    </video>
  </body>
</html>`,
        css: ""
      },
    },
    "10": {
      title: "♿ Nivel 10 – Accesibilidad básica en HTML",
      objective:
        "Aprender buenas prácticas básicas para hacer páginas web accesibles para todas las personas, incluyendo aquellas con discapacidades visuales, motrices o cognitivas.",
      intro: {
        question: "🧩 ¿Por qué la accesibilidad web es fundamental?",
        content:
          "La accesibilidad no es solo un requisito legal, sino un compromiso ético. Más de mil millones de personas viven con algún tipo de discapacidad. Al diseñar sitios accesibles:\n - Permites que lectores de pantalla interpreten tu contenido\n - Facilitas la navegación con teclado - Mejoras la experiencia para personas con daltonismo o baja visión - Beneficias a usuarios en entornos limitados (poca luz, sin audio) ¡Una web accesible es mejor para todos!",
        code: `<!-- Ejemplo de buenas prácticas -->
<img src="logo.png" alt="TuplaCore: Plataforma de aprendizaje interactivo">
    
<form>
  <label for="email">Correo electrónico:</label>
  <input type="email" id="email" aria-describedby="email-help">
  <small id="email-help">Nunca compartiremos tu email</small>
</form>
    
<nav aria-label="Menú principal">
  <ul>
    <li><a href="/" aria-current="page">Inicio</a></li>
    <li><a href="/cursos">Cursos</a></li>
  </ul>
</nav>`,
      },
      tags: [
        { label: "alt-text", description: "Texto alternativo que describe imágenes para lectores de pantalla" },
        { label: "aria-label", description: "Proporciona una etiqueta accesible a elementos sin texto visible" },
        { label: "semantic-html", description: "Uso de etiquetas HTML con significado claro para mejorar la accesibilidad" },
        { label: "keyboard-navigation", description: "Permite navegar por el sitio usando solo el teclado" },
        { label: "contrast-ratio", description: "Relación de contraste entre el texto y el fondo para una mejor legibilidad" },
        { label: "skip-links", description: "Enlaces que permiten saltar directamente al contenido principal" },
        { label: "focus-indicators", description: "Muestra visualmente qué elemento está enfocado al navegar con teclado" }
      ],
      tips: [
        "✔️ Prioriza etiquetas semánticas: <nav> es más significativo que <div class='menu'>",
        "✔️ Alt text descriptivo: 'Gráfico de crecimiento Q3 2024' en lugar de 'gráfico'",
        "✔️ Verifica navegación con teclado (Tab/Shift+Tab)",
        "✔️ Contraste mínimo 4.5:1 para texto (usa herramientas como contrastchecker.com)",
        "✔️ Asegura compatibilidad con lectores de pantalla (NVDA, VoiceOver)",
      ],
      extra: {
        title: "🛠️ Atributos ARIA: Potencia cuando el HTML semántico no basta",
        content:
          'Los atributos ARIA actúan como "traductores" para tecnologías asistivas: - `aria-label`: Proporciona etiqueta invisible cuando el elemento no tiene texto visible - `aria-labelledby`: Conecta elementos con texto descriptivo existente - `role`: Define la función de un elemento (navigation, banner, search) - `aria-live`: Para contenido dinámico que se actualiza (notificaciones en tiempo real) ¡Úsalos como refuerzo, nunca como reemplazo de HTML semántico!',
        example: `<!-- Menú desplegable accesible -->
<div class="dropdown" aria-haspopup="true" aria-expanded="false">
  <button id="menuBtn" aria-controls="menuList">
    Opciones
  </button>
  <ul id="menuList" role="menu" aria-labelledby="menuBtn" hidden>
    <li role="menuitem">Perfil</li>
    <li role="menuitem">Configuración</li>
  </ul>
</div>`,
      },
      lifeCode: {
        html: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accesibilidad con Semantic HTML</title>
  <style>
    :focus { outline: 3px solid #0066cc; }
    .skip-link { 
      position: absolute; 
      left: -999px;
    }
    .skip-link:focus { left: 10px; }
  </style>
</head>
<body>
  <!-- Salto de navegación para usuarios de teclado -->
  <a href="#main" class="skip-link">Saltar al contenido principal</a>
    
  <header role="banner">
    <img src="/img/banner-nivel10-html.jpeg" alt="TuplaCore" width="400">
    <nav aria-label="Navegación primaria">
      <ul>
        <li><a href="#cursos">Cursos</a></li>
        <li><a href="#blog">Blog</a></li>
      </ul>
    </nav>
  </header>

  <main id="main" role="main">
    <article>
      <h1>Bienvenido a la Revolución Educativa</h1>
      <img src="estudiantes.jpg" alt="Grupo diverso de estudiantes colaborando en un proyecto digital">
        
      <section aria-labelledby="formacion-titulo">
        <h2 id="formacion-titulo">Programas de Formación</h2>
        <p>Descripción de programas...</p>
      </section>
    </article>
  </main>

  <footer role="contentinfo">
    <p>&copy; 2025 TuplaCore. Todos los derechos reservados.</p>
  </footer>
</body>
</html>`,
        css: ""
      },
    },
  },
  css: {
    "1": {
      title: "🎨 Nivel 1 – Selectores básicos en CSS",
      objective:
        "Aprender a seleccionar elementos HTML desde CSS para aplicar estilos, utilizando selectores básicos como etiquetas, clases e identificadores.",
      intro: {
        question: "🧵 ¿Qué es CSS y cómo se aplican estilos?",
        content:
          "CSS (Cascading Style Sheets) permite controlar la apariencia de elementos HTML. Un selector en CSS le indica al navegador qué elementos deben recibir un conjunto de estilos.",
        code: `/* Selector por etiqueta */
p {
  color: blue;
}

/* Selector por clase */
.destacado {
  font-weight: bold;
  color: red;
}

/* Selector por ID */
#titulo-principal {
  font-size: 32px;
  text-align: center;
}`,
      },
      tags: [
        { label: "selector", description: "Patrón que se usa para seleccionar elementos HTML a los que aplicar estilos" },
        { label: "clase", description: "Selector que apunta a los elementos con un atributo class específico, usando un punto (.)" },
        { label: "id", description: "Selector que apunta a un elemento con un id específico, usando una almohadilla (#)" },
        { label: "etiqueta", description: "Selector que aplica estilos a todas las etiquetas HTML específicas, como h1, p, etc." }
      ],
      tips: [
        "✔️ Usa clases (.clase) para aplicar estilos a varios elementos.",
        "✔️ Usa IDs (#id) solo cuando el elemento es único en la página.",
        "✔️ Nombra tus clases e IDs con sentido, como .boton-principal o #header.",
      ],
      extra: {
        title: "🆚 Diferencias entre clase e ID",
        content:
          "Una clase puede repetirse en varios elementos. Un ID debe ser único. Las clases se declaran con un punto (.) y los IDs con una almohadilla (#).",
        example: `    <!-- HTML -->
<h1 id="titulo">Título</h1>
<p class="resaltado">Texto resaltado</p>

    <!-- CSS -->
#titulo {
  color: navy;
}
.resaltado {
  background-color: yellow;
}`,
      },
      lifeCode: {
        html: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página con CSS</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
    <div class="contenedor"> <!-- Usa clase -->
      <p id="destacado">Texto de ejemplo</p> <!-- Usa ID -->
    </div>

    <div class="contenedor"> <!-- Usa clase -->
      <p>Texto de ejemplo</p> <!-- No Usa ID -->
    </div>
  </body>
</html>`,
        css: `/* Selector por etiqueta */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f0f0f0;
}

/* Selector por clase */
.contenedor { 
  max-width: 800px;
  margin: 0 auto;
  margin-top: 10px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* Selector por ID */
#destacado {
  color: #3498db;
  font-weight: bold;
  border-left: 4px solid #3498db;
  padding-left: 10px;
}`
      },
    },
    "2": {
      title: "🌈 Nivel 2 – Propiedades de color y fondo en CSS",
      objective:
        "Aprender a cambiar el color del texto, el fondo y aplicar estilos visuales utilizando las propiedades color, background-color y background-image.",
      intro: {
        question: "🖌️ ¿Cómo cambiar el color y fondo de los elementos en CSS?",
        content:
          "CSS permite cambiar los colores del texto y del fondo para mejorar el diseño de la página. Puedes usar nombres, códigos hexadecimales, RGB, HSL y más.",
        code: `/* Cambiar color del texto */
p {
  color: red;
}

/* Cambiar color de fondo */
div {
  background-color: lightblue;
}

/* Imagen de fondo */
body {
  background-image: url("fondo.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}`,
      },
      tags: [
        { label: "color", description: "Define el color del texto dentro de un elemento HTML" },
        { label: "background-color", description: "Establece el color de fondo de un elemento" },
        { label: "background-image", description: "Permite usar una imagen como fondo de un elemento" }
      ],
      tips: [
        "✔️ Usa colores contrastantes para asegurar buena legibilidad.",
        "✔️ Optimiza las imágenes de fondo para que no ralenticen el sitio.",
        "✔️ Usa background-size: cover para cubrir todo el fondo sin deformar.",
        "✔️ Puedes combinar color y fondo para lograr mejor estética.",
      ],
      extra: {
        title: "🎯 Combinaciones de propiedades de fondo",
        content:
          "Puedes controlar cómo se muestra el fondo con propiedades como background-repeat, background-position y background-size.",
        example: `body {
      background-image: url("paisaje.jpg");
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }`,
      },
      lifeCode: {
    html: `<!DOCTYPE html>
<html>
  <head>
    <title>Colores y Fondos</title>
  </head>
  <body>
    <h1>Explorando Colores en CSS</h1>
    <div class="contenedor">
      <p class="destacado">Este texto tiene color y fondo personalizados.</p>
    </div>
  </body>
</html>`,
    css: `body {  /* Estilos generales para el body */
  font-family: 'Segoe UI', sans-serif;
  background-color: #f9f9f9;
  background-image: url(/img/textura-nivel2-css.jpg); /* URL relativa */
  background-size: cover;         /* Tamaño de la imagen */
  background-repeat: repeat-y;    /* Repite la imagen verticalmente */
  background-position: center;    /* Posición de la imagen */
  margin: 0;                      /* Márgenes */  
  padding: 20px;                  /* Márgenes */
}

.contenedor {
  background-color: rgba(255, 255, 255, 0.8); /* Color de fondo */
  padding: 20px;
  border-radius: 8px;       /* Radio de bordes */
  max-width: 700px;         /* Ancho máximo */
  margin: 0 auto;           /* Centrado */
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);   /* Sombra */
}

.destacado {
  color: #e91e63;
  font-weight: bold;
  font-size: 18px;
}`
  },
    },
    "3": {
      title: "✍️ Nivel 3 – Tipografía y fuentes en CSS",
      objective:
        "Aprender a cambiar el tamaño, estilo, grosor, alineación y tipo de fuente del texto en una página web utilizando CSS.",
      intro: {
        question: "🔠 ¿Cómo controlar la apariencia del texto en la web?",
        content:
          "La tipografía influye en cómo los usuarios leen y perciben tu sitio. Con CSS puedes controlar familia tipográfica, tamaño, peso, alineación, espaciado entre líneas y estilo del texto.",
        code: `body {
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

h1 {
  font-size: 28px;
  text-align: center;
}

p {
  font-style: italic;
}`,
      },
      tags: [
        { label: "font-family", description: "Especifica la familia de fuente usada para el texto" },
        { label: "font-size", description: "Define el tamaño del texto" },
        { label: "font-style", description: "Establece el estilo de la fuente, como normal o cursiva" },
        { label: "font-weight", description: "Determina el grosor del texto, como normal o bold" },
        { label: "text-align", description: "Controla la alineación horizontal del texto" },
        { label: "line-height", description: "Establece el espacio vertical entre líneas de texto" }
      ],
      tips: [
        "✔️ Usa siempre fuentes de respaldo: 'Roboto', sans-serif.",
        "✔️ Usa al menos 16px para el cuerpo de texto.",
        "✔️ No combines más de 2 o 3 fuentes distintas por sitio.",
        "✔️ Asegura buen contraste entre texto y fondo.",
      ],
      extra: {
        title: "🔗 Usa fuentes externas con Google Fonts",
        content:
          "Puedes importar fuentes modernas y profesionales desde Google Fonts para mejorar el diseño tipográfico.",
        example: `<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">

body {
  font-family: 'Roboto', sans-serif;
}`,
      },
      lifeCode: {
    html: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Tipografía en CSS</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
  </head>
  <body>
    <h1>Explorando la Tipografía</h1>
    <p class="intro">La tipografía hace tu contenido más legible y atractivo.</p>
    <p class="destacado">¡Experimenta con tamaños, estilos y fuentes!</p>
  </body>
</html>`,
    css: `/* Estilos de Tipografía */
body {
  font-family: 'Roboto', Arial, sans-serif;   /* Fuentes */
  font-size: 16px;                            /* Tamaño de fuente */
  line-height: 1.6;                           /* Interlineado */
  color: #2c3e50;                             /* Color de fuente */
  margin: 0;                                  /* Márgenes */
  padding: 20px;                              /* Márgenes */
  background-color: #fefefe;                  /* Color de fondo */
}

h1 {
  font-size: 32px;                            /* Tamaño de fuente */
  text-align: center;                         /* Alineación */
  color: #34495e;                             /* Color de fuente */
}

.intro {
  font-style: italic;                         /* Estilo de fuente */
  text-align: justify;                        /* Alineación */
}

.destacado {
  font-weight: bold;                          /* Estilo de fuente */
  font-size: 18px;                            /* Tamaño de fuente */
  color: #e67e22;                             /* Color de fuente */
}`
  },
    },
    "4": {
      title: "📦 Nivel 4 – Box Model (Modelo de Caja)",
      objective:
        "Comprender cómo está estructurado visualmente cada elemento HTML utilizando el modelo de caja de CSS, y aprender a modificar márgenes, bordes, rellenos y contenidos.",
      intro: {
        question: "🧱 ¿Cómo se estructuran los elementos en CSS?",
        content:
          "En CSS, cada elemento se representa como una caja que tiene cuatro áreas: contenido, padding, border y margin. Conocerlas te permite controlar el espacio y la apariencia de los elementos.",
        code: `.caja {
  width: 300px;
  padding: 20px;
  border: 2px solid #333;
  margin: 30px auto;
  background-color: #f5f5f5;
}`,
      },
      tags: [
        { label: "width", description: "Define el ancho de un elemento" },
        { label: "padding", description: "Espacio interior entre el contenido y el borde del elemento" },
        { label: "margin", description: "Espacio exterior entre el elemento y los que lo rodean" },
        { label: "border", description: "Define el borde alrededor del contenido y el padding de un elemento" }
      ],
      tips: [
        "✔️ Usa margin para separar elementos entre sí.",
        "✔️ Usa padding para agregar espacio dentro de un bloque.",
        "✔️ Usa border para definir el contorno del elemento.",
        "✔️ Usa margin: 0 auto; para centrar bloques.",
      ],
      extra: {
        title: "🧮 Tip extra: box-sizing para evitar errores de cálculo",
        content:
          "Usar box-sizing: border-box te ayuda a evitar que el padding y el borde aumenten el tamaño total del elemento.",
        example: `* {
  box-sizing: border-box;
}
  
┌───────────────────────────────────────┐
│                MARGIN                 │
│       ┌───────────────────────┐       │
│       │       PADDING         │       │
│       │   ┌───────────────┐   │       │
│       │   │   CONTENIDO   │   │       │       Modelo De Caja, con padding, border y margin
│       │   └───────────────┘   │       │
│       │                       │       │
│       └───────────────────────┘       │
│                                       │
└───────────────────────────────────────┘`,
      },
      lifeCode: {
    html: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Modelo de Caja</title>
  </head>
  <body>
    <h1>Modelo de Caja en CSS</h1>
    <div class="caja">
      <p>Esta es una caja con padding, borde y margen.</p>
    </div>
  </body>
</html>`,
    css: `/* Estilos para el modelo de caja */
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #eef2f3;
  margin: 0;                        /* Márgenes Fuera de body*/
  padding: 20px;                    /* Márgenes Fuera de body*/
  color: #333;
}

h1 {
  text-align: center;
  color: #2c3e50;
}

.caja {
  width: 300px;                     /* Ancho de la caja */
  padding: 20px;                    /* Márgenes dentro de la caja*/
  border: 2px solid #333;           /* Borde: ancho y color */
  margin: 30px auto;                /* Margen: top y bottom, left y right */ 
  background-color: #f5f5f5;
  text-align: center;
  border-radius: 8px;                /* Radio de bordes */
}`
  },
    },
    "5": {
      title: "📍 Nivel 5 – Posicionamiento en CSS",
      objective:
        "Aprender a controlar la posición de los elementos en la página usando las propiedades position, top, left, right, bottom y comprender la diferencia entre los tipos de posicionamiento.",
      intro: {
        question: "📦 ¿Cómo posicionar elementos con precisión en CSS?",
        content:
          "Con la propiedad position puedes colocar un elemento exactamente donde lo necesitas: relativo a su posición original, a su contenedor o a la ventana del navegador. Esto es clave para menús, overlays, modales, etc.",
        code: `.contenedor {
  position: relative;
  height: 300px;
  background: #eee;
}

.caja {
  position: absolute;
  top: 50px;
  left: 100px;
  width: 200px;
  height: 100px;
  background: lightblue;
}`,
      },
      tags: [
        { label: "position", description: "Define cómo se posiciona un elemento en la página (static, relative, absolute, fixed, sticky)" },
        { label: "relative", description: "El elemento se posiciona relativo a su posición original" },
        { label: "absolute", description: "El elemento se posiciona relativo al contenedor más cercano con posición distinta de static" },
        { label: "fixed", description: "El elemento se posiciona respecto al viewport, no se mueve al hacer scroll" },
        { label: "sticky", description: "El elemento se comporta como relative hasta que llega a un punto en el scroll y se vuelve fixed" },
        { label: "top", description: "Define la distancia entre el borde superior del contenedor y el elemento posicionado" },
        { label: "left", description: "Define la distancia entre el borde izquierdo del contenedor y el elemento posicionado" },
        { label: "right", description: "Define la distancia entre el borde derecho del contenedor y el elemento posicionado" },
        { label: "bottom", description: "Define la distancia entre el borde inferior del contenedor y el elemento posicionado" }
      ],
      tips: [
        "✔️ Usa relative para pequeños ajustes sin sacar al elemento del flujo.",
        "✔️ Usa absolute dentro de un contenedor con position: relative.",
        "✔️ Usa fixed para menús flotantes o botones de scroll.",
        "✔️ Usa sticky para headers que se fijan al hacer scroll.",
      ],
      extra: {
        title: "⚠️ Errores comunes al posicionar",
        content:
          "Muchos errores se deben a no tener en cuenta el contexto del posicionamiento. Por ejemplo, un elemento absolute necesita un padre con position distinta a static para posicionarse correctamente.",
        example: `.padre {
  position: relative;
}

.hija {
  position: absolute;
  top: 0;
  right: 0;
}`,
      },
      lifeCode: {
    html: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Posicionamiento en CSS</title>
  </head>
  <body>
    <h1>Ejemplo de Posicionamiento</h1>
    <div class="contenedor">
      <div class="caja">Caja posicionada</div>
    </div>
  </body>
</html>`,
    css: `/* Estilos de posicionamiento */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #fafafa;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.contenedor {
  position: relative;                /* Posición relativa */
  height: 300px;
  background: #eee;
  border: 2px dashed #ccc;
  margin: 0 auto;
  max-width: 600px;
}

.caja {
  position: absolute;                /* Posición absoluta */
  top: 50px;                         /* Posición arriba */
  left: 100px;                       /* Posición a la izquierda */
  width: 200px;
  height: 100px;
  background: lightblue;
  display: flex;                     /* Alineación, Lo veremos en los siguientes niveles */
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: 1px solid #333;
}`
  },
    },
    "6": {
      title: "📐 Nivel 6 – Propiedad display en CSS",
      objective:
        "Comprender cómo se comportan visualmente los elementos HTML (como bloques o en línea), y aprender a modificar ese comportamiento usando la propiedad display.",
      intro: {
        question: "🧱 ¿Cómo se comporta un elemento en la página?",
        content:
          "La propiedad display controla si un elemento se muestra como bloque, en línea, flexible, grid o se oculta. Cambiar display te permite controlar cómo se alinean y organizan los elementos.",
        code: `.caja {
  background: lightblue;
  margin: 10px;
}

.block {
  display: block;
}

.inline {
  display: inline;
}

.inline-block {
  display: inline-block;
  padding: 10px;
  width: 100px;
}`,
      },
      tags: [
        { label: "display", description: "Define cómo se comporta un elemento en el flujo del documento (block, inline, flex, etc.)" },
        { label: "block", description: "Hace que el elemento ocupe todo el ancho disponible y comience en una nueva línea" },
        { label: "inline", description: "Hace que el elemento no comience en una nueva línea y solo ocupe el ancho necesario" },
        { label: "inline-block", description: "Combina características de inline y block, permitiendo tamaño ajustable sin romper la línea" },
        { label: "none", description: "Oculta completamente el elemento, como si no existiera en el DOM visualmente" }
      ],
      tips: [
        "✔️ Usa block para secciones grandes (div, header, section).",
        "✔️ Usa inline-block si necesitas un diseño flexible con tamaño personalizado.",
        "✔️ Usa display: none para ocultar elementos sin eliminar su HTML.",
      ],
      extra: {
        title: "📋 Valores comunes por etiqueta",
        content:
          "Conocer el comportamiento por defecto de las etiquetas te ayuda a evit ar sorpresas. Puedes cambiarlo con display.",
        example: `Etiqueta      Display por defecto
<div>, <p>     → block
<span>, <a>    → inline
<img>          → inline-block`,
      },
      lifeCode: {
    html: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Ejemplo de Display</title>
  </head>
  <body>
    <h1>Demostración de display en CSS</h1>

    <div class="caja block">Elemento Block</div>
    <span class="caja inline">Elemento Inline</span>
    <span class="caja inline">Otro Inline</span>
    <span class="caja inline-block">Inline-Block 1</span>
    <span class="caja inline-block">Inline-Block 2</span>

    <p>Este es un párrafo <span class="caja inline">con un inline</span> embebido.</p>
  </body>
</html>`,
    css: `body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f5f5f5;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.caja {
  background: lightblue;
  margin: 10px;
  padding: 10px;
  border: 1px solid #333;
}

.block {
  display: block;
}

.inline {
  display: inline;
  background: lightgreen;
}

.inline-block {
  display: inline-block;
  background: lightcoral;
  width: 120px;
  text-align: center;
}`
  },
    },
    "7": {
      title: "📦 Nivel 7 – Flexbox básico en CSS",
      objective:
        "Aprender a utilizar Flexbox para alinear y distribuir elementos dentro de un contenedor, de forma horizontal o vertical, con propiedades como display: flex, justify-content y align-items.",
      intro: {
        question: "🧭 ¿Cómo alinear elementos de forma flexible?",
        content:
          "Flexbox es un sistema unidimensional que facilita la alineación y distribución del espacio entre elementos dentro de un contenedor, tanto en fila como en columna.",
        code: `.contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: #eee;
}

<div class="contenedor">
  <div>Elemento 1</div>
  <div>Elemento 2</div>
</div>`,
      },
      tags: [
        { label: "flex", description: "Convierte un contenedor en un flex container, habilitando el uso de propiedades flexibles" },
        { label: "justify-content", description: "Controla la alineación horizontal de los elementos dentro del contenedor flex" },
        { label: "align-items", description: "Controla la alineación vertical de los elementos dentro del contenedor flex" },
        { label: "flex-direction", description: "Define la dirección principal del eje flex (row, column, etc.)" },
        { label: "gap", description: "Establece el espacio entre elementos dentro del contenedor flex" },
        { label: "flex-wrap", description: "Permite que los elementos se envuelvan a la siguiente línea si no caben" },
        { label: "flex-grow", description: "Determina cuánto puede crecer un elemento en relación con los demás dentro del contenedor" }
      ],
      tips: [
        "✔️ Usa Flexbox para centrar elementos sin márgenes complicados.",
        "✔️ Combina justify-content y align-items para controlar ambos ejes.",
        "✔️ Usa gap para separar elementos sin usar margin.",
      ],
      extra: {
        title: "🧩 ¿Qué hace cada propiedad clave?",
        content:
          "Flexbox trabaja en un solo eje (principal o cruzado). Usa `flex-direction: row` para organizar horizontalmente, o `column` para vertical. `justify-content` controla la alineación en el eje principal y `align-items` en el cruzado.",
        example: `.contenedor {
  display: flex;                     /* Alineación con flex */
  flex-direction: column;            /* Alineación en columna */
  justify-content: space-between;    /* Alineación separada */
  align-items: center;               /* Alineación items */
  gap: 20px;
}`,
      },
      lifeCode: {
  html: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Ejemplo Flexbox Básico</title>
  </head>
  <body>
    <h1>Distribución con Flexbox</h1>

    <div class="contenedor">
      <div class="item">Elemento 1</div>
      <div class="item">Elemento 2</div>
      <div class="item">Elemento 3</div>
    </div>
  </body>
</html>`,
  css: `body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f5f5f5;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.contenedor {
  display: flex;                     /* Alineación con flex */
  justify-content: space-around;     /* Alineación horizontal */
  align-items: center;               /* Alineación vertical */
  gap: 20px;                         /* Espacio entre elementos */
  background: #e0e0e0;
  padding: 20px;
  height: 200px;
  border-radius: 10px;
}

.item {
  background: #90caf9;
  padding: 20px;
  border-radius: 8px;
  flex: 1;
  text-align: center;
}`
  },
    },
    "8": {
      title: "🔲 Nivel 8 – Grid básico en CSS",
      objective:
        "Aprender a utilizar CSS Grid para crear diseños de dos dimensiones (filas y columnas), organizando visualmente los elementos en estructuras complejas con total control.",
      intro: {
        question: "🧱 ¿Cómo estructurar contenido en filas y columnas?",
        content:
          "CSS Grid es un sistema bidimensional que permite organizar elementos en filas y columnas simultáneamente. Ideal para diseños complejos y responsivos.",
        code: `.contenedor {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 10px;
}

<div class="contenedor">
  <div>Elemento 1</div>
  <div>Elemento 2</div>
  <div>Elemento 3</div>
  <div>Elemento 4</div>
</div>`,
      },
      tags: [
        { label: "grid", description: "Convierte un contenedor en un grid container, permitiendo distribuir elementos en filas y columnas" },
        { label: "grid-template-columns", description: "Define el número y tamaño de las columnas del grid" },
        { label: "grid-template-rows", description: "Define el número y tamaño de las filas del grid" },
        { label: "gap", description: "Establece el espacio entre las filas y/o columnas del grid" },
        { label: "fr", description: "Unidad fraccional que representa una parte del espacio disponible dentro del grid" },
        { label: "repeat", description: "Función que permite repetir patrones en la definición de filas o columnas" }
      ],
      tips: [
        "✔️ Usa `fr` para dividir espacio de forma proporcional.",
        "✔️ Usa `repeat()` para simplificar columnas repetidas.",
        "✔️ Usa `gap` para separar filas y columnas sin márgenes.",
      ],
      extra: {
        title: "📐 Alineación y tamaño flexible",
        content:
          "`justify-items` y `align-items` controlan el contenido dentro de cada celda. `justify-content` y `align-content` afectan la cuadrícula completa. Usa `auto` y `fr` para adaptarte al contenido y al espacio disponible.",
        example: `.contenedor {
  display: grid;
  grid-template-columns: 1fr 2fr;    /* Alineación en filas */
  justify-items: center;
  align-items: center;
}`,
      },
      lifeCode: {
  html: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Ejemplo de CSS Grid</title>
  </head>
  <body>
    <h1>Demostración de CSS Grid</h1>

    <div class="grid-container">
      <div class="item">Elemento 1</div>
      <div class="item">Elemento 2</div>
      <div class="item">Elemento 3</div>
      <div class="item">Elemento 4</div>
      <div class="item">Elemento 5</div>
      <div class="item">Elemento 6</div>
    </div>
  </body>
</html>`,
  css: `body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f9f9f9;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.item {
  background-color: #add8e6;
  padding: 20px;
  text-align: center;
  border: 1px solid #333;
  font-weight: bold;
}`
  },
    },
    "9": {
      title: "🎞️ Nivel 9 – Transiciones en CSS",
      objective:
        "Aprender a aplicar transiciones suaves entre estados de un elemento HTML cuando cambian propiedades como color, tamaño, posición, entre otras.",
      intro: {
        question: "⏱️ ¿Cómo hacer que los cambios en CSS se vean más fluidos?",
        content:
          "Las transiciones permiten animar cambios de estilo en el tiempo. Por ejemplo, cuando un botón cambia de color o se agranda al pasar el mouse.",
        code: `.boton {
  background-color: royalblue;
  color: white;
  transition: background-color 0.3s ease;
}
.boton:hover {
  background-color: darkblue;
}`,
      },
      tags: [
        { label: "transition", description: "Permite aplicar una animación suave entre cambios de propiedades CSS" },
        { label: "transform", description: "Aplica transformaciones como rotación, escalado o traslación a un elemento" },
        { label: "rotate", description: "Gira un elemento en el eje Z (2D) o en otros ejes (3D) si se especifica" },
        { label: "hover", description: "Selector que aplica estilos cuando el usuario pasa el cursor sobre un elemento" },
        { label: "ease", description: "Función de temporización que inicia lento, acelera al medio y termina lento" },
        { label: "timing-function", description: "Define cómo se acelera o desacelera una animación o transición" },
        { label: "animation", description: "Permite aplicar una secuencia de estilos definidos en keyframes a un elemento" },
        { label: "keyframes", description: "Define los pasos intermedios de una animación CSS" }
      ],
      tips: [
        "✔️ Usa `transition` para mejorar la experiencia sin distraer.",
        "✔️ Anima solo propiedades compatibles (como color, transform).",
        "✔️ Usa `ease`, `linear`, o `ease-in-out` para controlar la velocidad.",
      ],
      extra: {
        title: "🌀 Transiciones múltiples y transformaciones",
        content:
          "Puedes combinar varias transiciones (por ejemplo, color y tamaño), y animar transformaciones como rotaciones o escalas.",
        example: `.caja {
  transition: background-color 0.4s ease, transform 0.4s ease;
}
.caja:hover {
  background-color: seagreen;
  transform: rotate(5deg);
}`,
      },
      lifeCode: {
    html: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Botón con Transición</title>
  </head>
  <body>
    <div class="container">
      <h1>Botones Animados</h1>
      <p class="subtitle">Pasa el mouse sobre cada botón para ver diferentes efectos de animación y transición</p>
      
      <div class="button-container">
        <div class="button-box">
          <h3>Elevación</h3>
          <button class="boton boton-1">Pasa el mouse</button>
        </div>
        
        <div class="button-box">
          <h3>Onda</h3>
          <button class="boton boton-2">Pasa el mouse</button>
        </div>
        
        <div class="button-box">
          <h3>Borde</h3>
          <button class="boton boton-3">Pasa el mouse</button>
        </div>
        
        <div class="button-box">
          <h3>Pulso</h3>
          <button class="boton boton-4">Pasa el mouse</button>
        </div>
        
        <div class="button-box">
          <h3>3D</h3>
          <button class="boton boton-5">Pasa el mouse</button>
        </div>
        
        <div class="button-box">
          <h3>Rotación</h3>
          <button class="boton boton-6">Pasa el mouse</button>
        </div>
        
        <div class="button-box">
          <h3>Carga</h3>
          <button class="boton boton-7">Pasa el mouse</button>
        </div>
        
        <div class="button-box">
          <h3>Deslizamiento</h3>
          <button class="boton boton-8">Pasa el mouse</button>
        </div>
      </div>
      
      <div class="instrucciones">
        <h3>Efectos Implementados</h3>
        <ul>
          <li><strong>Elevación:</strong> Movimiento hacia arriba con sombra</li>
          <li><strong>Onda:</strong> Efecto de onda radial desde el punto de clic</li>
          <li><strong>Borde:</strong> Cambio de estilo de contorno a relleno</li>
          <li><strong>Pulso:</strong> Animación pulsante con sombra expansiva</li>
          <li><strong>3D:</strong> Rotación en perspectiva 3D</li>
          <li><strong>Rotación:</strong> Movimiento oscilante al pasar el mouse</li>
          <li><strong>Carga:</strong> Degradado animado en el fondo</li>
          <li><strong>Deslizamiento:</strong> Transición de color con efecto de deslizamiento</li>
        </ul>
      </div>
    </div>
  </body>
</html>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
    
body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a2980, #26d0ce);
  padding: 20px;
}
    
.container {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  width: 100%;
}
    
h1 {
  margin-bottom: 30px;
  color: #1a2980;
  font-size: 2.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}
    
.subtitle {
  color: #444;
  margin-bottom: 40px;
  font-size: 1.1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}
    
.button-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
}
    
.button-box {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  width: 250px;
}
    
.button-box h3 {
  margin-bottom: 15px;
  color: #1a2980;
}
    
.boton {
  background-color: royalblue;
  color: white;
  padding: 15px 25px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  display: inline-block;
}
    
/* Botón 1: Efecto hover básico */
.boton-1:hover {
  background-color: darkblue;
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
    
/* Botón 2: Efecto de onda */
.boton-2::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%);
  transform-origin: 50% 50%;
}
    
.boton-2:hover::after {
  animation: onda 0.7s ease-out;
}

@keyframes onda {
  0% {
    transform: scale(0.1, 0.1) translate(-50%);
    opacity: 0.8;
  }
  100% {
    transform: scale(20, 20) translate(-50%);
    opacity: 0;
  }
}
    
/* Botón 3: Efecto de borde */
.boton-3 {
  background: transparent;
  color: royalblue;
  border: 2px solid royalblue;
}
    
.boton-3:hover {
  background-color: royalblue;
  color: white;
  box-shadow: 0 0 15px rgba(65, 105, 225, 0.6);
  letter-spacing: 1px;
}
    
/* Botón 4: Efecto pulsante */
.boton-4:hover {
  animation: pulse 1.5s infinite;
}
    
@keyframes pulse {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(65, 105, 225, 0.7);
  }
  70% {
    transform: scale(1.05);
    box-shadow: 0 0 0 15px rgba(65, 105, 225, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(65, 105, 225, 0);
  }
}
    
/* Botón 5: Efecto 3D */
.boton-5 {
  transform: perspective(500px) rotateY(15deg);
  background: linear-gradient(to right, royalblue, #4169e1cc);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
}
    
.boton-5:hover {
  transform: perspective(500px) rotateY(-15deg);
  background: linear-gradient(to left, royalblue, #4169e1cc);
  letter-spacing: 2px;
}
    
/* Botón 6: Efecto de rotación */
.boton-6:hover {
  animation: rotate 0.7s ease;
}
    
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(5deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
    
/* Botón 7: Efecto de carga */
.boton-7 {
  position: relative;
  z-index: 1;
}
    
.boton-7::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, darkblue, #1a2980, #26d0ce, darkblue);
  z-index: -1;
  background-size: 400%;
  border-radius: 8px;
  opacity: 0;
  transition: all 0.4s;
}
    
.boton-7:hover::before {
  opacity: 1;
  animation: gradient 8s linear infinite;
}
    
@keyframes gradient {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 400%;
  }
}
    
.boton-7:hover {
  color: white;
  transform: translateY(-5px);
}
    
/* Botón 8: Efecto de deslizamiento */
.boton-8 {
  background: linear-gradient(to right, royalblue 50%, darkblue 50%);
  background-size: 200% 100%;
  background-position: right bottom;
  transition: all 0.5s ease;
}
    
.boton-8:hover {
  background-position: left bottom;
  transform: scale(1.05);
}
    
/* Instrucciones */
.instrucciones {
  margin-top: 40px;
  padding: 20px;
  background-color: #e3f2fd;
  border-radius: 10px;
  text-align: left;
}
    
.instrucciones h3 {
  color: #1a2980;
  margin-bottom: 15px;
}
    
.instrucciones ul {
  padding-left: 20px;
}
    
.instrucciones li {
  margin-bottom: 10px;
  line-height: 1.6;
}
    
/* Responsive */
@media (max-width: 768px) {
  .button-container {
    gap: 20px;
  }
      
  .button-box {
    width: 100%;
    max-width: 300px;
  }
}`
  },
    },
    "10": {
      title: "📱 Nivel 10 – Responsive Design con Media Queries",
      objective:
        "Aprender a utilizar media queries en CSS para adaptar el diseño de una página web a diferentes tamaños de pantalla, como celulares, tablets y escritorios.",
      intro: {
        question:
          "📐 ¿Cómo adaptar tu sitio web a todos los tamaños de pantalla?",
        content:
          "Con media queries puedes aplicar estilos diferentes dependiendo del ancho de la pantalla. Así tu sitio se verá bien en móviles, tablets y escritorios.",
        code: `@media (max-width: 600px) {
  body {
    background-color: lightgray;
  }
}`,
      },
      tags: [
        { label: "responsive", description: "Diseño que se adapta automáticamente a diferentes tamaños de pantalla y dispositivos" },
        { label: "media queries", description: "Reglas CSS que aplican estilos específicos dependiendo del ancho, alto o tipo de dispositivo" },
        { label: "max-width", description: "Establece el ancho máximo que puede ocupar un elemento" },
        { label: "min-width", description: "Establece el ancho mínimo que debe tener un elemento" },
        { label: "breakpoints", description: "Puntos definidos en los que el diseño cambia para adaptarse a diferentes tamaños de pantalla" }
      ],
      tips: [
        "✔️ Diseña pensando primero en móvil (mobile first).",
        "✔️ Usa unidades relativas como %, em o vw.",
        "✔️ Usa media queries después del estilo base.",
      ],
      extra: {
        title: "📊 Ejemplo con múltiples breakpoints",
        content:
          "Puedes adaptar la interfaz para distintos dispositivos usando condiciones como `min-width`, `max-width`, y `orientation`.",
        example: `/* Móvil */
@media (max-width: 480px) {
  .menu {
    display: none;
  }
}

/* Tablet */
@media (min-width: 481px) and (max-width: 768px) {
  .contenedor {
    flex-direction: column;
  }
}

/* Escritorio */
@media (min-width: 769px) {
  .contenedor {
    flex-direction: row;
  }`,
      },
      lifeCode: {
    html: `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Diseño Responsive con Media Queries</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <h1>Ejemplo Responsive</h1>
    <p class="mensaje">Ajusta el tamaño de la ventana para ver los cambios.</p>
    <div class="contenedor">
      <div class="caja">Caja 1</div>
      <div class="caja">Caja 2</div>
      <div class="caja">Caja 3</div>
    </div>
  </body>
</html>`,
    css: `body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #ffffff;
  color: #333;
  text-align: center;
}

.contenedor {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
}

.caja {
  background-color: #a0c4ff;
  padding: 30px;
  border: 2px solid #333;
  flex: 1 1 200px;
}

/* Móviles */
@media (max-width: 480px) {
  body {
    background-color: #ffe0e0;
  }
  .mensaje::after {
    content: " - Vista móvil";
  }
}

/* Tablets */
@media (min-width: 481px) and (max-width: 768px) {
  body {
    background-color: #fff5ba;
  }
  .mensaje::after {
    content: " - Vista tablet";
  }
}

/* Escritorios */
@media (min-width: 769px) {
  body {
    background-color: #e0ffe0;
  }
  .mensaje::after {
    content: " - Vista escritorio";
  }
}`
  },
    },
  },
};
