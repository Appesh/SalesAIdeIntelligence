import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

type ParallaxEffect = 'scale' | 'rotate' | 'opacity' | 'translateY' | 'translateX' | 'combined';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  effect?: ParallaxEffect;
  minScale?: number;
  maxScale?: number;
  minRotation?: number;
  maxRotation?: number;
  minOpacity?: number;
  maxOpacity?: number;
  minTranslateY?: number;
  maxTranslateY?: number;
  minTranslateX?: number;
  maxTranslateX?: number;
  scrollSensitivity?: number;
  transitionDuration?: number;
  reverse?: boolean;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  className,
  containerClassName,
  effect = 'scale',
  minScale = 1,
  maxScale = 1.2,
  minRotation = 0,
  maxRotation = 5,
  minOpacity = 0.8,
  maxOpacity = 1,
  minTranslateY = 0,
  maxTranslateY = -50,
  minTranslateX = 0,
  maxTranslateX = 20,
  scrollSensitivity = 0.5,
  transitionDuration = 0.3,
  reverse = false,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [transforms, setTransforms] = useState({
    scale: minScale,
    rotation: minRotation,
    opacity: minOpacity,
    translateY: minTranslateY,
    translateX: minTranslateX,
  });
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate if the image is in viewport
        const isInViewport = rect.top < windowHeight && rect.bottom > 0;
        
        if (isInViewport) {
          // Calculate scroll progress relative to the image position
          const elementTop = rect.top + currentScrollY;
          const elementHeight = rect.height;
          const scrollProgress = Math.max(0, Math.min(1, 
            (currentScrollY - elementTop + windowHeight) / (windowHeight + elementHeight)
          ));
          
          // Apply scroll sensitivity and reverse if needed
          let adjustedProgress = scrollProgress * scrollSensitivity;
          if (reverse) adjustedProgress = 1 - adjustedProgress;

          // Calculate transforms based on effect type
          const newTransforms = { ...transforms };

          switch (effect) {
            case 'scale':
              newTransforms.scale = minScale + (maxScale - minScale) * adjustedProgress;
              break;
            case 'rotate':
              newTransforms.rotation = minRotation + (maxRotation - minRotation) * adjustedProgress;
              break;
            case 'opacity':
              newTransforms.opacity = minOpacity + (maxOpacity - minOpacity) * adjustedProgress;
              break;
            case 'translateY':
              newTransforms.translateY = minTranslateY + (maxTranslateY - minTranslateY) * adjustedProgress;
              break;
            case 'translateX':
              newTransforms.translateX = minTranslateX + (maxTranslateX - minTranslateX) * adjustedProgress;
              break;
            case 'combined':
              newTransforms.scale = minScale + (maxScale - minScale) * adjustedProgress;
              newTransforms.rotation = minRotation + (maxRotation - minRotation) * adjustedProgress;
              newTransforms.opacity = minOpacity + (maxOpacity - minOpacity) * adjustedProgress;
              newTransforms.translateY = minTranslateY + (maxTranslateY - minTranslateY) * adjustedProgress;
              break;
          }

          setTransforms(newTransforms);
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [effect, minScale, maxScale, minRotation, maxRotation, minOpacity, maxOpacity,
      minTranslateY, maxTranslateY, minTranslateX, maxTranslateX, scrollSensitivity, reverse]);

  return (
    <div
      ref={imageRef}
      className={cn(
        "relative overflow-hidden flex items-center justify-center",
        "w-full h-64 md:h-80 lg:h-96", // Responsive height
        containerClassName
      )}
    >
      <div
        className={cn(
          "w-full h-full bg-cover bg-center bg-no-repeat",
          "transform-gpu", // Use GPU acceleration
          className
        )}
        style={{
          backgroundImage: `url(${src})`,
          transform: `scale(${transforms.scale}) rotate(${transforms.rotation}deg) translateY(${transforms.translateY}px) translateX(${transforms.translateX}px)`,
          opacity: transforms.opacity,
          transition: `all ${transitionDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
        role="img"
        aria-label={alt}
      />
      
      {/* Fallback img element for accessibility and SEO */}
      <img
        src={src}
        alt={alt}
        className="sr-only"
        loading="lazy"
      />
    </div>
  );
};

export default ParallaxImage;
export { ParallaxImage };
