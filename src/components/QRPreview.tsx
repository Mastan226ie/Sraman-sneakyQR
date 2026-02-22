import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QRState } from '../hooks/useQRState';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Slider } from './ui/Slider';
import { Label } from './ui/Label';
import { Download, Copy, CheckCircle2, Bookmark } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface QRPreviewProps {
    state: QRState;
    updateState: (updates: Partial<QRState>) => void;
    saveCurrentCode: () => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ state, updateState, saveCurrentCode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const qrCode = useRef<QRCodeStyling | null>(null);
    const [copied, setCopied] = useState(false);
    const [saved, setSaved] = useState(false);

    const isValidUrl = (urlString: string) => {
        try {
            return Boolean(new URL(urlString));
        } catch (e) {
            return false;
        }
    };

    const validData = isValidUrl(state.data) ? state.data : 'https://example.com';

    useEffect(() => {
        const currentOptions = {
            width: state.size,
            height: state.size,
            data: validData,
            margin: state.margin,
            qrOptions: { errorCorrectionLevel: state.errorCorrectionLevel },
            dotsOptions: state.dotsOptions,
            backgroundOptions: state.backgroundOptions,
            cornersSquareOptions: state.cornersSquareOptions,
            cornersDotOptions: state.cornersDotOptions,
            ...(state.showLogo ? {
                image: '/pb-logo.png',
                imageOptions: { hideBackgroundDots: true, imageSize: 0.7, crossOrigin: 'anonymous', margin: 5 }
            } : { image: undefined })
        };

        if (!qrCode.current) {
            qrCode.current = new QRCodeStyling(currentOptions);
            if (ref.current) {
                qrCode.current.append(ref.current);
            }
        } else {
            qrCode.current.update(currentOptions);
        }
    }, [state, validData]);

    const onDownloadClick = () => {
        if (!isValidUrl(state.data)) return;
        if (qrCode.current) {
            qrCode.current.download({ extension: 'png', name: state.title || 'sneaky-qr' });
        }
    };

    const onCopyClick = async () => {
        if (!isValidUrl(state.data)) return;
        if (qrCode.current) {
            try {
                const buffer = await qrCode.current.getRawData('png');
                if (buffer) {
                    const blob = new Blob([buffer as BlobPart], { type: 'image/png' });
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }
            } catch (err) {
                console.error('Failed to copy', err);
            }
        }
    };

    const handleSave = () => {
        if (!isValidUrl(state.data)) return;
        saveCurrentCode();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const isUrlValid = isValidUrl(state.data);

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto sticky top-8">
            <Card className="p-8 w-full flex flex-col items-center gap-8 relative overflow-hidden">
                {!isUrlValid && state.data.length > 0 && (
                    <div className="absolute top-0 left-0 right-0 bg-red-50 text-red-600 text-[11px] font-medium py-1.5 px-4 text-center border-b border-red-100 z-10">
                        Please enter a valid URL (e.g., https://example.com)
                    </div>
                )}
                <div className="relative group w-full flex justify-center mt-2">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={cn(
                            "rounded-2xl overflow-hidden shadow-sm border flex items-center justify-center bg-white transition-all duration-300",
                            isUrlValid || state.data.length === 0 ? "border-beige-200/50" : "border-red-200 opacity-50 blur-[2px]"
                        )}
                    >
                        <div ref={ref} />
                    </motion.div>
                </div>

                {/* Size Controls under QR code */}
                <div className="w-full space-y-3 pt-2">
                    <div className="flex justify-between items-center">
                        <Label>Size</Label>
                        <span className="text-sm text-olive-600 font-medium">{state.size}px</span>
                    </div>
                    <Slider
                        min={100}
                        max={360}
                        step={10}
                        value={state.size}
                        onChange={(e) => updateState({ size: parseInt(e.target.value) })}
                    />
                </div>

                {/* Primary Actions */}
                <div className="flex flex-col gap-3 w-full border-t border-beige-200 pt-6">
                    <Button onClick={handleSave} variant="primary" className="w-full">
                        {saved ? <CheckCircle2 className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        {saved ? 'Saved!' : 'Save Code'}
                    </Button>
                    <div className="flex gap-3 w-full">
                        <Button onClick={onCopyClick} variant="secondary" className="flex-1 text-sm py-2">
                            {copied ? <CheckCircle2 className="w-4 h-4 text-olive-600" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied' : 'Copy'}
                        </Button>
                        <Button onClick={onDownloadClick} variant="secondary" className="flex-1 text-sm py-2">
                            <Download className="w-4 h-4" />
                            Download
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
