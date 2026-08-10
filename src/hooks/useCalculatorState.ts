import { useState, useEffect, useCallback } from 'react';
import { CalcMode, AppSettings, HistoryItem, MemoryState, NumberBase } from '../types';
import { evaluateExpression } from '../utils/mathEngine';
import { playKeySound } from '../utils/audio';

const STORAGE_KEYS = {
  SETTINGS: 'dellcalc_settings_v1',
  HISTORY: 'dellcalc_history_v1',
  MEMORY: 'dellcalc_memory_v1',
  LEGACY_SETTINGS: 'omnicalc_settings_v1',
  LEGACY_HISTORY: 'omnicalc_history_v1',
  LEGACY_MEMORY: 'omnicalc_memory_v1',
};

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  precision: 6,
  angleUnit: 'deg',
  thousandsSeparator: false,
  soundEnabled: true,
  hapticEnabled: true,
  scientificNotationThreshold: 1e10,
  fontSize: 'md',
};

export function useCalculatorState() {
  const [currentMode, setCurrentMode] = useState<CalcMode>('standard');
  const [expression, setExpression] = useState<string>('');
  const [lastResult, setLastResult] = useState<string>('');
  const [programmerBase, setProgrammerBase] = useState<NumberBase>('DEC');
  const [programmerBitsValue, setProgrammerBitsValue] = useState<bigint>(BigInt(0));

  // Load Settings from localStorage
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS) || localStorage.getItem(STORAGE_KEYS.LEGACY_SETTINGS);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Load Memory
  const [memory, setMemory] = useState<MemoryState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEMORY);
      return saved ? JSON.parse(saved) : { value: 0, isSet: false };
    } catch {
      return { value: 0, isSet: false };
    }
  });

  // Load History
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save Settings
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // Save Memory
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MEMORY, JSON.stringify(memory));
    } catch (e) {
      console.error(e);
    }
  }, [memory]);

  // Save History
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  }, [history]);

  // Theme application
  useEffect(() => {
    document.documentElement.classList.remove('theme-dark', 'theme-light', 'theme-emerald', 'theme-cyberpunk');
    document.documentElement.classList.add(`theme-${settings.theme}`);
  }, [settings.theme]);

  // Update setting field
  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  // Insert token into expression
  const insertToken = useCallback((token: string) => {
    playKeySound('key', settings.soundEnabled);
    setExpression((prev) => {
      // If last action was equal and user types a digit or start bracket, reset
      if (lastResult && !['+', '-', '*', '/', '^', '%', '×', '÷', '−'].includes(token)) {
        setLastResult('');
        return token;
      }
      setLastResult('');
      return prev + token;
    });
  }, [lastResult, settings.soundEnabled]);

  // Backspace token
  const backspace = useCallback(() => {
    playKeySound('key', settings.soundEnabled);
    setExpression((prev) => prev.slice(0, -1));
  }, [settings.soundEnabled]);

  // Clear expression
  const clearAll = useCallback(() => {
    playKeySound('clear', settings.soundEnabled);
    setExpression('');
    setLastResult('');
  }, [settings.soundEnabled]);

  // Evaluate current expression
  const calculate = useCallback(() => {
    if (!expression.trim()) return;

    const evalResult = evaluateExpression(
      expression,
      settings.angleUnit,
      settings.precision
    );

    if (evalResult.isValid) {
      playKeySound('equals', settings.soundEnabled);
      const resStr = evalResult.result;
      setLastResult(resStr);

      // Add to history
      const newItem: HistoryItem = {
        id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
        expression,
        result: resStr,
        mode: currentMode,
        timestamp: Date.now(),
        isPinned: false,
      };

      setHistory((prev) => [newItem, ...prev.slice(0, 99)]); // keep max 100 history items
      setExpression(resStr); // Set expression to result for chained operations
    } else {
      playKeySound('error', settings.soundEnabled);
    }
    return evalResult;
  }, [expression, settings.angleUnit, settings.precision, settings.soundEnabled, currentMode]);

  // Memory Actions
  const memoryClear = useCallback(() => {
    playKeySound('clear', settings.soundEnabled);
    setMemory({ value: 0, isSet: false });
  }, [settings.soundEnabled]);

  const memoryRecall = useCallback(() => {
    if (!memory.isSet) return;
    playKeySound('key', settings.soundEnabled);
    setExpression((prev) => prev + memory.value.toString());
  }, [memory, settings.soundEnabled]);

  const memoryAdd = useCallback(() => {
    const evalResult = evaluateExpression(
      expression || lastResult || '0',
      settings.angleUnit,
      settings.precision
    );
    if (evalResult.isValid && evalResult.numericValue !== undefined) {
      playKeySound('operator', settings.soundEnabled);
      setMemory((prev) => ({
        value: prev.value + evalResult.numericValue!,
        isSet: true,
      }));
    }
  }, [expression, lastResult, settings.angleUnit, settings.precision, settings.soundEnabled]);

  const memorySubtract = useCallback(() => {
    const evalResult = evaluateExpression(
      expression || lastResult || '0',
      settings.angleUnit,
      settings.precision
    );
    if (evalResult.isValid && evalResult.numericValue !== undefined) {
      playKeySound('operator', settings.soundEnabled);
      setMemory((prev) => ({
        value: prev.value - evalResult.numericValue!,
        isSet: true,
      }));
    }
  }, [expression, lastResult, settings.angleUnit, settings.precision, settings.soundEnabled]);

  const memoryStore = useCallback(() => {
    const evalResult = evaluateExpression(
      expression || lastResult || '0',
      settings.angleUnit,
      settings.precision
    );
    if (evalResult.isValid && evalResult.numericValue !== undefined) {
      playKeySound('operator', settings.soundEnabled);
      setMemory({
        value: evalResult.numericValue,
        isSet: true,
      });
    }
  }, [expression, lastResult, settings.angleUnit, settings.precision, settings.soundEnabled]);

  // History operations
  const clearHistory = useCallback(() => {
    setHistory((prev) => prev.filter((item) => item.isPinned));
  }, []);

  const togglePinHistory = useCallback((id: string) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPinned: !item.isPinned } : item))
    );
  }, []);

  const deleteHistoryItem = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    currentMode,
    setCurrentMode,
    expression,
    setExpression,
    lastResult,
    settings,
    updateSettings,
    memory,
    history,
    insertToken,
    backspace,
    clearAll,
    calculate,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    memoryStore,
    clearHistory,
    togglePinHistory,
    deleteHistoryItem,
    programmerBase,
    setProgrammerBase,
    programmerBitsValue,
    setProgrammerBitsValue,
  };
}
