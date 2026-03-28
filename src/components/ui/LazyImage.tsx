'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  skeleton?: boolean;
  aspectRatio?: 'square' | 'video' | 'auto';
  containerClassName?: string;
}

export const LazyImage = React.forwardRef<HTMLImageElement, LazyImageProps>(
  (
    {
      src,
      alt,
      skeleton = true,
      aspectRatio = 'auto',
      containerClassName,
      className,
      ...props
    },
    ref
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
      const img = imgRef.current;
      if (!img) return;

      // Use Intersection Observer for lazy loading
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              img.src = src;
              observer.unobserve(img);
            }
          });
        },
        { rootMargin: '50px' }
      );

      observer.observe(img);

      return () => observer.disconnect();
    }, [src]);

    const aspectRatioMap = {
      square: 'aspect-square',
      video: 'aspect-video',
      auto: '',
    };

    return (
      <div
        className={cn(
          'relative overflow-hidden rounded-lg bg-muted',
          aspectRatioMap[aspectRatio],
          containerClassName
        )}
      >
        {skeleton && !isLoaded && !hasError && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-muted to-muted-hover" />
        )}

        <img
          ref={(node) => {
            imgRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(true);
          }}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          {...props}
        />

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted text-foreground-secondary">
            <p className="text-sm">Failed to load image</p>
          </div>
        )}
      </div>
    );
  }
);

LazyImage.displayName = 'LazyImage';
