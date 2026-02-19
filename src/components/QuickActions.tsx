'use client';

import { useState } from 'react';

interface QuickAction {
  id: string;
  icon: string;
  label: string;
  description: string;
  color: string;
}

interface ActionResult {
  status: string;
  message: string;
  data?: string;
  preview?: string;
  note?: string;
}

const actions: QuickAction[] = [
  { id: 'market-scan', icon: '📊', label: 'Market Scan', description: 'Run GTCP market intelligence', color: 'bg-blue-600' },
  { id: 'deal-sourcing', icon: '🏎️', label: 'Deal Sourcing', description: 'Scan auctions & dealers', color: 'bg-indigo-600' },
  { id: 'check-portfolio', icon: '💰', label: 'Check Portfolio', description: 'Myriad, MegaETH, Humanity', color: 'bg-green-600' },
  { id: 'check-email', icon: '📧', label: 'Check Email', description: 'Scan inbox for urgent items', color: 'bg-yellow-600' },
  { id: 'check-calendar', icon: '📅', label: 'Check Calendar', description: 'Next 48h events', color: 'bg-orange-600' },
  { id: 'update-memory', icon: '🧠', label: 'Update Memory', description: 'Review & consolidate notes', color: 'bg-purple-600' },
  { id: 'web-search', icon: '🔍', label: 'Web Search', description: 'Quick research query', color: 'bg-cyan-600' },
  { id: 'moltbook', icon: '🦞', label: 'Moltbook', description: 'Check posts & engage', color: 'bg-red-600' },
  { id: 'lp-research', icon: '🏦', label: 'LP Research', description: 'Find new investor prospects', color: 'bg-emerald-600' },
  { id: 'generate-report', icon: '📝', label: 'Generate Report', description: 'Weekly summary or analysis', color: 'bg-pink-600' },
];

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [runningAction, setRunningAction] = useState<string | null>(null);
  const [result, setResult] = useState<ActionResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAction = async (action: QuickAction) => {
    setRunningAction(action.id);
    setResult(null);
    setShowResult(false);

    try {
      const res = await fetch('/api/actions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actionId: action.id }),
      });
      const data = await res.json();
      setResult(data);
      setShowResult(true);
    } catch (err: any) {
      setResult({ status: 'error', message: err.message || 'Failed to run action' });
      setShowResult(true);
    } finally {
      setRunningAction(null);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => { setIsOpen(!isOpen); setShowResult(false); }}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white text-2xl transition-all duration-200 z-50 ${
          isOpen ? 'bg-zinc-700 rotate-45' : 'bg-purple-600 hover:bg-purple-500 hover:scale-110'
        }`}
      >
        {isOpen ? '✕' : '⚡'}
      </button>

      {/* Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => { setIsOpen(false); setShowResult(false); }}
          />

          {/* Result panel */}
          {showResult && result && (
            <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-[22rem] md:w-96 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                <h3 className="text-white font-semibold">
                  {result.status === 'instant' ? '📋 Result' : result.status === 'queued' ? '⏳ Queued' : '❌ Error'}
                </h3>
                <button
                  onClick={() => setShowResult(false)}
                  className="text-zinc-400 hover:text-white text-sm"
                >✕</button>
              </div>
              <div className="p-4 space-y-3 max-h-[50vh] overflow-y-auto">
                <p className="text-zinc-200 text-sm leading-relaxed">{result.message}</p>
                {result.data && (
                  <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700">
                    <pre className="text-zinc-300 text-xs whitespace-pre-wrap font-mono leading-relaxed">{result.data}</pre>
                  </div>
                )}
                {result.preview && (
                  <div className="bg-zinc-800/50 rounded-lg p-3 border border-zinc-700">
                    <p className="text-zinc-400 text-xs whitespace-pre-wrap leading-relaxed">{result.preview}</p>
                  </div>
                )}
                {result.note && (
                  <p className="text-yellow-400 text-xs">{result.note}</p>
                )}
              </div>
            </div>
          )}

          {/* Actions panel */}
          <div className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 md:w-80 max-h-[70vh] bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
            <div className="p-4 border-b border-zinc-800">
              <h3 className="text-white font-semibold text-lg">Quick Actions</h3>
              <p className="text-zinc-400 text-sm mt-1">Run commands with one click</p>
            </div>

            <div className="overflow-y-auto max-h-[55vh] p-3 space-y-2">
              {actions.map((action) => {
                const isRunning = runningAction === action.id;

                return (
                  <button
                    key={action.id}
                    onClick={() => !isRunning && handleAction(action)}
                    disabled={isRunning}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      isRunning
                        ? 'bg-zinc-800 opacity-70'
                        : 'bg-zinc-800/50 hover:bg-zinc-800 border border-transparent hover:border-zinc-700'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-lg">{isRunning ? '⏳' : action.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{action.label}</p>
                      <p className="text-zinc-400 text-xs truncate">{action.description}</p>
                    </div>
                    {isRunning && (
                      <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
