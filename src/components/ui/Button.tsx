import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'sneaky-btn',
                    {
                        'sneaky-btn-primary': variant === 'primary',
                        'sneaky-btn-secondary': variant === 'secondary',
                        'hover:bg-olive-100 text-olive-800 bg-transparent': variant === 'ghost',
                        'text-sm px-4 py-2 rounded-lg': size === 'sm',
                        'px-6 py-2.5 rounded-xl': size === 'md',
                        'text-lg px-8 py-3 rounded-2xl': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';
