import { Code2, Layout, Palette } from "lucide-react";
import { motion } from "framer-motion";

export const Carts = () => {
  return (
    <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
      <motion.div
        whileHover={{ y: -5, transition: { duration: 0.3 } }}
        className="bg-white p-8 rounded-xl shadow-lg"
      >
        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
          <Layout className="h-6 w-6 text-indigo-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">HTML Estructurado</h3>
        <p className="text-gray-600">
          Aprende a crear la estructura perfecta para tus páginas web con HTML5.
        </p>
      </motion.div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
          <Palette className="h-6 w-6 text-purple-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">CSS Creativo</h3>
        <p className="text-gray-600">
          Domina el arte del diseño web con CSS moderno y responsive.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
          <Code2 className="h-6 w-6 text-yellow-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">JavaScript Dinámico</h3>
        <p className="text-gray-600">
          Da vida a tus páginas web con interactividad y funcionalidades
          dinámicas.
        </p>
      </div>
    </div>
  );
};
