import React, { useState } from 'react';
import { KeypadButton } from '../KeypadButton';
import { AngleUnit, MemoryState } from '../../types';

interface ScientificCalculatorProps {
  onInsertToken: (token: string) => void;
  onCalculate: () => void;
  onClear: () => void;
  onBackspace: () => void;
  angleUnit: AngleUnit;
  onToggleAngleUnit: () => void;
  memory: MemoryState;
  onMemoryClear: () => void;
  onMemoryRecall: () => void;
  onMemoryAdd: () => void;
  onMemorySubtract: () => void;
  onMemoryStore: () => void;
  expression: string;
  setExpression: React.Dispatch<React.SetStateAction<string>>;
}

export const ScientificCalculator: React.FC<ScientificCalculatorProps> = ({
  onInsertToken,
  onCalculate,
  onClear,
  onBackspace,
  angleUnit,
  onToggleAngleUnit,
  memory,
  onMemoryClear,
  onMemoryRecall,
  onMemoryAdd,
  onMemorySubtract,
  onMemoryStore,
  expression,
  setExpression,
}) => {
  const [secondFn, setSecondFn] = useState(false);
  const [hyperbolic, setHyperbolic] = useState(false);

  const insertRandom = () => {
    const r = Math.random().toFixed(6);
    onInsertToken(r);
  };

  return (
    <div className="w-full space-y-3">
      {/* Top Scientific Controls & Mode Switches */}
      <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-300">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSecondFn(!secondFn)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              secondFn ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 light:bg-slate-200 text-slate-300'
            }`}
          >
            2nd
          </button>
          <button
            onClick={() => setHyperbolic(!hyperbolic)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
              hyperbolic ? 'bg-indigo-600 text-white shadow' : 'bg-slate-800 light:bg-slate-200 text-slate-300'
            }`}
          >
            hyp
          </button>
          <button
            onClick={onToggleAngleUnit}
            className="px-3 py-1 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-800 light:bg-slate-200 text-indigo-400 light:text-indigo-600 hover:bg-slate-700"
          >
            {angleUnit}
          </button>
        </div>

        <div className="flex items-center gap-1">
          <KeypadButton label="MC" variant="memory" onClick={onMemoryClear} disabled={!memory.isSet} />
          <KeypadButton label="MR" variant="memory" onClick={onMemoryRecall} disabled={!memory.isSet} />
          <KeypadButton label="M+" variant="memory" onClick={onMemoryAdd} />
          <KeypadButton label="MS" variant="memory" onClick={onMemoryStore} />
        </div>
      </div>

      {/* Main Scientific Grid - 5 columns */}
      <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
        {/* Row 1: Trigonometric Functions */}
        <KeypadButton
          label={secondFn ? 'asin' : hyperbolic ? 'sinh' : 'sin'}
          variant="function"
          onClick={() => onInsertToken(secondFn ? 'asin(' : hyperbolic ? 'sinh(' : 'sin(')}
        />
        <KeypadButton
          label={secondFn ? 'acos' : hyperbolic ? 'cosh' : 'cos'}
          variant="function"
          onClick={() => onInsertToken(secondFn ? 'acos(' : hyperbolic ? 'cosh(' : 'cos(')}
        />
        <KeypadButton
          label={secondFn ? 'atan' : hyperbolic ? 'tanh' : 'tan'}
          variant="function"
          onClick={() => onInsertToken(secondFn ? 'atan(' : hyperbolic ? 'tanh(' : 'tan(')}
        />
        <KeypadButton label="π" variant="function" onClick={() => onInsertToken('π')} />
        <KeypadButton label="e" variant="function" onClick={() => onInsertToken('e')} />

        {/* Row 2: Powers & Logs */}
        <KeypadButton
          label={secondFn ? 'x³' : 'x²'}
          variant="function"
          onClick={() => onInsertToken(secondFn ? '^3' : '^2')}
        />
        <KeypadButton label="xⁿ" variant="function" onClick={() => onInsertToken('^')} />
        <KeypadButton
          label={secondFn ? '10ⁿ' : 'log'}
          variant="function"
          onClick={() => onInsertToken(secondFn ? '10^(' : 'log10(')}
        />
        <KeypadButton
          label={secondFn ? 'eⁿ' : 'ln'}
          variant="function"
          onClick={() => onInsertToken(secondFn ? 'e^(' : 'log(')}
        />
        <KeypadButton label="n!" variant="function" onClick={() => onInsertToken('!')} />

        {/* Row 3: Roots & Abs */}
        <KeypadButton
          label={secondFn ? '∛x' : '√x'}
          variant="function"
          onClick={() => onInsertToken(secondFn ? 'cbrt(' : 'sqrt(')}
        />
        <KeypadButton label="|x|" variant="function" onClick={() => onInsertToken('abs(')} />
        <KeypadButton label="mod" variant="function" onClick={() => onInsertToken(' mod ')} />
        <KeypadButton label="Rand" variant="function" onClick={insertRandom} />
        <KeypadButton label="C" variant="action" onClick={onClear} />

        {/* Row 4: Keypad Row */}
        <KeypadButton label="(" variant="function" onClick={() => onInsertToken('(')} />
        <KeypadButton label="7" variant="number" onClick={() => onInsertToken('7')} />
        <KeypadButton label="8" variant="number" onClick={() => onInsertToken('8')} />
        <KeypadButton label="9" variant="number" onClick={() => onInsertToken('9')} />
        <KeypadButton label="÷" variant="operator" onClick={() => onInsertToken('÷')} />

        {/* Row 5 */}
        <KeypadButton label=")" variant="function" onClick={() => onInsertToken(')')} />
        <KeypadButton label="4" variant="number" onClick={() => onInsertToken('4')} />
        <KeypadButton label="5" variant="number" onClick={() => onInsertToken('5')} />
        <KeypadButton label="6" variant="number" onClick={() => onInsertToken('6')} />
        <KeypadButton label="×" variant="operator" onClick={() => onInsertToken('×')} />

        {/* Row 6 */}
        <KeypadButton label="1/x" variant="function" onClick={() => onInsertToken('1/(')} />
        <KeypadButton label="1" variant="number" onClick={() => onInsertToken('1')} />
        <KeypadButton label="2" variant="number" onClick={() => onInsertToken('2')} />
        <KeypadButton label="3" variant="number" onClick={() => onInsertToken('3')} />
        <KeypadButton label="−" variant="operator" onClick={() => onInsertToken('−')} />

        {/* Row 7 */}
        <KeypadButton label="EE" variant="function" onClick={() => onInsertToken('e')} />
        <KeypadButton label="0" variant="number" onClick={() => onInsertToken('0')} />
        <KeypadButton label="." variant="number" onClick={() => onInsertToken('.')} />
        <KeypadButton label="=" variant="equals" onClick={onCalculate} />
        <KeypadButton label="+" variant="operator" onClick={() => onInsertToken('+')} />
      </div>
    </div>
  );
};
