import { useState, useEffect, useCallback } from 'react';
import { ErrorCorrectionLevel, DotType, CornerSquareType, CornerDotType } from 'qr-code-styling';
import { QR_TEMPLATES } from '../lib/templates';

export interface QRState {
    id?: string;
    title: string;
    data: string;
    size: number;
    margin: number;
    errorCorrectionLevel: ErrorCorrectionLevel;
    templateId: string;
    dotsOptions: { type: DotType; color: string };
    backgroundOptions: { color: string };
    cornersSquareOptions: { type: CornerSquareType; color: string };
    cornersDotOptions: { type: CornerDotType; color: string };
    image?: string;
    showLogo?: boolean;
}

const DEFAULT_STATE: QRState = {
    title: '',
    data: '',
    size: 300,
    margin: 10,
    errorCorrectionLevel: 'Q',
    templateId: 'classic-olive',
    dotsOptions: { type: 'square', color: '#526046' },
    backgroundOptions: { color: '#F5F1E8' },
    cornersSquareOptions: { type: 'square', color: '#526046' },
    cornersDotOptions: { type: 'square', color: '#526046' },
    showLogo: true,
};

export function useQRState() {
    const [state, setState] = useState<QRState>(DEFAULT_STATE);

    const [savedCodes, setSavedCodes] = useState<QRState[]>(() => {
        const saved = sessionStorage.getItem('qr-saved-codes');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('qr-saved-codes', JSON.stringify(savedCodes));
    }, [savedCodes]);

    const updateState = useCallback((updates: Partial<QRState>) => {
        setState(prev => ({ ...prev, ...updates }));
    }, []);

    const applyTemplate = useCallback((templateId: string) => {
        const template = QR_TEMPLATES.find(t => t.id === templateId);
        if (template) {
            setState(prev => ({
                ...prev,
                templateId,
                dotsOptions: { ...prev.dotsOptions, ...template.options.dotsOptions },
                backgroundOptions: { ...prev.backgroundOptions, ...template.options.backgroundOptions },
                cornersSquareOptions: { ...prev.cornersSquareOptions, ...template.options.cornersSquareOptions },
                cornersDotOptions: { ...prev.cornersDotOptions, ...template.options.cornersDotOptions },
            }));
        }
    }, []);

    const saveCurrentCode = useCallback(() => {
        const id = state.id || Date.now().toString();
        const codeToSave = { ...state, id, title: state.title || 'Untitled QR Code' };

        setSavedCodes(prev => {
            const exists = prev.some(c => c.id === id);
            if (exists) {
                return prev.map(c => c.id === id ? codeToSave : c);
            }
            return [codeToSave, ...prev];
        });
        setState(codeToSave);
    }, [state]);

    const deleteCode = useCallback((id: string) => {
        setSavedCodes(prev => prev.filter(c => c.id !== id));
    }, []);

    const loadCode = useCallback((code: QRState) => {
        setState(code);
    }, []);

    return {
        state,
        updateState,
        applyTemplate,
        savedCodes,
        saveCurrentCode,
        deleteCode,
        loadCode
    };
}
