export type Badge = {
  id: number;
  title: string;
  emoji: string;
  category: 'html' | 'css';
  level: number;
  gradient: string;
};

export const badges: Badge[] = [
  // HTML (1-10)
  { id: 1, title: "HTML Novato", emoji: "📄", category: "html", level: 1, gradient: "from-blue-500 to-blue-700" },
  { id: 2, title: "Máster de Texto", emoji: "✒️", category: "html", level: 2, gradient: "from-blue-400 to-blue-600" },
  { id: 3, title: "Conector de Páginas", emoji: "🔗", category: "html", level: 3, gradient: "from-blue-300 to-blue-500" },
  { id: 4, title: "Fotógrafo Web", emoji: "📷", category: "html", level: 4, gradient: "from-indigo-500 to-indigo-700" },
  { id: 5, title: "Organizador de Ítems", emoji: "📋", category: "html", level: 5, gradient: "from-indigo-400 to-indigo-600" },
  { id: 6, title: "Tablero Maestro", emoji: "🗂️", category: "html", level: 6, gradient: "from-indigo-300 to-indigo-500" },
  { id: 7, title: "Maestro de Formularios", emoji: "📝", category: "html", level: 7, gradient: "from-purple-500 to-purple-700" },
  { id: 8, title: "Semántico", emoji: "🧠", category: "html", level: 8, gradient: "from-purple-400 to-purple-600" },
  { id: 9, title: "Productor Multimedia", emoji: "🎬", category: "html", level: 9, gradient: "from-purple-300 to-purple-500" },
  { id: 10, title: "Accesible", emoji: "♿", category: "html", level: 10, gradient: "from-cyan-500 to-cyan-700" },
  
  // CSS (11-20)
  { id: 11, title: "Selector Básico", emoji: "🎯", category: "css", level: 11, gradient: "from-red-500 to-red-700" },
  { id: 12, title: "Paleta Artística", emoji: "🎨", category: "css", level: 12, gradient: "from-red-400 to-red-600" },
  { id: 13, title: "Tipógrafo", emoji: "✒️", category: "css", level: 13, gradient: "from-red-300 to-red-500" },
  { id: 14, title: "Arquitecto de Cajas", emoji: "📦", category: "css", level: 14, gradient: "from-orange-500 to-orange-700" },
  { id: 15, title: "Navegador de Layout", emoji: "🧭", category: "css", level: 15, gradient: "from-orange-400 to-orange-600" },
  { id: 16, title: "Display Maestro", emoji: "💻", category: "css", level: 16, gradient: "from-orange-300 to-orange-500" },
  { id: 17, title: "Flexibilizador", emoji: "🧘", category: "css", level: 17, gradient: "from-yellow-500 to-yellow-700" },
  { id: 18, title: "Maestro de Grid", emoji: "🔲", category: "css", level: 18, gradient: "from-yellow-400 to-yellow-600" },
  { id: 19, title: "Animador", emoji: "✨", category: "css", level: 19, gradient: "from-yellow-300 to-yellow-500" },
  { id: 20, title: "Adaptativo", emoji: "📱", category: "css", level: 20, gradient: "from-green-500 to-green-700" }
];

// Obtener insignias por categoría
export const getBadgesByCategory = (category: 'html' | 'css') => {
  return badges.filter(badge => badge.category === category);
};

// Obtener insignia por nivel
export const getBadgeByLevel = (level: number) => {
  return badges.find(badge => badge.level === level);
};