import Link from "next/link";
import { motion } from "framer-motion";

interface CardCarouselProps {
  title: string;
  description: string;
  emoji: string;
  link: string;
  imageUrl: string;
  color?: string;
  className?: string;
  isActive?: boolean;
}

export default function CardCarousel({
  title,
  description,
  emoji,
  link,
  imageUrl,
  color = "from-blue-500 to-indigo-600",
  className = "",
  isActive = false
}: CardCarouselProps) {
  return (
    <motion.div 
      className={`relative h-full w-full rounded-2xl overflow-hidden ${className}`}
      animate={{ 
        scale: isActive ? 1 : 0.95,
        opacity: isActive ? 1 : 0.7
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Imagen de fondo con gradiente */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} z-0`}></div>
      
      {/* Imagen de fondo */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-20"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      
      {/* Contenido */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-8">
        <motion.span 
          className="text-6xl mb-6"
          animate={{ 
            scale: isActive ? [1, 1.2, 1] : 1,
            rotate: isActive ? [0, 10, -10, 0] : 0
          }}
          transition={{ 
            duration: 0.8,
            times: [0, 0.2, 0.8, 1]
          }}
        >
          {emoji}
        </motion.span>
        
        <motion.h2 
          className="text-4xl font-bold text-white mb-4"
          animate={{ 
            y: isActive ? 0 : 20,
            opacity: isActive ? 1 : 0
          }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h2>
        
        <motion.p 
          className="text-xl text-white/90 max-w-md mb-8"
          animate={{ 
            y: isActive ? 0 : 20,
            opacity: isActive ? 1 : 0
          }}
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>
        
        <motion.div
          animate={{ 
            y: isActive ? 0 : 20,
            opacity: isActive ? 1 : 0
          }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            href={link}
            className="inline-block bg-white text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            Explorar ahora
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}