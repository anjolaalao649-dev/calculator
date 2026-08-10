import React, { useState } from 'react';
import {
  Calculator,
  FlaskConical,
  Binary,
  LineChart,
  Boxes,
  ArrowRightLeft,
  BookOpen,
  History,
  Settings,
  Info,
  Sun,
  Moon,
  Sparkles,
  Menu,
  X,
  Palette,
} from 'lucide-react';
import { CalcMode, ThemeMode } from '../types';

interface HeaderProps {
  currentMode: CalcMode;
  onSelectMode: (mode: CalcMode) => void;
  historyCount: number;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  theme: ThemeMode;
  onToggleTheme: (theme: ThemeMode) => void;
}

const MODES: { id: CalcMode; label: string; icon: React.ReactNode }[] = [
  { id: 'standard', label: 'Standard', icon: <Calculator className="w-4 h-4" /> },
  { id: 'scientific', label: 'Scientific', icon: <FlaskConical className="w-4 h-4" /> },
  { id: 'programmer', label: 'Programmer', icon: <Binary className="w-4 h-4" /> },
  { id: 'graphing', label: 'Graphing', icon: <LineChart className="w-4 h-4" /> },
  { id: 'advanced', label: 'Advanced', icon: <Boxes className="w-4 h-4" /> },
  { id: 'converter', label: 'Converter', icon: <ArrowRightLeft className="w-4 h-4" /> },
  { id: 'formulas', label: 'Formulas', icon: <BookOpen className="w-4 h-4" /> },
];

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  historyCount,
  onOpenHistory,
  onOpenSettings,
  onOpenAbout,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const nextTheme: Record<ThemeMode, ThemeMode> = {
    dark: 'light',
    light: 'emerald',
    emerald: 'cyberpunk',
    cyberpunk: 'dark',
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onSelectMode('standard')}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold italic text-lg shadow-sm shadow-blue-200 dark:shadow-none">
              Σ
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 dark:text-white">
                Dell Calc<span className="text-blue-600">Pro</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-100 dark:border-blue-900 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                v2.5
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900 p-1 rounded-full border border-slate-200/60 dark:border-slate-800">
            {MODES.map((mode) => {
              const isActive = currentMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => onSelectMode(mode.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs transition-all ${
                    isActive
                      ? 'font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-300 border border-blue-100 dark:border-blue-900 shadow-sm'
                      : 'font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {mode.icon}
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* History Trigger */}
            <button
              onClick={onOpenHistory}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              title="Calculation History"
            >
              <History className="w-4 h-4" />
              {historyCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {historyCount > 99 ? '99+' : historyCount}
                </span>
              )}
            </button>

            {/* Theme Selector */}
            <button
              onClick={() => onToggleTheme(nextTheme[theme])}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors flex items-center justify-center"
              title={`Theme: ${theme.toUpperCase()} (Click to cycle)`}
            >
              {theme === 'dark' && <Moon className="w-4 h-4 text-indigo-400" />}
              {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
              {theme === 'emerald' && <Sparkles className="w-4 h-4 text-emerald-500" />}
              {theme === 'cyberpunk' && <Palette className="w-4 h-4 text-pink-500" />}
            </button>

            {/* Settings Trigger */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
              title="Calculator Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* About / SDLC Specs Trigger */}
            <button
              onClick={onOpenAbout}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-100 dark:border-blue-900 transition-colors"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Specs & SDLC</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  onSelectMode(mode.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium transition-all ${
                  currentMode === mode.id
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200'
                }`}
              >
                {mode.icon}
                <span>{mode.label}</span>
              </button>
            ))}
            <button
              onClick={() => {
                onOpenAbout();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 dark:bg-blue-950 dark:text-blue-300 col-span-2 sm:col-span-1"
            >
              <Info className="w-4 h-4" />
              <span>Specs & SDLC</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
