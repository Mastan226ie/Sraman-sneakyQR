import React from 'react';
import { QRState } from '../hooks/useQRState';
import { QR_TEMPLATES } from '../lib/templates';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Label } from './ui/Label';
import { ColorPicker } from './ui/ColorPicker';
import { Link2, LayoutTemplate, Palette } from 'lucide-react';
import { cn } from '../utils/cn';

interface QROptionsFormProps {
    state: QRState;
    updateState: (updates: Partial<QRState>) => void;
    applyTemplate: (id: string) => void;
}

export const QROptionsForm: React.FC<QROptionsFormProps> = ({ state, updateState, applyTemplate }) => {
    return (
        <div className="flex flex-col gap-6 w-full max-w-xl">
            {/* Content Section */}
            <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Link2 className="w-5 h-5 text-olive-600" />
                    <h2 className="text-lg font-semibold text-olive-900">Content</h2>
                </div>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title / Name</Label>
                        <Input
                            id="title"
                            value={state.title || ''}
                            onChange={(e) => updateState({ title: e.target.value })}
                            placeholder="Sraman SneakyQR"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="url">URL</Label>
                        <Input
                            id="url"
                            value={state.data}
                            onChange={(e) => updateState({ data: e.target.value })}
                            placeholder="https://sramanqr.com" 
                        />
                        {state.data.length > 0 && !Boolean(URL.canParse ? URL.canParse(state.data) : (() => { try { new URL(state.data); return true; } catch { return false; } })()) && (
                            <p className="text-red-500 text-xs font-medium">Please enter a valid URL (e.g., https://example.com)</p>
                        )}
                    </div>
                </div>
            </Card>

            {/* Templates Section */}
            <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <LayoutTemplate className="w-5 h-5 text-olive-600" />
                    <h2 className="text-lg font-semibold text-olive-900">Templates</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {QR_TEMPLATES.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => applyTemplate(t.id)}
                            className={cn(
                                "p-3 rounded-xl border transition-all text-sm font-medium text-left",
                                state.templateId === t.id
                                    ? "border-olive-500 bg-olive-50 text-olive-900 shadow-sm"
                                    : "border-beige-200 hover:border-olive-300 hover:bg-beige-100/50 text-olive-700"
                            )}
                        >
                            {t.name}
                        </button>
                    ))}
                </div>
            </Card>

            {/* Customization Section */}
            <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Palette className="w-5 h-5 text-olive-600" />
                    <h2 className="text-lg font-semibold text-olive-900">Colors & Style</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ColorPicker
                        label="Square Color"
                        color={state.dotsOptions.color || '#000000'}
                        onChange={(c) => updateState({
                            dotsOptions: { ...state.dotsOptions, color: c },
                            cornersSquareOptions: { ...state.cornersSquareOptions, color: c },
                            cornersDotOptions: { ...state.cornersDotOptions, color: c },
                        })}
                    />
                    <ColorPicker
                        label="Background"
                        color={state.backgroundOptions.color || '#ffffff'}
                        onChange={(c) => updateState({
                            backgroundOptions: { ...state.backgroundOptions, color: c }
                        })}
                    />
                    <div className="col-span-2 pt-2 border-t border-beige-200 mt-2">
                        <div className="flex items-center justify-between p-3 bg-white border border-beige-200 rounded-xl hover:border-olive-300 transition-colors cursor-pointer" onClick={() => updateState({ showLogo: !state.showLogo })}>
                            <div className="flex flex-col">
                                <span className="text-sm font-semibold text-olive-900">Include PB Logo</span>
                                <span className="text-xs text-olive-600">Adds the logo to the center</span>
                            </div>
                            <div className={cn("w-10 h-6 rounded-full p-1 transition-colors duration-200 ease-in-out", state.showLogo ? "bg-olive-600" : "bg-beige-300")}>
                                <div className={cn("w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out", state.showLogo ? "translate-x-4" : "translate-x-0")} />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

        </div>
    );
};
