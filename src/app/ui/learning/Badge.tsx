// components/Badge.tsx

import React from 'react';
import { Badge } from '@/data/badgeData';

interface BadgeProps {
  badge: Badge;
  unlocked: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const BadgeComponent: React.FC<BadgeProps> = ({ 
  badge, 
  unlocked = true,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-24 h-28 text-sm',
    md: 'w-32 h-36 text-base',
    lg: 'w-40 h-44 text-lg'
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]}
        rounded-2xl flex flex-col items-center justify-center 
        text-center font-bold text-white shadow-lg p-4
        transition-all duration-300 transform
        ${unlocked 
          ? `${badge.gradient} cursor-pointer hover:scale-105 hover:shadow-xl` 
          : 'bg-gray-200 text-gray-400 opacity-75'}
      `}
    >
      <div className="text-4xl mb-2">{badge.emoji}</div>
      <div className="font-bold mb-1">{badge.title}</div>
      <div className="absolute top-2 right-2 bg-white bg-opacity-30 rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm">
        {badge.id}
      </div>
    </div>
  );
};

export default BadgeComponent;