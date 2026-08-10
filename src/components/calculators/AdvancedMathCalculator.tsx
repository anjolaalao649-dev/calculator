import React, { useState } from 'react';
import {
  matrixDet,
  matrixInverse,
  matrixMultiply,
  matrixTranspose,
  solveQuadratic,
  calculateStats,
  permutations,
  combinations,
  isPrime,
  gcd,
  lcm,
  fibonacci,
  formatNumber,
} from '../../utils/mathEngine';
import { Boxes, Calculator, BarChart3, Binary, Layers } from 'lucide-react';

export const AdvancedMathCalculator: React.FC = () => {
  const [subTab, setSubTab] = useState<'matrix' | 'polynomial' | 'statistics' | 'numberTheory'>('matrix');

  // Matrix State
  const [matrixA, setMatrixA] = useState<number[][]>([
    [1, 2],
    [3, 4],
  ]);
  const [matrixB, setMatrixB] = useState<number[][]>([
    [5, 6],
    [7, 8],
  ]);
  const [matrixResult, setMatrixResult] = useState<string>('');

  // Polynomial State
  const [polyA, setPolyA] = useState<number>(1);
  const [polyB, setPolyB] = useState<number>(-5);
  const [polyC, setPolyC] = useState<number>(6);
  const [quadResult, setQuadResult] = useState<{ x1: string; x2: string } | null>(null);

  // Statistics State
  const [statsInput, setStatsInput] = useState<string>('12, 15, 22, 18, 25, 30, 18, 20');

  // Number Theory State
  const [numN, setNumN] = useState<number>(10);
  const [numR, setNumR] = useState<number>(3);
  const [numA, setNumA] = useState<number>(24);
  const [numB, setNumB] = useState<number>(36);

  // Matrix Helpers
  const updateMatrixCell = (matrix: 'A' | 'B', row: number, col: number, val: number) => {
    if (matrix === 'A') {
      const copy = matrixA.map((r) => [...r]);
      copy[row][col] = val;
      setMatrixA(copy);
    } else {
      const copy = matrixB.map((r) => [...r]);
      copy[row][col] = val;
      setMatrixB(copy);
    }
  };

  const handleDet = () => {
    const d = matrixDet(matrixA);
    setMatrixResult(`det(A) = ${formatNumber(d, 6)}`);
  };

  const handleInverse = () => {
    const inv = matrixInverse(matrixA);
    if (!inv) setMatrixResult('Matrix is singular (non-invertible)');
    else setMatrixResult(`Inverse A⁻¹ = \n${inv.map((r) => r.map((v) => formatNumber(v, 4)).join('\t')).join('\n')}`);
  };

  const handleMultiply = () => {
    const mult = matrixMultiply(matrixA, matrixB);
    if (!mult) setMatrixResult('Dimension mismatch for multiplication');
    else setMatrixResult(`A × B = \n${mult.map((r) => r.map((v) => formatNumber(v, 4)).join('\t')).join('\n')}`);
  };

  const handleTranspose = () => {
    const t = matrixTranspose(matrixA);
    setMatrixResult(`Transpose Aᵀ = \n${t.map((r) => r.map((v) => formatNumber(v, 4)).join('\t')).join('\n')}`);
  };

  // Polynomial Solver
  const handleSolveQuad = () => {
    const res = solveQuadratic(polyA, polyB, polyC);
    setQuadResult(res);
  };

  // Statistics Calculation
  const statsRes = React.useMemo(() => {
    const nums = statsInput
      .split(/[\s,]+/)
      .map(Number)
      .filter((n) => !isNaN(n));
    return calculateStats(nums);
  }, [statsInput]);

  return (
    <div className="w-full space-y-4">
      {/* Sub-tab switcher */}
      <div className="flex gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 light:bg-slate-100 border border-slate-800 light:border-slate-300">
        {[
          { id: 'matrix', label: 'Matrices', icon: <Boxes className="w-4 h-4" /> },
          { id: 'polynomial', label: 'Polynomials', icon: <Calculator className="w-4 h-4" /> },
          { id: 'statistics', label: 'Statistics', icon: <BarChart3 className="w-4 h-4" /> },
          { id: 'numberTheory', label: 'Combinatorics', icon: <Binary className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSubTab(tab.id as any)}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              subTab === tab.id
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white light:text-slate-600'
            }`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* SUB-TAB 1: MATRIX ENGINE */}
      {subTab === 'matrix' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Matrix A */}
            <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-50 border border-slate-800 light:border-slate-300 space-y-3">
              <h4 className="font-bold text-xs text-indigo-400">Matrix A (2x2)</h4>
              <div className="grid grid-cols-2 gap-2">
                {[0, 1].map((r) =>
                  [0, 1].map((c) => (
                    <input
                      key={`a-${r}-${c}`}
                      type="number"
                      value={matrixA[r][c]}
                      onChange={(e) => updateMatrixCell('A', r, c, parseFloat(e.target.value) || 0)}
                      className="p-2 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 text-center font-mono text-sm text-slate-100 light:text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ))
                )}
              </div>
            </div>

            {/* Matrix B */}
            <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-50 border border-slate-800 light:border-slate-300 space-y-3">
              <h4 className="font-bold text-xs text-purple-400">Matrix B (2x2)</h4>
              <div className="grid grid-cols-2 gap-2">
                {[0, 1].map((r) =>
                  [0, 1].map((c) => (
                    <input
                      key={`b-${r}-${c}`}
                      type="number"
                      value={matrixB[r][c]}
                      onChange={(e) => updateMatrixCell('B', r, c, parseFloat(e.target.value) || 0)}
                      className="p-2 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 text-center font-mono text-sm text-slate-100 light:text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleDet}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
            >
              det(A)
            </button>
            <button
              onClick={handleInverse}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
            >
              Inverse A⁻¹
            </button>
            <button
              onClick={handleMultiply}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs"
            >
              Multiply A × B
            </button>
            <button
              onClick={handleTranspose}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
            >
              Transpose Aᵀ
            </button>
          </div>

          {matrixResult && (
            <div className="p-4 rounded-2xl bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 font-mono text-xs text-emerald-400 whitespace-pre-wrap">
              {matrixResult}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: POLYNOMIAL SOLVER */}
      {subTab === 'polynomial' && (
        <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-50 border border-slate-800 light:border-slate-300 space-y-4">
          <h4 className="font-bold text-xs text-indigo-400">Quadratic Equation Solver: ax² + bx + c = 0</h4>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Coefficient a</label>
              <input
                type="number"
                value={polyA}
                onChange={(e) => setPolyA(parseFloat(e.target.value) || 0)}
                className="w-full p-2 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 font-mono text-sm text-slate-100 light:text-slate-900 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Coefficient b</label>
              <input
                type="number"
                value={polyB}
                onChange={(e) => setPolyB(parseFloat(e.target.value) || 0)}
                className="w-full p-2 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 font-mono text-sm text-slate-100 light:text-slate-900 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-1">Coefficient c</label>
              <input
                type="number"
                value={polyC}
                onChange={(e) => setPolyC(parseFloat(e.target.value) || 0)}
                className="w-full p-2 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 font-mono text-sm text-slate-100 light:text-slate-900 outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleSolveQuad}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
          >
            Solve Equation
          </button>

          {quadResult && (
            <div className="p-4 rounded-2xl bg-slate-950 light:bg-slate-100 border border-slate-800 light:border-slate-300 font-mono text-xs space-y-1">
              <div className="text-emerald-400 font-bold">x₁ = {quadResult.x1}</div>
              <div className="text-emerald-400 font-bold">x₂ = {quadResult.x2}</div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 3: STATISTICS */}
      {subTab === 'statistics' && (
        <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-50 border border-slate-800 light:border-slate-300 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 light:text-slate-700 block mb-1">
              Dataset Array (comma or space separated)
            </label>
            <textarea
              rows={2}
              value={statsInput}
              onChange={(e) => setStatsInput(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 font-mono text-xs text-slate-100 light:text-slate-900 outline-none"
            />
          </div>

          {statsRes ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-800 light:bg-slate-200">
                <span className="block text-[10px] text-slate-400">Count (N)</span>
                <span className="font-bold text-indigo-400 text-sm">{statsRes.count}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 light:bg-slate-200">
                <span className="block text-[10px] text-slate-400">Mean (μ)</span>
                <span className="font-bold text-indigo-400 text-sm">{formatNumber(statsRes.mean, 4)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 light:bg-slate-200">
                <span className="block text-[10px] text-slate-400">Median</span>
                <span className="font-bold text-indigo-400 text-sm">{formatNumber(statsRes.median, 4)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 light:bg-slate-200">
                <span className="block text-[10px] text-slate-400">Std Dev (σ)</span>
                <span className="font-bold text-indigo-400 text-sm">{formatNumber(statsRes.stdDev, 4)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 light:bg-slate-200">
                <span className="block text-[10px] text-slate-400">Min / Max</span>
                <span className="font-bold text-indigo-400 text-sm">{statsRes.min} / {statsRes.max}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 light:bg-slate-200">
                <span className="block text-[10px] text-slate-400">Variance (σ²)</span>
                <span className="font-bold text-indigo-400 text-sm">{formatNumber(statsRes.variance, 4)}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-rose-400">Please enter valid numbers</p>
          )}
        </div>
      )}

      {/* SUB-TAB 4: NUMBER THEORY & COMBINATORICS */}
      {subTab === 'numberTheory' && (
        <div className="space-y-4">
          {/* Permutations & Combinations */}
          <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-50 border border-slate-800 light:border-slate-300 space-y-3">
            <h4 className="font-bold text-xs text-indigo-400">Permutations (nPr) & Combinations (nCr)</h4>
            <div className="flex gap-3">
              <input
                type="number"
                value={numN}
                onChange={(e) => setNumN(parseInt(e.target.value) || 0)}
                placeholder="n"
                className="w-24 p-2 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 font-mono text-sm text-slate-100 light:text-slate-900"
              />
              <input
                type="number"
                value={numR}
                onChange={(e) => setNumR(parseInt(e.target.value) || 0)}
                placeholder="r"
                className="w-24 p-2 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 font-mono text-sm text-slate-100 light:text-slate-900"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-800 light:bg-slate-200">
                <span className="block text-[10px] text-slate-400">nPr = n!/(n-r)!</span>
                <span className="font-bold text-emerald-400 text-sm">{permutations(numN, numR)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 light:bg-slate-200">
                <span className="block text-[10px] text-slate-400">nCr = n!/(r!(n-r)!)</span>
                <span className="font-bold text-emerald-400 text-sm">{combinations(numN, numR)}</span>
              </div>
            </div>
          </div>

          {/* Prime & GCD/LCM */}
          <div className="p-4 rounded-2xl bg-slate-900/60 light:bg-slate-50 border border-slate-800 light:border-slate-300 space-y-3">
            <h4 className="font-bold text-xs text-purple-400">GCD, LCM & Prime Checker</h4>
            <div className="flex gap-3">
              <input
                type="number"
                value={numA}
                onChange={(e) => setNumA(parseInt(e.target.value) || 0)}
                placeholder="a"
                className="w-28 p-2 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 font-mono text-sm text-slate-100 light:text-slate-900"
              />
              <input
                type="number"
                value={numB}
                onChange={(e) => setNumB(parseInt(e.target.value) || 0)}
                placeholder="b"
                className="w-28 p-2 rounded-xl bg-slate-800 light:bg-white border border-slate-700 light:border-slate-300 font-mono text-sm text-slate-100 light:text-slate-900"
              />
            </div>
            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-800 light:bg-slate-200">
                <span className="block text-[10px] text-slate-400">GCD({numA}, {numB})</span>
                <span className="font-bold text-purple-300 text-sm">{gcd(numA, numB)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 light:bg-slate-200">
                <span className="block text-[10px] text-slate-400">LCM({numA}, {numB})</span>
                <span className="font-bold text-purple-300 text-sm">{lcm(numA, numB)}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 light:bg-slate-200">
                <span className="block text-[10px] text-slate-400">Is {numA} Prime?</span>
                <span className="font-bold text-purple-300 text-sm">{isPrime(numA) ? 'Yes (Prime)' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
