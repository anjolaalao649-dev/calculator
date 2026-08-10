import { useEffect } from 'react';

interface KeyboardShortcutOptions {
  onInsertToken: (token: string) => void;
  onCalculate: () => void;
  onBackspace: () => void;
  onClear: () => void;
  enabled?: boolean;
}

export function useKeyboardShortcuts({
  onInsertToken,
  onCalculate,
  onBackspace,
  onClear,
  enabled = true,
}: KeyboardShortcutOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      const key = e.key;

      if (key === 'Enter' || key === '=') {
        e.preventDefault();
        onCalculate();
      } else if (key === 'Backspace') {
        e.preventDefault();
        onBackspace();
      } else if (key === 'Escape' || key === 'Delete') {
        e.preventDefault();
        onClear();
      } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === '(' || key === ')' || key === '^' || key === '.') {
        e.preventDefault();
        let token = key;
        if (key === '*') token = '×';
        if (key === '/') token = '÷';
        if (key === '-') token = '−';
        onInsertToken(token);
      } else if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        onInsertToken(key);
      } else if (key.toLowerCase() === 'x') {
        e.preventDefault();
        onInsertToken('×');
      } else if (key === 'p' && e.ctrlKey) {
        // Prevent print
        e.preventDefault();
        onInsertToken('π');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onInsertToken, onCalculate, onBackspace, onClear, enabled]);
}
