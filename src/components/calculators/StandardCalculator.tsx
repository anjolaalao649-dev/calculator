import React from 'react';
import { KeypadButton } from '../KeypadButton';
import { MemoryState } from '../../types';

interface StandardCalculatorProps {
  onInsertToken: (token: string) => void;
  onCalculate: () => void;
  onClear: () => void;
  onBackspace: () => void;
  memory: MemoryState;
  onMemoryClear: () => void;
  onMemoryRecall: () => void;
  onMemoryAdd: () => void;
  onMemorySubtract: () => void;
  onMemoryStore: () => void;
  expression: string;
  setExpression: React.Dispatch<React.SetStateAction<string>>;
}

export const StandardCalculator: React.FC<StandardCalculatorProps> = ({
  onInsertToken,
  onCalculate,
  onClear,
  onBackspace,
  memory,
  onMemoryClear,
  onMemoryRecall,
  onMemoryAdd,
  onMemorySubtract,
  onMemoryStore,
  expression,
  setExpression,
}) => {
  const toggleSign = () => {
    if (!expression) {
      setExpression('-');
      return;
    }
    if (expression.startsWith('-(') && expression.endsWith(')')) {
      setExpression(expression.slice(2, -1));
    } else if (expression.startsWith('-')) {
      setExpression(expression.slice(1));
    } else {
      setExpression(`-(${expression})`);
    }
  };

  return (
    <div className="w-full space-y-3">
      {/* Memory Bar */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        <KeypadButton
          label="MC"
          variant="memory"
          onClick={onMemoryClear}
          disabled={!memory.isSet}
          ariaLabel="Memory Clear"
        />
        <KeypadButton
          label="MR"
          variant="memory"
          onClick={onMemoryRecall}
          disabled={!memory.isSet}
          ariaLabel="Memory Recall"
        />
        <KeypadButton
          label="M+"
          variant="memory"
          onClick={onMemoryAdd}
          ariaLabel="Memory Add"
        />
        <KeypadButton
          label="M-"
          variant="memory"
          onClick={onMemorySubtract}
          ariaLabel="Memory Subtract"
        />
        <KeypadButton
          label="MS"
          variant="memory"
          onClick={onMemoryStore}
          ariaLabel="Memory Store"
        />
      </div>

      {/* Primary Keypad Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
        {/* Row 1 */}
        <KeypadButton label="%" variant="function" onClick={() => onInsertToken('%')} />
        <KeypadButton label="(" variant="function" onClick={() => onInsertToken('(')} />
        <KeypadButton label=")" variant="function" onClick={() => onInsertToken(')')} />
        <KeypadButton label="C" variant="action" onClick={onClear} ariaLabel="Clear" />

        {/* Row 2 */}
        <KeypadButton label="1/x" variant="function" onClick={() => onInsertToken('1/(')} />
        <KeypadButton label="x²" variant="function" onClick={() => onInsertToken('^2')} />
        <KeypadButton label="√x" variant="function" onClick={() => onInsertToken('sqrt(')} />
        <KeypadButton label="÷" variant="operator" onClick={() => onInsertToken('÷')} />

        {/* Row 3 */}
        <KeypadButton label="7" variant="number" onClick={() => onInsertToken('7')} />
        <KeypadButton label="8" variant="number" onClick={() => onInsertToken('8')} />
        <KeypadButton label="9" variant="number" onClick={() => onInsertToken('9')} />
        <KeypadButton label="×" variant="operator" onClick={() => onInsertToken('×')} />

        {/* Row 4 */}
        <KeypadButton label="4" variant="number" onClick={() => onInsertToken('4')} />
        <KeypadButton label="5" variant="number" onClick={() => onInsertToken('5')} />
        <KeypadButton label="6" variant="number" onClick={() => onInsertToken('6')} />
        <KeypadButton label="−" variant="operator" onClick={() => onInsertToken('−')} />

        {/* Row 5 */}
        <KeypadButton label="1" variant="number" onClick={() => onInsertToken('1')} />
        <KeypadButton label="2" variant="number" onClick={() => onInsertToken('2')} />
        <KeypadButton label="3" variant="number" onClick={() => onInsertToken('3')} />
        <KeypadButton label="+" variant="operator" onClick={() => onInsertToken('+')} />

        {/* Row 6 */}
        <KeypadButton label="±" variant="function" onClick={toggleSign} />
        <KeypadButton label="0" variant="number" onClick={() => onInsertToken('0')} />
        <KeypadButton label="." variant="number" onClick={() => onInsertToken('.')} />
        <KeypadButton label="=" variant="equals" onClick={onCalculate} ariaLabel="Calculate Equals" />
      </div>
    </div>
  );
};
