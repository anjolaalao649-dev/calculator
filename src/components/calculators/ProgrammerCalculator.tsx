import React, { useState, useEffect } from 'react';
import { KeypadButton } from '../KeypadButton';
import { NumberBase } from '../../types';

interface ProgrammerCalculatorProps {
  base: NumberBase;
  onSetBase: (base: NumberBase) => void;
  bitsValue: bigint;
  onSetBitsValue: (val: bigint) => void;
  onInsertToken: (token: string) => void;
  onClear: () => void;
  onBackspace: () => void;
}

export const ProgrammerCalculator: React.FC<ProgrammerCalculatorProps> = ({
  base,
  onSetBase,
  bitsValue,
  onSetBitsValue,
  onInsertToken,
  onClear,
  onBackspace,
}) => {
  const [inputVal, setInputVal] = useState<string>('0');

  // Convert input value whenever base changes or input changes
  useEffect(() => {
    try {
      let num = BigInt(0);
      if (inputVal && inputVal !== '0') {
        if (base === 'HEX') num = BigInt(`0x${inputVal}`);
        else if (base === 'DEC') num = BigInt(inputVal);
        else if (base === 'OCT') num = BigInt(`0o${inputVal}`);
        else if (base === 'BIN') num = BigInt(`0b${inputVal}`);
      }
      onSetBitsValue(num);
    } catch {
      // invalid partial input
    }
  }, [inputVal, base, onSetBitsValue]);

  // Formatted views
  const hexStr = bitsValue.toString(16).toUpperCase();
  const decStr = bitsValue.toString(10);
  const octStr = bitsValue.toString(8);
  const binStr = bitsValue.toString(2).padStart(32, '0');

  const appendDigit = (char: string) => {
    if (inputVal === '0') setInputVal(char);
    else setInputVal((prev) => prev + char);
  };

  const handleClear = () => {
    setInputVal('0');
    onSetBitsValue(BigInt(0));
    onClear();
  };

  const handleBackspace = () => {
    if (inputVal.length <= 1) setInputVal('0');
    else setInputVal((prev) => prev.slice(0, -1));
  };

  const toggleBit = (bitIndex: number) => {
    const mask = BigInt(1) << BigInt(bitIndex);
    const newVal = bitsValue ^ mask;
    onSetBitsValue(newVal);

    if (base === 'HEX') setInputVal(newVal.toString(16).toUpperCase());
    else if (base === 'DEC') setInputVal(newVal.toString(10));
    else if (base === 'OCT') setInputVal(newVal.toString(8));
    else if (base === 'BIN') setInputVal(newVal.toString(2));
  };

  // Helper check if key is allowed in active base
  const isKeyDisabled = (key: string): boolean => {
    if (['A', 'B', 'C', 'D', 'E', 'F'].includes(key)) return base !== 'HEX';
    if (['8', '9'].includes(key)) return base === 'BIN' || base === 'OCT';
    if (['2', '3', '4', '5', '6', '7'].includes(key)) return base === 'BIN';
    return false;
  };

  return (
    <div className="w-full space-y-4">
      {/* Base Value Live Summary Rows */}
      <div className="p-3.5 rounded-2xl bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-50 border border-slate-800 light:border-slate-300 space-y-1.5 font-mono text-xs">
        {[
          { id: 'HEX', label: 'HEX', val: hexStr || '0' },
          { id: 'DEC', label: 'DEC', val: decStr || '0' },
          { id: 'OCT', label: 'OCT', val: octStr || '0' },
          { id: 'BIN', label: 'BIN', val: binStr || '0' },
        ].map((b) => (
          <div
            key={b.id}
            onClick={() => onSetBase(b.id as NumberBase)}
            className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors ${
              base === b.id
                ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold'
                : 'hover:bg-slate-800/50 text-slate-400'
            }`}
          >
            <span className="w-10 font-bold uppercase">{b.label}</span>
            <span className="truncate text-right text-slate-100 dark:text-slate-100 light:text-slate-900">
              {b.val}
            </span>
          </div>
        ))}
      </div>

      {/* Interactive 32-bit Interactive Bit Board */}
      <div className="p-3 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-300 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
          <span>32-Bit Toggle Board</span>
          <span className="text-indigo-400">Click bit to toggle 0 / 1</span>
        </div>
        <div className="grid grid-cols-8 sm:grid-cols-16 gap-1 font-mono text-[10px]">
          {Array.from({ length: 32 }).map((_, idx) => {
            const bitPos = 31 - idx;
            const isSet = ((bitsValue >> BigInt(bitPos)) & BigInt(1)) === BigInt(1);
            return (
              <button
                key={bitPos}
                onClick={() => toggleBit(bitPos)}
                className={`p-1 rounded flex flex-col items-center justify-center transition-all ${
                  isSet
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'bg-slate-800 light:bg-slate-200 text-slate-400 hover:bg-slate-700'
                }`}
                title={`Bit ${bitPos}`}
              >
                <span>{isSet ? '1' : '0'}</span>
                <span className="text-[8px] opacity-40">{bitPos}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Programmer Keypad */}
      <div className="grid grid-cols-6 gap-2">
        {/* Bitwise Ops */}
        <KeypadButton label="AND" variant="function" onClick={() => onInsertToken(' AND ')} />
        <KeypadButton label="OR" variant="function" onClick={() => onInsertToken(' OR ')} />
        <KeypadButton label="XOR" variant="function" onClick={() => onInsertToken(' XOR ')} />
        <KeypadButton label="NOT" variant="function" onClick={() => onInsertToken(' NOT ')} />
        <KeypadButton label="<<" variant="function" onClick={() => onInsertToken(' << ')} />
        <KeypadButton label=">>" variant="function" onClick={() => onInsertToken(' >> ')} />

        {/* Hex Alpha Digits */}
        <KeypadButton label="A" variant="number" onClick={() => appendDigit('A')} disabled={isKeyDisabled('A')} />
        <KeypadButton label="B" variant="number" onClick={() => appendDigit('B')} disabled={isKeyDisabled('B')} />
        <KeypadButton label="C" variant="number" onClick={() => appendDigit('C')} disabled={isKeyDisabled('C')} />
        <KeypadButton label="D" variant="number" onClick={() => appendDigit('D')} disabled={isKeyDisabled('D')} />
        <KeypadButton label="E" variant="number" onClick={() => appendDigit('E')} disabled={isKeyDisabled('E')} />
        <KeypadButton label="F" variant="number" onClick={() => appendDigit('F')} disabled={isKeyDisabled('F')} />

        {/* Numeric Rows */}
        <KeypadButton label="7" variant="number" onClick={() => appendDigit('7')} disabled={isKeyDisabled('7')} />
        <KeypadButton label="8" variant="number" onClick={() => appendDigit('8')} disabled={isKeyDisabled('8')} />
        <KeypadButton label="9" variant="number" onClick={() => appendDigit('9')} disabled={isKeyDisabled('9')} />
        <KeypadButton label="C" variant="action" onClick={handleClear} />
        <KeypadButton label="⌫" variant="action" onClick={handleBackspace} />
        <KeypadButton label="÷" variant="operator" onClick={() => onInsertToken('÷')} />

        <KeypadButton label="4" variant="number" onClick={() => appendDigit('4')} disabled={isKeyDisabled('4')} />
        <KeypadButton label="5" variant="number" onClick={() => appendDigit('5')} disabled={isKeyDisabled('5')} />
        <KeypadButton label="6" variant="number" onClick={() => appendDigit('6')} disabled={isKeyDisabled('6')} />
        <KeypadButton label="(" variant="function" onClick={() => onInsertToken('(')} />
        <KeypadButton label=")" variant="function" onClick={() => onInsertToken(')')} />
        <KeypadButton label="×" variant="operator" onClick={() => onInsertToken('×')} />

        <KeypadButton label="1" variant="number" onClick={() => appendDigit('1')} disabled={isKeyDisabled('1')} />
        <KeypadButton label="2" variant="number" onClick={() => appendDigit('2')} disabled={isKeyDisabled('2')} />
        <KeypadButton label="3" variant="number" onClick={() => appendDigit('3')} disabled={isKeyDisabled('3')} />
        <KeypadButton label="0" colSpan={2} variant="number" onClick={() => appendDigit('0')} disabled={isKeyDisabled('0')} />
        <KeypadButton label="−" variant="operator" onClick={() => onInsertToken('−')} />
      </div>
    </div>
  );
};
