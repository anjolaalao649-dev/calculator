import React, { useState } from 'react';
import { useCalculatorState } from './hooks/useCalculatorState';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// Component Imports
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ExpressionDisplay } from './components/ExpressionDisplay';
import { HistoryPanel } from './components/HistoryPanel';
import { SettingsModal } from './components/SettingsModal';
import { AboutModal } from './components/AboutModal';

// Calculator Mode Views
import { StandardCalculator } from './components/calculators/StandardCalculator';
import { ScientificCalculator } from './components/calculators/ScientificCalculator';
import { ProgrammerCalculator } from './components/calculators/ProgrammerCalculator';
import { GraphingCalculator } from './components/calculators/GraphingCalculator';
import { AdvancedMathCalculator } from './components/calculators/AdvancedMathCalculator';
import { UnitConverter } from './components/calculators/UnitConverter';
import { FormulaLibrary } from './components/calculators/FormulaLibrary';

export default function App() {
  const calcState = useCalculatorState();

  // Modal Open States
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Enable keyboard shortcuts unless a modal or text area is active
  useKeyboardShortcuts({
    onInsertToken: calcState.insertToken,
    onCalculate: calcState.calculate,
    onBackspace: calcState.backspace,
    onClear: calcState.clearAll,
    enabled: !isHistoryOpen && !isSettingsOpen && !isAboutOpen,
  });

  const toggleAngleUnit = () => {
    calcState.updateSettings({
      angleUnit: calcState.settings.angleUnit === 'deg' ? 'rad' : 'deg',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-blue-500 selection:text-white transition-colors duration-200">
      {/* Navigation Top Header */}
      <Header
        currentMode={calcState.currentMode}
        onSelectMode={calcState.setCurrentMode}
        historyCount={calcState.history.length}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        theme={calcState.settings.theme}
        onToggleTheme={(t) => calcState.updateSettings({ theme: t })}
      />

      {/* Main Content Workspace Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 sm:py-8 flex flex-col justify-center items-center">
        <div className="w-full space-y-5">
          {/* Main LCD / OLED Expression Display (Shown for standard, scientific, programmer modes) */}
          {['standard', 'scientific', 'programmer'].includes(calcState.currentMode) && (
            <ExpressionDisplay
              expression={calcState.expression}
              setExpression={calcState.setExpression}
              lastResult={calcState.lastResult}
              angleUnit={calcState.settings.angleUnit}
              onToggleAngleUnit={toggleAngleUnit}
              memorySet={calcState.memory.isSet}
              onClear={calcState.clearAll}
              onBackspace={calcState.backspace}
              precision={calcState.settings.precision}
            />
          )}

          {/* Mode Specific Calculator Panel */}
          <div className="w-full">
            {calcState.currentMode === 'standard' && (
              <StandardCalculator
                onInsertToken={calcState.insertToken}
                onCalculate={calcState.calculate}
                onClear={calcState.clearAll}
                onBackspace={calcState.backspace}
                memory={calcState.memory}
                onMemoryClear={calcState.memoryClear}
                onMemoryRecall={calcState.memoryRecall}
                onMemoryAdd={calcState.memoryAdd}
                onMemorySubtract={calcState.memorySubtract}
                onMemoryStore={calcState.memoryStore}
                expression={calcState.expression}
                setExpression={calcState.setExpression}
              />
            )}

            {calcState.currentMode === 'scientific' && (
              <ScientificCalculator
                onInsertToken={calcState.insertToken}
                onCalculate={calcState.calculate}
                onClear={calcState.clearAll}
                onBackspace={calcState.backspace}
                angleUnit={calcState.settings.angleUnit}
                onToggleAngleUnit={toggleAngleUnit}
                memory={calcState.memory}
                onMemoryClear={calcState.memoryClear}
                onMemoryRecall={calcState.memoryRecall}
                onMemoryAdd={calcState.memoryAdd}
                onMemorySubtract={calcState.memorySubtract}
                onMemoryStore={calcState.memoryStore}
                expression={calcState.expression}
                setExpression={calcState.setExpression}
              />
            )}

            {calcState.currentMode === 'programmer' && (
              <ProgrammerCalculator
                base={calcState.programmerBase}
                onSetBase={calcState.setProgrammerBase}
                bitsValue={calcState.programmerBitsValue}
                onSetBitsValue={calcState.setProgrammerBitsValue}
                onInsertToken={calcState.insertToken}
                onClear={calcState.clearAll}
                onBackspace={calcState.backspace}
              />
            )}

            {calcState.currentMode === 'graphing' && <GraphingCalculator />}

            {calcState.currentMode === 'advanced' && <AdvancedMathCalculator />}

            {calcState.currentMode === 'converter' && <UnitConverter />}

            {calcState.currentMode === 'formulas' && <FormulaLibrary />}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Slide-out & Modal Components */}
      <HistoryPanel
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={calcState.history}
        onSelectExpression={(expr) => calcState.setExpression(expr)}
        onTogglePin={calcState.togglePinHistory}
        onDeleteItem={calcState.deleteHistoryItem}
        onClearAll={calcState.clearHistory}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={calcState.settings}
        onUpdateSettings={calcState.updateSettings}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />
    </div>
  );
}
