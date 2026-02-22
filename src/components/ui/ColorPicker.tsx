import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { cn } from '../../utils/cn';

interface ColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    label?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative flex flex-col gap-2">
            {label && <span className="text-sm font-medium text-olive-800">{label}</span>}
            <div
                className="flex items-center gap-3 p-2 rounded-xl border border-beige-300/50 bg-beige-50/50 cursor-pointer hover:bg-beige-100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div
                    className="w-8 h-8 rounded-lg shadow-inner-soft border border-olive-900/10"
                    style={{ backgroundColor: color }}
                />
                <span className="text-sm font-medium uppercase text-olive-700">{color}</span>
            </div>

            {isOpen && (
                <div className="absolute top-full mt-2 left-0 z-50 animate-scale-in" ref={popoverRef}>
                    <div className="p-3 bg-white rounded-2xl shadow-xl border border-beige-200">
                        <HexColorPicker color={color} onChange={onChange} />
                    </div>
                </div>
            )}
        </div>
    );
};
