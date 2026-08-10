import React, { useState } from 'react';
import { Copy, Check, Delete, RotateCcw, Database, AlertCircle } from 'lucide-react';
import { evaluateExpression } from '../utils/mathEngine';
import { AngleUnit } from '../types';

interface ExpressionDisplayProps {
  expression: string;
  setExpression: React.Dispatch<React.SetStateAction<string>>;
  lastResult: string;
  angleUnit: AngleUnit;
  onToggleAngleUnit: () => void;
  memorySet: boolean;
  onClear: () => void;
  onBackspace: () => void;
  precision: number;
}

export const ExpressionDisplay: React.FC<ExpressionDisplayProps> = ({
  expression,
  setExpression,
  lastResult,
  angleUnit,
  onToggleAngleUnit,
  memorySet,
  onClear,
  onBackspace,
  precision,
}) => {
  const [copied, setCopied] = useState(false);

  // Compute live preview if expression is non-empty
  const livePreview = React.useMemo(() => {
    if (!expression || expression === lastResult) return null;
    const res = evaluateExpression(expression, angleUnit, precision);
    if (res.isValid && res.result && res.result !== expression) {
      return res.result;
    }
    return null;
  }, [expression, lastResult, angleUnit, precision]);

  // Live error check if user typed invalid expression
  const liveError = React.useMemo(() => {
    if (!expression || expression.length < 3) return null;
    const res = evaluateExpression(expression, angleUnit, precision);
    if (!res.isValid && res.error && !res.error.includes('Incomplete')) {
      return res.error;
    }
    return null;
  }, [expression, angleUnit, precision]);

  const handleCopy = () => {
    const textToCopy = lastResult || expression;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="relative w-full rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between min-h-[140px] sm:min-h-[160px]">
      {/* Header bar inside display */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3 mb-2">
        <div className="flex items-center gap-2">
          {/* Angle Unit Badge */}
          <button
            onClick={onToggleAngleUnit}
            className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 text-[11px] font-bold tracking-wider uppercase transition-colors"
            title="Click to toggle DEG / RAD"
          >
            {angleUnit}
          </button>

          {/* Memory Badge */}
          {memorySet && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300 font-bold text-[11px] border border-blue-100 dark:border-blue-900">
              <Database className="w-3 h-3" /> M
            </span>
          )}

          {/* Live Error Warning */}
          {liveError && (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 text-[11px]">
              <AlertCircle className="w-3 h-3" /> {liveError}
            </span>
          )}
        </div>

        {/* Display Actions */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            disabled={!expression && !lastResult}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30"
            title="Copy Result"
          >
            {copied ? <Check className="w-4 h-4 text-blue-600" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={onBackspace}
            disabled={!expression}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-rose-500 disabled:opacity-30"
            title="Backspace"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            onClick={onClear}
            disabled={!expression && !lastResult}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-400 hover:text-rose-500 disabled:opacity-30"
            title="Clear Display"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Expression Input Box */}
      <div className="flex flex-col items-end justify-end overflow-x-auto py-1">
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
          placeholder="0"
          className="w-full text-right bg-transparent border-none outline-none font-mono text-xl sm:text-2xl font-medium text-slate-400 dark:text-slate-400 tracking-tight placeholder-slate-300 dark:placeholder-slate-700"
        />

        {/* Live calculated preview or final result */}
        <div className="h-10 mt-1 flex items-center justify-end font-mono text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
          {livePreview && (
            <span className="opacity-90 text-blue-600 dark:text-blue-400">
              = {livePreview}
            </span>
          )}
          {lastResult && !livePreview && (
            <span className="text-slate-900 dark:text-white">
              {lastResult}
            </span>
          )}
          {!lastResult && !livePreview && !expression && (
            <span className="text-slate-300 dark:text-slate-700">0</span>
          )}
        </div>
      </div>
    </div>
  );
};
