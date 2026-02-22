import React from 'react';
import { cn } from '../../utils/cn';

export const Slider = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
        return (
            <input
                type="range"
                ref={ref}
                className={cn(
                    'w-full h-2 bg-beige-200 rounded-lg appearance-none cursor-pointer accent-olive-500',
                    className
                )}
                {...props}
            />
        );
    }
);
Slider.displayName = 'Slider';
