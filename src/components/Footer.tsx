import React from 'react';
import { Keyboard, ShieldCheck, FileText, Github, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAbout: () => void;
  onOpenSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAbout, onOpenSettings }) => {
  return (
    <footer className="mt-auto w-full border-t border-slate-200 dark:border-slate-800 py-4 bg-white dark:bg-slate-950 text-slate-500 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: App Info */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            Dell Calc Pro &copy; {new Date().getFullYear()}
          </span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <span className="text-slate-500 dark:text-slate-400">
            Browser-based Scientific, Graphing & Programmer Engine
          </span>
        </div>

        {/* Center: Tech stack badges */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            React 19
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            TypeScript
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            math.js
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
            Tailwind CSS
          </span>
        </div>

        {/* Right: Quick Action Links */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span>Shortcuts</span>
          </button>
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>SDLC Docs</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
