import Link from "next/link";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  emoji: string;       
  link: string;
  imageUrl: string;
  className?: string;
}

const Card = ({ title, description, emoji, link, imageUrl, className = "" }:CardProps) => {
  return (
    <Link href={link} className={`block h-full ${className}`}>
      <div className={`
        h-full w-full rounded-2xl p-6 cursor-pointer
        flex flex-col md:flex-row overflow-hidden
        border-2 border-white/30
        bg-gradient-to-br from-indigo-600 to-purple-600
        backdrop-blur-md
        shadow-xl hover:shadow-2xl
        transition-all duration-300
      `}>
        {/* Imagen (en móvil va arriba, en desktop a la izquierda) */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover rounded-t-2xl rounded-b-2xl"
          />
        </div>

        {/* Contenido de texto */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-6 flex flex-col justify-center items-center text-white">
          <span className="text-5xl mb-4">{emoji}</span>
          <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
          <p className="text-xl mb-6 text-center">{description}</p>
          <div className="animate-pulse text-lg">👉 ¡Toca para explorar! 👈</div>
        </div>
      </div>
    </Link>
  );
};

export default Card;