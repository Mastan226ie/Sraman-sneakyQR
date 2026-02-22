import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QRState } from '../hooks/useQRState';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Slider } from './ui/Slider';
import { Label } from './ui/Label';
import { Download, Copy, CheckCircle2, Bookmark, QrCode } from 'lucide-react';
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

    const optionsKey = JSON.stringify({
        width: state.size,
        margin: state.margin,
        errorCorrectionLevel: state.errorCorrectionLevel,
        dotsOptions: state.dotsOptions,
        backgroundOptions: state.backgroundOptions,
        cornersSquareOptions: state.cornersSquareOptions,
        cornersDotOptions: state.cornersDotOptions,
        showLogo: state.showLogo,
        data: validData
    });

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
    }, [optionsKey]);

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

    // In QRPreview, state.data is actually the `generatedData` passed from App.tsx
    // The live form data never reaches here until 'Generate QR' is clicked.
    // So we just check if it's a valid URL or empty.
    const isUrlValid = isValidUrl(state.data) && state.data.length > 0;

    // We want to show the QR code if we have a valid generated URL
    const showQR = isUrlValid;

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-md mx-auto sticky top-8">
            <Card className="p-8 w-full flex flex-col items-center gap-6 relative overflow-hidden min-h-[400px]">
                {!isUrlValid && state.data.length > 0 && (
                    <div className="absolute top-0 left-0 right-0 bg-red-50 text-red-600 text-[11px] font-medium py-1.5 px-4 text-center border-b border-red-100 z-10">
                        Invalid generated URL (e.g., https://example.com)
                    </div>
                )}

                <div className="flex flex-col items-center gap-4 w-full mt-2">
                    <div className="relative group flex justify-center w-full">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className={cn(
                                "rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-300 relative",
                                showQR ? "shadow-sm border border-beige-200/50 bg-white" : "w-[300px] h-[300px] border-2 border-dashed border-beige-300 bg-beige-50/50"
                            )}
                        >
                            <div ref={ref} className={showQR ? "block" : "hidden"} />
                            {!showQR && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-olive-400 gap-3">
                                    <QrCode className="w-10 h-10 opacity-40" />
                                    <span className="text-sm font-medium">No QR Code Generated</span>
                                </div>
                            )}
                        </motion.div>
                    </div>
                    {/* Live Title Display */}
                    <h3 className="text-lg font-semibold text-olive-900 text-center w-full truncate px-4">
                        {state.title || "Sraman SneakyQR"}
                    </h3>
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
                    <Button onClick={handleSave} variant="primary" className="w-full" disabled={!isUrlValid}>
                        {saved ? <CheckCircle2 className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        {saved ? 'Saved!' : 'Save Code'}
                    </Button>
                    <div className="flex gap-3 w-full">
                        <Button onClick={onCopyClick} variant="secondary" className="flex-1 text-sm py-2" disabled={!isUrlValid}>
                            {copied ? <CheckCircle2 className="w-4 h-4 text-olive-600" /> : <Copy className="w-4 h-4" />}
                            {copied ? 'Copied' : 'Copy'}
                        </Button>
                        <Button onClick={onDownloadClick} variant="secondary" className="flex-1 text-sm py-2" disabled={!isUrlValid}>
                            <Download className="w-4 h-4" />
                            Download
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
