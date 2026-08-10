import React, { useState } from 'react';
import { Search, BookOpen, Check, Calculator } from 'lucide-react';
import { FORMULAS } from '../../data/formulasData';
import { Formula } from '../../types';
import { formatNumber } from '../../utils/mathEngine';

export const FormulaLibrary: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFormula, setSelectedFormula] = useState<Formula>(FORMULAS[0]);

  // Dynamic variable inputs for selected formula
  const [variableInputs, setVariableInputs] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    FORMULAS[0].variables.forEach((v) => {
      initial[v.symbol] = v.defaultValue ?? 1;
    });
    return initial;
  });

  const categories = ['All', 'Algebra', 'Geometry', 'Trigonometry', 'Calculus', 'Physics', 'Chemistry', 'Statistics'];

  const filteredFormulas = FORMULAS.filter((f) => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch =
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.description.toLowerCase().includes(search.toLowerCase()) ||
      f.formulaStr.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSelectFormula = (f: Formula) => {
    setSelectedFormula(f);
    const initial: Record<string, number> = {};
    f.variables.forEach((v) => {
      initial[v.symbol] = v.defaultValue ?? 1;
    });
    setVariableInputs(initial);
  };

  const handleVariableChange = (symbol: string, val: number) => {
    setVariableInputs((prev) => ({ ...prev, [symbol]: val }));
  };

  // Compute result for selected formula
  const computedVal = React.useMemo(() => {
    try {
      return selectedFormula.computeFn(variableInputs);
    } catch {
      return NaN;
    }
  }, [selectedFormula, variableInputs]);

  return (
    <div className="w-full space-y-4">
      {/* Category Filter Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-900/60 light:bg-slate-100 text-slate-400 hover:text-white light:text-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Search & Formula List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search formulas or equations..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-900/90 light:bg-slate-100 border border-slate-800 light:border-slate-300 text-slate-200 light:text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1">
            {filteredFormulas.map((f) => (
              <div
                key={f.id}
                onClick={() => handleSelectFormula(f)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedFormula.id === f.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                    : 'bg-slate-900/60 light:bg-slate-50 border-slate-800 light:border-slate-200 hover:bg-slate-800/80 text-slate-300 light:text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="uppercase tracking-wider font-bold text-indigo-400">{f.category}</span>
                </div>
                <h5 className="text-xs font-semibold">{f.title}</h5>
                <p className="font-mono text-[11px] text-slate-400 mt-1">{f.formulaStr}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Formula Calculator */}
        <div className="lg:col-span-7 p-5 rounded-3xl bg-slate-900/80 light:bg-slate-50 border border-slate-800 light:border-slate-300 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                {selectedFormula.category}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-100 light:text-slate-900">{selectedFormula.title}</h3>
            <p className="text-xs text-slate-400 mt-1">{selectedFormula.description}</p>
          </div>

          {/* Equation Formula Display Banner */}
          <div className="p-3.5 rounded-2xl bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 font-mono text-base font-bold text-indigo-300 text-center">
            {selectedFormula.formulaStr}
          </div>

          {/* Dynamic Variable Inputs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 light:text-slate-700">Enter Input Variables:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {selectedFormula.variables.map((v) => (
                <div key={v.symbol} className="space-y-1">
                  <label className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{v.label}</span>
                    <span className="font-mono font-bold text-indigo-400">{v.symbol}</span>
                  </label>
                  <input
                    type="number"
                    value={variableInputs[v.symbol] ?? ''}
                    onChange={(e) => handleVariableChange(v.symbol, parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 font-mono text-xs text-slate-100 light:text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Calculated Output Box */}
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-1">
            <span className="text-[10px] text-indigo-300 uppercase font-bold tracking-wider block">
              Calculated {selectedFormula.solveFor}:
            </span>
            <span className="font-mono text-2xl font-bold text-emerald-400 block">
              {isNaN(computedVal) ? 'Invalid inputs' : formatNumber(computedVal, 6)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
