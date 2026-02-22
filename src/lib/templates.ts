import { Options } from 'qr-code-styling';

export interface QRTemplate {
    id: string;
    name: string;
    options: Partial<Options>;
}

export const QR_TEMPLATES: QRTemplate[] = [
    {
        id: 'classic-olive',
        name: 'Classic Olive',
        options: {
            dotsOptions: { type: 'square', color: '#526046' },
            backgroundOptions: { color: '#F5F1E8' },
            cornersSquareOptions: { type: 'square', color: '#526046' },
            cornersDotOptions: { type: 'square', color: '#526046' },
        }
    },
    {
        id: 'earth-tones',
        name: 'Earth Tones',
        options: {
            dotsOptions: { type: 'rounded', color: '#94A68B' },
            backgroundOptions: { color: '#FCFBF9' },
            cornersSquareOptions: { type: 'extra-rounded', color: '#6B7C5C' },
            cornersDotOptions: { type: 'dot', color: '#6B7C5C' },
        }
    },
    {
        id: 'minimal-dot',
        name: 'Minimal Dot',
        options: {
            dotsOptions: { type: 'dots', color: '#8B9D77' },
            backgroundOptions: { color: '#ffffff' },
            cornersSquareOptions: { type: 'dot', color: '#3D4A34' },
            cornersDotOptions: { type: 'dot', color: '#3D4A34' },
        }
    },
    {
        id: 'modern-dark',
        name: 'Modern Dark',
        options: {
            dotsOptions: { type: 'classy-rounded', color: '#E8E4D9' },
            backgroundOptions: { color: '#323D2B' },
            cornersSquareOptions: { type: 'extra-rounded', color: '#CDD6C8' },
            cornersDotOptions: { type: 'dot', color: '#CDD6C8' },
        }
    },
    {
        id: 'vintage',
        name: 'Vintage',
        options: {
            dotsOptions: { type: 'classy', color: '#636054' },
            backgroundOptions: { color: '#E8E4D9' },
            cornersSquareOptions: { type: 'square', color: '#4D4A41' },
            cornersDotOptions: { type: 'square', color: '#4D4A41' },
        }
    },
    {
        id: 'soft-edge',
        name: 'Soft Edge',
        options: {
            dotsOptions: { type: 'rounded', color: '#6B7C5C' },
            backgroundOptions: { color: '#F5F7F4' },
            cornersSquareOptions: { type: 'extra-rounded', color: '#8B9D77' },
            cornersDotOptions: { type: 'dot', color: '#8B9D77' },
        }
    }
];
