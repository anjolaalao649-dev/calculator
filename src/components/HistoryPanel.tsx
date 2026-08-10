import React, { useState } from 'react';
import {
  History,
  X,
  Search,
  Pin,
  Trash2,
  Copy,
  Check,
  Download,
  ArrowUpRight,
} from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onSelectExpression: (expr: string) => void;
  onTogglePin: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onClearAll: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  isOpen,
  onClose,
  history,
  onSelectExpression,
  onTogglePin,
  onDeleteItem,
  onClearAll,
}) => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filtered = history.filter(
    (item) =>
      item.expression.toLowerCase().includes(search.toLowerCase()) ||
      item.result.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const exportHistory = (format: 'json' | 'txt') => {
    let content = '';
    let mimeType = 'text/plain';
    let ext = 'txt';

    if (format === 'json') {
      content = JSON.stringify(history, null, 2);
      mimeType = 'application/json';
      ext = 'json';
    } else {
      content = history
        .map(
          (h) =>
            `[${new Date(h.timestamp).toLocaleString()}] (${h.mode}) ${h.expression} = ${h.result}`
        )
        .join('\n');
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dellcalc-history-${Date.now()}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md h-full bg-slate-900 dark:bg-slate-900 light:bg-white border-l border-slate-800 light:border-slate-300 p-6 flex flex-col justify-between shadow-2xl overflow-hidden">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 light:border-slate-200">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                <History className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 light:text-slate-900 text-lg">
                  Calculation History
                </h3>
                <p className="text-xs text-slate-400 light:text-slate-500">
                  {history.length} saved entries
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white light:hover:text-slate-900 hover:bg-slate-800 light:hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mt-4 mb-3">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search history expressions or results..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-800/80 light:bg-slate-100 border border-slate-700/60 light:border-slate-300 text-slate-200 light:text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* List of Items */}
        <div className="flex-1 overflow-y-auto my-2 pr-1 space-y-2.5">
          {filtered.length === 0 ? (
            <div className="h-48 flex flex-col items-center justify-center text-center text-slate-500">
              <History className="w-8 h-8 opacity-40 mb-2" />
              <p className="text-xs">No calculations found in history</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-xl border transition-all ${
                  item.isPinned
                    ? 'bg-indigo-950/40 border-indigo-500/40'
                    : 'bg-slate-800/40 light:bg-slate-50 border-slate-700/40 light:border-slate-200 hover:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                  <span className="uppercase font-bold tracking-wider text-indigo-400">
                    {item.mode}
                  </span>
                  <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <div
                  className="font-mono text-xs text-slate-300 light:text-slate-600 truncate cursor-pointer hover:text-white"
                  onClick={() => {
                    onSelectExpression(item.expression);
                    onClose();
                  }}
                  title="Click to load expression"
                >
                  {item.expression}
                </div>

                <div className="flex items-center justify-between mt-1 pt-1 border-t border-slate-700/30">
                  <span
                    className="font-mono text-sm font-bold text-emerald-400 cursor-pointer hover:underline"
                    onClick={() => {
                      onSelectExpression(item.result);
                      onClose();
                    }}
                    title="Click to use result"
                  >
                    = {item.result}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(item.id, `${item.expression} = ${item.result}`)}
                      className="p-1 text-slate-400 hover:text-white"
                      title="Copy"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => onTogglePin(item.id)}
                      className={`p-1 ${item.isPinned ? 'text-amber-400' : 'text-slate-500 hover:text-amber-400'}`}
                      title={item.isPinned ? 'Unpin' : 'Pin calculation'}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1 text-slate-500 hover:text-rose-400"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        onSelectExpression(item.result);
                        onClose();
                      }}
                      className="p-1 text-indigo-400 hover:text-indigo-300"
                      title="Load into calculator"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-800 light:border-slate-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => exportHistory('txt')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 light:bg-slate-100 hover:bg-slate-700 text-xs font-medium text-slate-300 light:text-slate-700 flex items-center gap-1"
            >
              <Download className="w-3 h-3" /> TXT
            </button>
            <button
              onClick={() => exportHistory('json')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 light:bg-slate-100 hover:bg-slate-700 text-xs font-medium text-slate-300 light:text-slate-700 flex items-center gap-1"
            >
              <Download className="w-3 h-3" /> JSON
            </button>
          </div>

          <button
            onClick={onClearAll}
            disabled={history.length === 0}
            className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 text-xs font-semibold flex items-center gap-1 disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear Unpinned
          </button>
        </div>
      </div>
    </div>
  );
};
