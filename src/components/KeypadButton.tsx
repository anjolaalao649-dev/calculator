import React from 'react';
import { motion } from 'motion/react';

export type ButtonVariant = 'number' | 'operator' | 'function' | 'action' | 'equals' | 'memory';

interface KeypadButtonProps {
  label: React.ReactNode;
  subLabel?: string;
  onClick: () => void;
  variant?: ButtonVariant;
  colSpan?: number;
  rowSpan?: number;
  disabled?: boolean;
  active?: boolean;
  ariaLabel?: string;
}

export const KeypadButton: React.FC<KeypadButtonProps> = ({
  label,
  subLabel,
  onClick,
  variant = 'number',
  colSpan = 1,
  rowSpan = 1,
  disabled = false,
  active = false,
  ariaLabel,
}) => {
  // Styles according to variant
  let bgClass = '';
  let textClass = '';
  let hoverClass = '';

  switch (variant) {
    case 'number':
      bgClass = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm';
      textClass = 'text-slate-900 dark:text-slate-100 font-bold text-xl sm:text-2xl';
      hoverClass = 'hover:bg-slate-50 dark:hover:bg-slate-800/80';
      break;
    case 'operator':
      bgClass = 'bg-slate-100 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700';
      textClass = 'text-slate-700 dark:text-slate-200 font-bold text-xl sm:text-2xl';
      hoverClass = 'hover:bg-slate-200/80 dark:hover:bg-slate-700';
      break;
    case 'function':
      bgClass = 'bg-white dark:bg-slate-900/90 border-slate-100 dark:border-slate-800';
      textClass = 'text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-bold';
      hoverClass = 'hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-600 dark:hover:text-blue-300';
      break;
    case 'action':
      bgClass = 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
      textClass = 'text-blue-600 dark:text-blue-400 font-bold text-sm sm:text-base';
      hoverClass = 'hover:bg-blue-50 dark:hover:bg-blue-950/80';
      break;
    case 'equals':
      bgClass = 'bg-blue-600 border-blue-700 shadow-lg shadow-blue-200 dark:shadow-none';
      textClass = 'text-white font-bold text-2xl sm:text-3xl';
      hoverClass = 'hover:bg-blue-700 active:bg-blue-800';
      break;
    case 'memory':
      bgClass = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800';
      textClass = 'text-slate-500 dark:text-slate-400 text-xs font-bold';
      hoverClass = 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/50';
      break;
  }

  const colSpanClass = colSpan === 2 ? 'col-span-2' : colSpan === 3 ? 'col-span-3' : colSpan === 4 ? 'col-span-4' : 'col-span-1';
  const rowSpanClass = rowSpan === 2 ? 'row-span-2 min-h-[110px]' : 'row-span-1 min-h-[52px]';

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.94 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
      className={`relative flex flex-col items-center justify-center rounded-xl border backdrop-blur-md transition-all duration-150 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${colSpanClass} ${rowSpanClass} ${bgClass} ${textClass} ${hoverClass} ${
        disabled ? 'opacity-40 cursor-not-allowed' : ''
      } ${active ? 'ring-2 ring-indigo-400 border-indigo-400' : ''}`}
    >
      <span className="text-base sm:text-lg leading-none">{label}</span>
      {subLabel && <span className="text-[10px] opacity-60 mt-0.5">{subLabel}</span>}
    </motion.button>
  );
};
