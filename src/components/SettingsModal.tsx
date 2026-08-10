import React from 'react';
import { Settings, X, Volume2, VolumeX, Keyboard, Sparkles, Check } from 'lucide-react';
import { AppSettings, ThemeMode, AngleUnit } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const themes: { id: ThemeMode; label: string; bg: string }[] = [
    { id: 'dark', label: 'Dark Glass', bg: 'bg-slate-900 border-slate-700' },
    { id: 'light', label: 'Light Modern', bg: 'bg-slate-100 border-slate-300' },
    { id: 'emerald', label: 'OLED Emerald', bg: 'bg-emerald-950 border-emerald-700' },
    { id: 'cyberpunk', label: 'Cyberpunk High-Contrast', bg: 'bg-black border-cyan-500' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-slate-900 dark:bg-slate-900 light:bg-white rounded-3xl border border-slate-800 light:border-slate-300 p-6 shadow-2xl space-y-6 overflow-y-auto max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 light:border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 light:text-slate-900 text-lg">
                Calculator Settings
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-500">
                Customize appearance, precision, and computation
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

        {/* Theme Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 light:text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Visual Theme
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => onUpdateSettings({ theme: t.id })}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  t.bg
                } ${
                  settings.theme === t.id
                    ? 'ring-2 ring-indigo-500 border-indigo-500 font-bold'
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <span className="text-xs font-medium text-slate-200 light:text-slate-800">
                  {t.label}
                </span>
                {settings.theme === t.id && <Check className="w-4 h-4 text-indigo-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* Precision Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <label className="font-semibold text-slate-300 light:text-slate-700">
              Decimal Precision ({settings.precision} places)
            </label>
            <span className="text-indigo-400 font-mono font-bold">{settings.precision} decimals</span>
          </div>
          <input
            type="range"
            min={0}
            max={10}
            value={settings.precision}
            onChange={(e) => onUpdateSettings({ precision: parseInt(e.target.value, 10) })}
            className="w-full accent-indigo-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
          />
          <p className="text-[11px] text-slate-500">Controls rounding for calculated results.</p>
        </div>

        {/* Default Angle Unit */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 light:text-slate-700">
            Default Trigonometric Angle Unit
          </label>
          <div className="flex rounded-xl bg-slate-800/80 light:bg-slate-100 p-1 border border-slate-700 light:border-slate-300">
            {(['deg', 'rad'] as AngleUnit[]).map((unit) => (
              <button
                key={unit}
                onClick={() => onUpdateSettings({ angleUnit: unit })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors ${
                  settings.angleUnit === unit
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 light:text-slate-600 hover:text-white'
                }`}
              >
                {unit === 'deg' ? 'Degrees (°)' : 'Radians (rad)'}
              </button>
            ))}
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3 pt-2 border-t border-slate-800 light:border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-200 light:text-slate-800 block">
                Thousands Separator
              </span>
              <span className="text-[11px] text-slate-500">Display numbers like 1,000,000.00</span>
            </div>
            <input
              type="checkbox"
              checked={settings.thousandsSeparator}
              onChange={(e) => onUpdateSettings({ thousandsSeparator: e.target.checked })}
              className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-200 light:text-slate-800 block">
                Audio Key Sound Feedback
              </span>
              <span className="text-[11px] text-slate-500">Play tactile synth clicks on press</span>
            </div>
            <button
              onClick={() => onUpdateSettings({ soundEnabled: !settings.soundEnabled })}
              className={`p-2 rounded-xl border ${
                settings.soundEnabled
                  ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                  : 'bg-slate-800 text-slate-500 border-slate-700'
              }`}
            >
              {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts Reference */}
        <div className="p-4 rounded-2xl bg-slate-800/50 light:bg-slate-100 border border-slate-700/50 light:border-slate-300 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 light:text-slate-700">
            <Keyboard className="w-4 h-4 text-indigo-400" /> Supported Keyboard Shortcuts
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] font-mono text-slate-400 light:text-slate-600">
            <div><span className="text-slate-200 font-bold">0-9 .</span> : Digits</div>
            <div><span className="text-slate-200 font-bold">+ - * /</span> : Basic Operators</div>
            <div><span className="text-slate-200 font-bold">Enter / =</span> : Calculate</div>
            <div><span className="text-slate-200 font-bold">Backspace</span> : Delete Last</div>
            <div><span className="text-slate-200 font-bold">Esc / Del</span> : Clear Display</div>
            <div><span className="text-slate-200 font-bold">( ) ^</span> : Parentheses & Power</div>
          </div>
        </div>
      </div>
    </div>
  );
};
