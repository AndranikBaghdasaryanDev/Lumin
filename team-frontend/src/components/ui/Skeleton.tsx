import { forwardRef, type HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'card' | 'image';
  width?: string | number;
  height?: string | number;
  lines?: number; // for text variant
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ 
    variant = 'text', 
    width, 
    height, 
    lines = 1, 
    className, 
    ...props 
  }, ref) => {
    const baseClasses = 'animate-pulse bg-gray-200 rounded-lg';
    
    const variantClasses = {
      text: 'h-4',
      card: 'rounded-2xl',
      image: 'rounded-xl'
    };

    const renderContent = () => {
      switch (variant) {
        case 'text':
          return (
            <div className="space-y-2">
              {Array.from({ length: lines }).map((_, index) => (
                <div
                  key={index}
                  className={clsx(
                    baseClasses,
                    variantClasses.text,
                    index === lines - 1 ? 'w-3/4' : 'w-full',
                    className
                  )}
                  style={{
                    width: index === lines - 1 ? '75%' : width || '100%',
                    height: height || '1rem'
                  }}
                  {...props}
                />
              ))}
            </div>
          );
          
        case 'card':
          return (
            <div
              ref={ref}
              className={clsx(
                baseClasses,
                variantClasses.card,
                className
              )}
              style={{
                width: width || '100%',
                height: height || '200px'
              }}
              {...props}
            >
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-full animate-pulse" />
                  <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse" />
                  <div className="h-4 bg-gray-300 rounded w-4/6 animate-pulse" />
                </div>
              </div>
            </div>
          );
          
        case 'image':
          return (
            <div
              ref={ref}
              className={clsx(
                baseClasses,
                variantClasses.image,
                className
              )}
              style={{
                width: width || '100%',
                height: height || '200px'
              }}
              {...props}
            />
          );
          
        default:
          return null;
      }
    };

    return renderContent();
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
