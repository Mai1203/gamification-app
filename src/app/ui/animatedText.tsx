// components/ui/AnimatedText.tsx
'use client';
import * as React from 'react';
import { 
  useLayoutEffect, 
  useRef, 
  ReactNode, 
  CSSProperties
} from 'react';
import gsap from 'gsap';

type AnimationType = "fadeIn" | "bounce" | "scaleUp" | "slideLeft" | "typewriter";

interface AnimatedTextProps {
  children: ReactNode;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  style?: CSSProperties;
  mode?: "chars" | "words" | "lines";
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ 
  children, 
  type = "fadeIn", 
  delay = 0,
  duration = 0.5,
  stagger = 0.05,
  className = "",
  style = {},
  mode = "chars"
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const targets = Array.from(container.querySelectorAll('.animated-element'));
    if (targets.length === 0) return;
    
    const animationMap: Record<AnimationType, gsap.TweenVars> = {
      fadeIn: { opacity: 0, y: 20 },
      bounce: { opacity: 0, y: -30 },
      scaleUp: { opacity: 0, scale: 0.5 },
      slideLeft: { opacity: 0, x: 50 },
      typewriter: { opacity: 0, width: 0 }
    };

    const animationConfig = {
      ...animationMap[type],
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      width: "auto",
      duration,
      delay,
      stagger,
      ease: "power3.out"
    };

    gsap.fromTo(targets, animationMap[type], animationConfig);

  }, [type, delay, duration, stagger, mode, children]);

  const renderContent = () => {
    if (typeof children !== 'string') {
      return <span className="animated-element inline-block">{children}</span>;
    }

    if (mode === "words") {
      return children.split(' ').map((word, i) => (
        <React.Fragment key={`word-${i}`}>
          <span className="animated-element inline-block whitespace-nowrap">
            {word}
          </span>
          {i < children.split(' ').length - 1 && '\u00A0'}
        </React.Fragment>
      ));
    } 
    else if (mode === "lines") {
      return children.split('\n').map((line, i, arr) => (
        <React.Fragment key={`line-${i}`}>
          <span className="animated-element block">{line}</span>
          {i < arr.length - 1 && <br />}
        </React.Fragment>
      ));
    } 
    else {
      return children.split('').map((char, i) => (
        <span 
          key={`char-${i}`} 
          className="animated-element inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
    }
  };

  return (
    <div 
      ref={containerRef} 
      className={`${className}`} 
      style={style}
    >
      {renderContent()}
    </div>
  );
};

export default AnimatedText;