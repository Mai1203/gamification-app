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
      tags: ["<head>", "<body>"],
      tips: [
        "✔️ Todas las etiquetas (excepto algunas) se abren y se cierran.",
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`,
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
      tags: ["<h1>", "<h2>", "...", "<h5>", "<h6>", "<p>"],
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
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
    },
    "3": {
      title: "🔗 Nivel 3 – Enlaces en HTML",
      objective:
        "Aprender a crear enlaces que permitan navegar entre páginas o acceder a otros sitios web.",
      intro: {
        question: "🌐 ¿Qué es un enlace en HTML?",
        content:
          "Un enlace permite conectar una página web con otra, o con un recurso externo. Se crea usando la etiqueta <a> y el atributo href.",
        code: `<a href="https://www.google.com">Ir a Google</a>`,
      },
      tags: ["<a>", "href", "target"],
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <a href="https://www.youtube.com/" target="_blank">Visitar YouTube en Sitio Externo</a>
  </body>
</html>`,
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
      tags: ["<img>", "src", "alt"],
      tips: [
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h2>Esto es una imagen</h2>
    <img src="https://i.blogs.es/c7b68e/chatgpt-studio-ghibli-portada/1200_800.jpeg" alt="Imagen de ChatGPT Studio GHIBLI" width="300">
  </body>
</html>`,
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
      tags: ["<ul>", "<ol>", "<li>"],
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
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
  <tr>
    <th>Nombre</th>
    <th>Edad</th>
  </tr>
  <tr>
    <td>Ana</td>
    <td>22</td>
  </tr>
  <tr>
    <td>Luis</td>
    <td>30</td>
  </tr>
</table>`,
      },
      tags: ["<table>", "<tr>", "<td>", "<th>"],
      tips: [
        "✔️ <th> se usa para encabezados de columna (generalmente la primera fila).",
        "✔️ <td> contiene los datos de cada celda.",
        "✔️ <tr> representa una fila de la tabla.",
      ],
      extra: {
        title: "🧩 ¿Cómo organizar la tabla?",
        content:
          "Primero defines la tabla con <table>. Luego, cada fila se escribe con <tr> y dentro de cada fila colocas celdas de datos <td> o encabezados <th>.",
        example: 
  `<table>
    <tr>
      <th>Producto</th>
      <th>Precio</th>
    </tr>
    <tr>
      <td>Camisa</td>
      <td>$25</td>
    </tr>
  </table>`,
      },
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <table border="1">
      <h2>Tabla de Edades</h2>
      
      <tr>
        <th>Nombre</th>
        <th>Edad</th>
      </tr>
      <tr>
        <td>Ana</td>
        <td>22</td>
      </tr>
      <tr>
        <td>Luis</td>
        <td>30</td>
      </tr>
    </table>
  </body>
</html>`,
    },
    "7": {
      title: "📨 Nivel 7 – Formularios en HTML",
      objective:
        "Aprender a construir formularios HTML básicos que permitan al usuario ingresar y enviar datos, utilizando etiquetas como <form>, <input>, <label> y <button>.",
      intro: {
        question: "🧾 ¿Qué es un formulario en HTML?",
        content:
          "Un formulario permite al usuario introducir datos (nombre, correo, comentarios, etc.) y enviarlos al servidor para su procesamiento. Se define con la etiqueta <form>.",
        code: 
`<form action="procesar.php" method="post">
  <label for="nombre">Nombre:</label>
  <input type="text" id="nombre" name="nombre">
  <button type="submit">Enviar</button>
</form>`,
      },
      tags: [
        "<form>",
        "<input>",
        "<label>",
        "<button>",
        "type",
        "name",
        "required",
      ],
      tips: [
        "✔️ Usa <label> para cada campo para mejorar la accesibilidad.",
        "✔️ Conecta <label> con <input> usando el atributo for.",
        "✔️ Usa el atributo required en campos obligatorios.",
        "✔️ Usa type='email', 'number', etc. para validaciones automáticas.",
      ],
      extra: {
        title: "🧪 Tipos de campos comunes en formularios",
        content:
          "Puedes usar distintos tipos de entrada como texto, correo, número, contraseña, etc. También puedes agrupar campos con <fieldset> y darles contexto con <legend>.",
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <form>
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
    </form>
  </body>
</html>`,
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
        "<header>",
        "<nav>",
        "<main>",
        "<section>",
        "<article>",
        "<aside>",
        "<footer>",
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
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
        "<audio>",
        "<video>",
        "<source>",
        "controls",
        "autoplay",
        "loop",
        "muted",
        "poster",
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
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
        "alt-text",
        "aria-label",
        "semantic-html",
        "keyboard-navigation",
        "contrast-ratio",
        "skip-links",
        "focus-indicators",
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
      lifeCode: `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TuplaCore - Accesibilidad</title>
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
    <img src="logo.svg" alt="TuplaCore" width="200">
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
    },
  },
  css: {
    "1": {
      title: "🎨 Nivel 11 – Selectores básicos en CSS",
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
      tags: ["selector", "clase", "id", "etiqueta", "CSS básico"],
      tips: [
        "✔️ Usa clases (.clase) para aplicar estilos a varios elementos.",
        "✔️ Usa IDs (#id) solo cuando el elemento es único en la página.",
        "✔️ Nombra tus clases e IDs con sentido, como .boton-principal o #header.",
      ],
      extra: {
        title: "🆚 Diferencias entre clase e ID",
        content:
          "Una clase puede repetirse en varios elementos. Un ID debe ser único. Las clases se declaran con un punto (.) y los IDs con una almohadilla (#).",
        example: `<!-- HTML -->
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`,
    },
    "2": {
      title: "🌈 Nivel 12 – Propiedades de color y fondo en CSS",
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
        "color",
        "background-color",
        "background-image",
        "estilos visuales",
        "contraste",
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`,
    },
    "3": {
      title: "✍️ Nivel 13 – Tipografía y fuentes en CSS",
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
        "tipografía",
        "fuentes",
        "font-family",
        "alineación",
        "legibilidad",
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`,
    },
    "4": {
      title: "📦 Nivel 14 – Box Model (Modelo de Caja)",
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
        "box model",
        "padding",
        "margin",
        "border",
        "espaciado",
        "estructura",
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
}`,
      },
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`,
    },
    "5": {
      title: "📍 Nivel 15 – Posicionamiento en CSS",
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
      tags: ["position", "relative", "absolute", "fixed", "sticky", "layout"],
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`,
    },
    "6": {
      title: "📐 Nivel 16 – Propiedad display en CSS",
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
      tags: ["display", "bloques", "inline", "ocultar", "layout"],
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`,
    },
    "7": {
      title: "📦 Nivel 17 – Flexbox básico en CSS",
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
        "flexbox",
        "justify-content",
        "align-items",
        "flex-direction",
        "gap",
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}`,
      },
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`,
    },
    "8": {
      title: "🔲 Nivel 18 – Grid básico en CSS",
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
      tags: ["grid", "grid-template-columns", "gap", "fr", "repeat"],
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
  grid-template-columns: 1fr 2fr;
  justify-items: center;
  align-items: center;
}`,
      },
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`,
    },
    "9": {
      title: "🎞️ Nivel 19 – Transiciones en CSS",
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
      tags: ["transition", "hover", "ease", "transform", "timing-function"],
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`,
    },
    "10": {
      title: "📱 Nivel 20 – Responsive Design con Media Queries",
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
        "responsive",
        "media queries",
        "max-width",
        "min-width",
        "breakpoints",
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
      lifeCode: `<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`,
    },
  },
};
