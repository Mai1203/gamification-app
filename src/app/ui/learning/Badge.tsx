import React from 'react';
import { Badge } from '@/data/badgeData';

interface BadgeProps {
  badge: Badge;
  unlocked: boolean;
  onClick?: () => void;
  className?: string; // Nueva prop para clases adicionales
}

const BadgeComponent: React.FC<BadgeProps> = ({ 
  badge, 
  unlocked = true,
  className = ''
}) => {
  // Función para dividir títulos en dos líneas
  const renderTitle = (title: string) => {
    const parts = title.split('  ');
    return parts.map((part, index) => (
      <span key={index} className="block leading-tight">
        {part}
      </span>
    ));
  };

  return (
    <div 
      className={`
        relative aspect-[3/4] w-full max-w-[160px] rounded-md
        flex flex-col items-center justify-center 
        text-center font-bold text-white shadow-lg p-[8%]
        transition-all duration-300 transform
        ${unlocked 
          ? `bg-gradient-to-br ${badge.gradient} cursor-pointer hover:scale-105 hover:shadow-xl border-2 border-white/20` 
          : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-500 opacity-80 grayscale'}
        ${className}
      `}
    >
      {unlocked && (
        <>
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-[3%] h-[3%] bg-white rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 90 + 5}%`,
                  left: `${Math.random() * 90 + 5}%`,
                  animationDuration: `${Math.random() * 2 + 1}s`,
                  opacity: Math.random() * 0.5 + 0.3
                }}
              />
            ))}
          </div>
          <div className="absolute inset-0 rounded-2xl border-2 border-white/10 pointer-events-none" />
        </>
      )}
      
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDUwIDUwIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSIxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')]" />

      <div className="text-[min(4vw,2.5rem)] mb-[5%] z-10">
        {badge.emoji}
      </div>
      
      <div className="font-bold text-[min(2.5vw,1rem)] flex flex-col justify-center items-center w-[90%] h-[30%] z-10">
        {renderTitle(badge.title)}
      </div>
      
      <div className="absolute top-[5%] right-[5%] bg-white/30 rounded-full w-[20%] aspect-square flex items-center justify-center backdrop-blur-sm text-[min(2.5vw,0.75rem)] font-mono font-bold z-10">
        {badge.id}
      </div>

      <div className={`absolute top-0 left-0 w-[40%] h-[6%] bg-white/50 transform -translate-y-1/2 rotate-45 origin-left ${unlocked ? '' : 'hidden'}`} />
    </div>
  );
};

export default BadgeComponent;