import React, { useState } from 'react';
import {
  FileText,
  X,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Code2,
  Terminal,
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'requirements' | 'architecture' | 'sdlc' | 'qa'>('requirements');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-3xl bg-slate-900 dark:bg-slate-900 light:bg-white rounded-3xl border border-slate-800 light:border-slate-300 p-6 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 light:border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 light:text-slate-900 text-xl">
                Software Requirements & SDLC Specifications
              </h3>
              <p className="text-xs text-slate-400 light:text-slate-500">
                Dell Calc Pro - Commercial Grade Browser Calculator Architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white light:hover:text-slate-900 hover:bg-slate-800 light:hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 my-4 bg-slate-800/60 light:bg-slate-100 p-1.5 rounded-2xl border border-slate-700/50 light:border-slate-200">
          <button
            onClick={() => setActiveTab('requirements')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'requirements'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 light:text-slate-600'
            }`}
          >
            Requirements
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'architecture'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 light:text-slate-600'
            }`}
          >
            Architecture & Design
          </button>
          <button
            onClick={() => setActiveTab('sdlc')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'sdlc'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 light:text-slate-600'
            }`}
          >
            SDLC Life Cycle
          </button>
          <button
            onClick={() => setActiveTab('qa')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              activeTab === 'qa'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 light:text-slate-600'
            }`}
          >
            QA & Security
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 text-xs text-slate-300 light:text-slate-700">
          {activeTab === 'requirements' && (
            <div className="space-y-4">
              <section className="p-4 rounded-2xl bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-100 light:text-slate-900 text-sm flex items-center gap-1.5 text-indigo-400">
                  <CheckCircle2 className="w-4 h-4" /> Functional Requirements Matrix
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-300 light:text-slate-600">
                  <li>
                    <strong>Standard Arithmetic:</strong> Precision addition, subtraction, multiplication, division, parentheses, percentages, square roots, and memory operations (M+, M-, MR, MC, MS).
                  </li>
                  <li>
                    <strong>Scientific Engine:</strong> Trigonometric (sin, cos, tan, inverse, hyperbolic), logarithmic (log10, ln), exponentials, factorials, DEG/RAD switching, physical constants (π, e).
                  </li>
                  <li>
                    <strong>Programmer Base Switching:</strong> Real-time conversion across Hexadecimal, Decimal, Octal, Binary, with bitwise AND/OR/XOR/NOT/Shift and interactive 64-bit board.
                  </li>
                  <li>
                    <strong>Interactive 2D Graphing:</strong> Canvas-rendered function plotter supporting Cartesian coordinates, grid overlay, multi-function overlay, zooming, and pan controls.
                  </li>
                  <li>
                    <strong>Advanced Mathematics:</strong> Matrix determinant & inversion, polynomial quadratic/cubic solver, vector operations, statistical distributions (mean, median, mode, variance, std dev), and prime/combinatorics tools.
                  </li>
                  <li>
                    <strong>Unit Converter & Formula Reference:</strong> Searchable unit converter across 11 physical categories and formula library with plug-and-play parameter solving.
                  </li>
                </ul>
              </section>

              <section className="p-4 rounded-2xl bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-100 light:text-slate-900 text-sm flex items-center gap-1.5 text-emerald-400">
                  <Zap className="w-4 h-4" /> Non-Functional Performance Requirements
                </h4>
                <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                  <div className="p-2.5 rounded-xl bg-slate-800 light:bg-slate-200">
                    <span className="block text-slate-400 text-[10px]">Client Execution:</span>
                    <span className="text-emerald-400 font-bold">100% In-Browser</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800 light:bg-slate-200">
                    <span className="block text-slate-400 text-[10px]">Lighthouse Score:</span>
                    <span className="text-emerald-400 font-bold">&gt; 98 / 100</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800 light:bg-slate-200">
                    <span className="block text-slate-400 text-[10px]">Calculation Latency:</span>
                    <span className="text-emerald-400 font-bold">&lt; 2 ms</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-800 light:bg-slate-200">
                    <span className="block text-slate-400 text-[10px]">Offline Support:</span>
                    <span className="text-emerald-400 font-bold">Full PWA Ready</span>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <section className="p-4 rounded-2xl bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-100 light:text-slate-900 text-sm flex items-center gap-1.5 text-indigo-400">
                  <Layers className="w-4 h-4" /> Clean Modular Layer Architecture
                </h4>
                <div className="font-mono text-[11px] space-y-2 bg-slate-950 light:bg-slate-900 text-indigo-300 p-3 rounded-xl">
                  <div>[Presentation Layer] - React 19 + Tailwind CSS + Framer Motion</div>
                  <div>├── ExpressionDisplay (LCD/OLED Screen + Live Syntax Validator)</div>
                  <div>├── KeypadButton System (Tactile Feedback + Dynamic Variants)</div>
                  <div>└── Calculator Views (Standard, Scientific, Programmer, Graphing, Advanced)</div>
                  <div className="pt-1 text-purple-300">[State & Persistence] - Custom State Hooks + LocalStorage</div>
                  <div>├── useCalculatorState (Expression, Memory, History, Theme)</div>
                  <div>└── useKeyboardShortcuts (Global Key Listener)</div>
                  <div className="pt-1 text-emerald-300">[Computation Core] - math.js AST Expression Evaluator</div>
                  <div>├── Expression Parser (Safe token evaluation, no eval())</div>
                  <div>└── Specialized Modules (Matrix, Polynomials, Stats, Graph Canvas)</div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'sdlc' && (
            <div className="space-y-4">
              <section className="p-4 rounded-2xl bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-100 light:text-slate-900 text-sm flex items-center gap-1.5 text-indigo-400">
                  <Cpu className="w-4 h-4" /> SDLC Lifecycle Phases
                </h4>
                <ol className="list-decimal pl-5 space-y-2 text-slate-300 light:text-slate-600">
                  <li>
                    <strong>Phase 1: Discovery & Requirements Analysis</strong> - User stories defined, matrix math and programmer base needs specified.
                  </li>
                  <li>
                    <strong>Phase 2: Architectural & Component Design</strong> - Modular state design, zero server dependency, client-only persistence.
                  </li>
                  <li>
                    <strong>Phase 3: Development & Mathematical Integration</strong> - AST math parser integration, Canvas 2D graphing engine.
                  </li>
                  <li>
                    <strong>Phase 4: Quality Assurance & Edge Case Hardening</strong> - Division by zero guards, domain checks, syntax error feedback.
                  </li>
                  <li>
                    <strong>Phase 5: Release & Continuous Optimization</strong> - PWA capabilities, keyboard navigation compliance.
                  </li>
                </ol>
              </section>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="space-y-4">
              <section className="p-4 rounded-2xl bg-slate-800/40 light:bg-slate-50 border border-slate-700/50 light:border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-100 light:text-slate-900 text-sm flex items-center gap-1.5 text-rose-400">
                  <ShieldCheck className="w-4 h-4" /> Security & Error Mitigation
                </h4>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong>Zero-eval() Policy:</strong> All math expressions are parsed strictly through math.js Abstract Syntax Tree (AST) tokenization to eliminate XSS or unsafe script execution risks.
                  </li>
                  <li>
                    <strong>Divide By Zero Protection:</strong> Handled gracefully with explicit "Divide by zero" notifications rather than crashing the rendering pipeline.
                  </li>
                  <li>
                    <strong>Accessibility Compliance (WCAG 2.1 AA):</strong> Fully navigable via standard keyboard shortcuts, high-contrast color themes, and ARIA labels.
                  </li>
                </ul>
              </section>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-2 border-t border-slate-800 light:border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Engineered with React 19, TypeScript, Tailwind CSS, & math.js
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
