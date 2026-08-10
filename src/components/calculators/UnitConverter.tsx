import React, { useState } from 'react';
import { ArrowRightLeft, Ruler, Weight, Thermometer, Clock, Square, Box, Gauge, Activity, Zap, Database, DollarSign } from 'lucide-react';
import { UNIT_CATEGORIES, convertUnits } from '../../data/unitConverterData';
import { formatNumber } from '../../utils/mathEngine';

const ICON_MAP: Record<string, React.ReactNode> = {
  Ruler: <Ruler className="w-4 h-4" />,
  Weight: <Weight className="w-4 h-4" />,
  Thermometer: <Thermometer className="w-4 h-4" />,
  Clock: <Clock className="w-4 h-4" />,
  Square: <Square className="w-4 h-4" />,
  Box: <Box className="w-4 h-4" />,
  Gauge: <Gauge className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  Database: <Database className="w-4 h-4" />,
  DollarSign: <DollarSign className="w-4 h-4" />,
};

export const UnitConverter: React.FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState('length');
  const activeCategory = UNIT_CATEGORIES.find((c) => c.id === activeCategoryId) || UNIT_CATEGORIES[0];

  const [fromUnitId, setFromUnitId] = useState(activeCategory.units[0].id);
  const [toUnitId, setToUnitId] = useState(activeCategory.units[1].id);
  const [inputValue, setInputValue] = useState<string>('1');

  // Handle Category Switch
  const handleSelectCategory = (catId: string) => {
    setActiveCategoryId(catId);
    const newCat = UNIT_CATEGORIES.find((c) => c.id === catId);
    if (newCat) {
      setFromUnitId(newCat.units[0].id);
      setToUnitId(newCat.units[1] ? newCat.units[1].id : newCat.units[0].id);
    }
  };

  // Swap From & To
  const handleSwap = () => {
    const temp = fromUnitId;
    setFromUnitId(toUnitId);
    setToUnitId(temp);
  };

  // Compute conversion
  const numInput = parseFloat(inputValue) || 0;
  const convertedVal = convertUnits(activeCategory, fromUnitId, toUnitId, numInput);
  const formattedResult = formatNumber(convertedVal, 6);

  const fromUnit = activeCategory.units.find((u) => u.id === fromUnitId);
  const toUnit = activeCategory.units.find((u) => u.id === toUnitId);

  return (
    <div className="w-full space-y-4">
      {/* Category Pills Header */}
      <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {UNIT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelectCategory(cat.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeCategoryId === cat.id
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-900/60 light:bg-slate-100 text-slate-400 hover:text-white light:text-slate-700'
            }`}
          >
            {ICON_MAP[cat.iconName]}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Main Conversion Panel */}
      <div className="p-5 rounded-3xl bg-slate-900/80 light:bg-slate-50 border border-slate-800 light:border-slate-300 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          {/* FROM Input Box */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold text-slate-400 block">From</label>
            <div className="space-y-2">
              <select
                value={fromUnitId}
                onChange={(e) => setFromUnitId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 text-xs text-slate-100 light:text-slate-900 outline-none"
              >
                {activeCategory.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="w-full p-3 rounded-2xl bg-slate-950 light:bg-white border border-slate-800 light:border-slate-300 font-mono text-xl font-bold text-slate-100 light:text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center pt-4 md:pt-6">
            <button
              onClick={handleSwap}
              className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-transform active:scale-95"
              title="Swap From and To units"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>
          </div>

          {/* TO Output Box */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-semibold text-slate-400 block">To</label>
            <div className="space-y-2">
              <select
                value={toUnitId}
                onChange={(e) => setToUnitId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 text-xs text-slate-100 light:text-slate-900 outline-none"
              >
                {activeCategory.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>

              <div className="p-3 rounded-2xl bg-slate-950 light:bg-white border border-slate-800 light:border-slate-300 font-mono text-xl font-bold text-emerald-400 overflow-x-auto truncate">
                {formattedResult} <span className="text-sm font-normal text-slate-400">{toUnit?.symbol}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formula Summary Footnote */}
        <div className="p-3 rounded-xl bg-slate-950/60 light:bg-slate-100 text-xs font-mono text-slate-400 flex items-center justify-between">
          <span>Formula Equivalence:</span>
          <span className="text-indigo-400 font-bold">
            1 {fromUnit?.symbol} = {formatNumber(convertUnits(activeCategory, fromUnitId, toUnitId, 1), 6)} {toUnit?.symbol}
          </span>
        </div>
      </div>
    </div>
  );
};
