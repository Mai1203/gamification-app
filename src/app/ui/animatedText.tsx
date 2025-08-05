import * as React from 'react';
import { useLayoutEffect, useRef, ReactNode, CSSProperties } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

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
  children, type = 'bounce', delay = 0, duration = 0.5,
  stagger = 0.05, className='', style={}, mode='words'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(function() {
      SplitText.create(containerRef.current!, {
        type: mode,            // 'words', 'chars', o 'lines'
        autoSplit: mode === 'lines', // útil si usas líneas
        onSplit(self) {
          const targets = mode === 'chars' ? self.chars
                        : mode === 'words' ? self.words
                        : self.lines;

          return gsap.fromTo(targets, {
            opacity: 0,
            ...(type === 'bounce' ? { y: -30 } : type === 'slideLeft' ? { x: 50 } : {}),
          }, {
            opacity: 1, y: 0, x: 0, scale: 1,
            duration, delay, stagger,
            ease: 'power3.out'
          });
        }
      });
    }, containerRef.current);

    return () => ctx.revert();
  }, [type, delay, duration, stagger, mode, children]);

  return (
    <div
      ref={containerRef}
      className={`${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default AnimatedText;
