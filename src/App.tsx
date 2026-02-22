import { useState, useEffect } from 'react';
import { useQRState } from './hooks/useQRState';
import { QROptionsForm } from './components/QROptionsForm';
import { QRPreview } from './components/QRPreview';
import { QrCode, Library, PlusCircle, Trash2, Heart } from 'lucide-react';
import { Card } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { cn } from './utils/cn';

function App() {
  const {
    state,
    updateState,
    applyTemplate,
    savedCodes,
    saveCurrentCode,
    deleteCode,
    loadCode
  } = useQRState();

  const [activeTab, setActiveTab] = useState<'generator' | 'my-codes'>('generator');
  const [generatedData, setGeneratedData] = useState<string>(state.data || 'https://sramanqr.com');
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleGenerate = () => {
    setGeneratedData(state.data);
  };

  if (isAppLoading) {
    return (
      <div className="min-h-screen bg-beige-100 flex flex-col items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-6 animate-pulse-slow">
          <div className="w-20 h-20 rounded-2xl bg-olive-900 text-beige-50 flex items-center justify-center shadow-lg">
            <QrCode className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-olive-900">
            SneakyQR
          </h1>
          <p className="text-olive-600 font-medium">Loading elegant experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-beige-100/50 flex flex-col font-sans selection:bg-olive-200 selection:text-olive-900 pb-24 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-beige-50/80 backdrop-blur-md border-b border-beige-200/50 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-olive-900 text-beige-50 flex items-center justify-center shadow-soft">
              <QrCode className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-olive-900">
              SneakyQR
            </h1>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-olive-700">
            <button
              onClick={() => setActiveTab('generator')}
              className={cn("transition-colors", activeTab === 'generator' ? 'text-olive-900 font-bold' : 'hover:text-olive-900')}
            >
              Generator
            </button>
            <button
              onClick={() => setActiveTab('my-codes')}
              className={cn("transition-colors", activeTab === 'my-codes' ? 'text-olive-900 font-bold' : 'hover:text-olive-900')}
            >
              My Codes
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12 flex flex-col relative items-center justify-center min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-160px)]">
        {activeTab === 'generator' ? (
          <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-20 w-full animate-fade-in max-w-5xl">
            <div className="flex-1 w-full max-w-xl shrink-0">
              {/* Desktop Title */}
              <div className="mb-6 hidden md:block">
                <h2 className="text-3xl font-bold text-olive-900 tracking-tight mb-2">Create your QR Code</h2>
                <p className="text-olive-600 text-sm">Design elegant, scannable codes with a quiet luxury aesthetic.</p>
              </div>

              {/* Mobile Title */}
              <div className="mb-6 md:hidden text-center">
                <h2 className="text-2xl font-bold text-olive-900 tracking-tight mb-1">SneakyQR</h2>
                <p className="text-olive-600 text-sm font-medium">Customize the QR</p>
              </div>

              <QROptionsForm
                state={state}
                updateState={updateState}
                applyTemplate={applyTemplate}
              />
              {/* Mobile Generate Button */}
              <div className="flex md:hidden justify-end mt-6 w-full">
                <Button onClick={handleGenerate} variant="primary" className="w-full py-3 text-base shadow-md hover:shadow-lg transition-all">Generate QR</Button>
              </div>
            </div>

            <aside className="w-full lg:w-[440px] shrink-0 animate-scale-in flex flex-col gap-6 lg:mt-12">
              {/* Desktop Generate Button */}
              <div className="hidden md:flex justify-end w-full">
                <Button onClick={handleGenerate} variant="primary" className="w-auto px-8 py-3 text-base shadow-md hover:shadow-lg transition-all">Generate QR</Button>
              </div>
              <QRPreview
                state={{ ...state, data: generatedData }}
                updateState={updateState}
                saveCurrentCode={saveCurrentCode}
              />
            </aside>
          </div>
        ) : (
          <div className="w-full max-w-3xl mx-auto animate-fade-in my-8 md:my-0">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-olive-900 tracking-tight mb-2">My Saved Codes</h2>
              <p className="text-olive-600 text-sm">Manage your elegant QR code designs.</p>
            </div>
            {savedCodes.length === 0 ? (
              <Card className="p-12 flex flex-col items-center justify-center text-center gap-4 border-dashed bg-beige-50/30">
                <Library className="w-12 h-12 text-olive-400 opacity-50" />
                <div>
                  <p className="text-olive-900 font-medium mb-1">No saved codes yet</p>
                  <p className="text-olive-600 text-sm">Generate and save a QR code to see it here.</p>
                </div>
                <Button variant="secondary" onClick={() => setActiveTab('generator')} className="mt-4">
                  Go to Generator
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4">
                {savedCodes.map(code => (
                  <Card key={code.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-olive-900">{code.title || 'Untitled'}</h3>
                      <p className="text-sm text-olive-600 truncate max-w-[200px] sm:max-w-[300px]">{code.data}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => { loadCode(code); setGeneratedData(code.data); setActiveTab('generator'); }}>
                        Load
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteCode(code.id!)}>
                        <Trash2 className="w-4 h-4 text-red-500/70" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-beige-200 flex justify-around items-center h-20 px-6 z-50 rounded-t-3xl shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        <button
          onClick={() => setActiveTab('generator')}
          className={cn("flex flex-col items-center gap-1.5 p-2 transition-all", activeTab === 'generator' ? "text-olive-800 scale-105" : "text-olive-400 hover:text-olive-600")}
        >
          <PlusCircle className={cn("w-6 h-6", activeTab === 'generator' && "fill-olive-100")} />
          <span className="text-[11px] font-semibold">Generate</span>
        </button>
        <button
          onClick={() => setActiveTab('my-codes')}
          className={cn("flex flex-col items-center gap-1.5 p-2 transition-all", activeTab === 'my-codes' ? "text-olive-800 scale-105" : "text-olive-400 hover:text-olive-600")}
        >
          <Library className={cn("w-6 h-6", activeTab === 'my-codes' && "fill-olive-100")} />
          <span className="text-[11px] font-semibold">My Codes</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="py-8 pb-32 md:pb-8 text-center text-xs md:text-sm text-olive-600 mt-auto">
        <p className="flex items-center justify-center gap-1.5 px-4">
          Made with <Heart className="w-3 h-3 md:w-4 md:h-4 text-red-500 fill-current shrink-0" /> by Sraman Labs &copy; 2026. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
