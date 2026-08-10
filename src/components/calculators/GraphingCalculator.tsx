import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Eye, EyeOff, Plus, Trash2, LineChart } from 'lucide-react';
import { evaluateExpression } from '../../utils/mathEngine';
import { GraphFunction } from '../../types';

const INITIAL_FUNCTIONS: GraphFunction[] = [
  { id: 'f1', expression: 'sin(x)', color: '#6366f1', visible: true },
  { id: 'f2', expression: 'x^2 - 4', color: '#ec4899', visible: true },
];

export const GraphingCalculator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [functions, setFunctions] = useState<GraphFunction[]>(INITIAL_FUNCTIONS);

  // Viewport state
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [yMin, setYMin] = useState(-10);
  const [yMax, setYMax] = useState(10);

  // Hover tracer state
  const [hoverCoord, setHoverCoord] = useState<{ x: number; y: number; px: number; py: number } | null>(null);

  // Pan dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Draw Canvas
  const drawGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background
    ctx.fillStyle = '#090d16';
    ctx.fillRect(0, 0, width, height);

    // Coordinate mapping helpers
    const toPx = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const toPy = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height;

    const originX = toPx(0);
    const originY = toPy(0);

    // Draw Grid lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#1e293b';

    // X Grid lines
    const xStep = Math.pow(10, Math.floor(Math.log10(xMax - xMin))) / 2 || 1;
    for (let x = Math.floor(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      const px = toPx(x);
      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, height);
      ctx.stroke();
    }

    // Y Grid lines
    const yStep = Math.pow(10, Math.floor(Math.log10(yMax - yMin))) / 2 || 1;
    for (let y = Math.floor(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      const py = toPy(y);
      ctx.beginPath();
      ctx.moveTo(0, py);
      ctx.lineTo(width, py);
      ctx.stroke();
    }

    // Draw Axes
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#475569';

    // X axis
    ctx.beginPath();
    ctx.moveTo(0, originY);
    ctx.lineTo(width, originY);
    ctx.stroke();

    // Y axis
    ctx.beginPath();
    ctx.moveTo(originX, 0);
    ctx.lineTo(originX, height);
    ctx.stroke();

    // Axis labels & Ticks
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';

    for (let x = Math.floor(xMin / xStep) * xStep; x <= xMax; x += xStep) {
      if (Math.abs(x) < 0.0001) continue;
      const px = toPx(x);
      ctx.fillText(x.toFixed(1), px - 10, Math.min(Math.max(originY + 15, 15), height - 5));
    }

    for (let y = Math.floor(yMin / yStep) * yStep; y <= yMax; y += yStep) {
      if (Math.abs(y) < 0.0001) continue;
      const py = toPy(y);
      ctx.fillText(y.toFixed(1), Math.min(Math.max(originX + 5, 5), width - 30), py + 4);
    }

    // Plot Functions
    functions.forEach((fn) => {
      if (!fn.visible || !fn.expression.trim()) return;

      ctx.lineWidth = 2.5;
      ctx.strokeStyle = fn.color;
      ctx.beginPath();

      let isDrawing = false;
      const steps = width; // 1 sample per pixel column

      for (let i = 0; i <= steps; i++) {
        const px = i;
        const x = xMin + (i / width) * (xMax - xMin);

        // Substitute 'x' variable into expression
        // Replace standalone x with numerical value
        const exprWithVal = fn.expression.replace(/\bx\b/g, `(${x})`);
        const evalRes = evaluateExpression(exprWithVal, 'rad', 6);

        if (evalRes.isValid && evalRes.numericValue !== undefined && isFinite(evalRes.numericValue)) {
          const py = toPy(evalRes.numericValue);
          if (py >= -height && py <= height * 2) {
            if (!isDrawing) {
              ctx.moveTo(px, py);
              isDrawing = true;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            isDrawing = false;
          }
        } else {
          isDrawing = false;
        }
      }
      ctx.stroke();
    });
  }, [xMin, xMax, yMin, yMax, functions]);

  useEffect(() => {
    drawGraph();
  }, [drawGraph]);

  // Canvas Resize observer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        canvas.width = entry.contentRect.width;
        canvas.height = 360;
        drawGraph();
      }
    });

    observer.observe(parent);
    return () => observer.disconnect();
  }, [drawGraph]);

  // Zoom handlers
  const handleZoom = (factor: number) => {
    const xCenter = (xMin + xMax) / 2;
    const yCenter = (yMin + yMax) / 2;
    const xSpan = (xMax - xMin) * factor;
    const ySpan = (yMax - yMin) * factor;

    setXMin(xCenter - xSpan / 2);
    setXMax(xCenter + xSpan / 2);
    setYMin(yCenter - ySpan / 2);
    setYMax(yCenter + ySpan / 2);
  };

  const handleResetView = () => {
    setXMin(-10);
    setXMax(10);
    setYMin(-10);
    setYMax(10);
  };

  // Dragging Pan
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const x = xMin + (px / canvas.width) * (xMax - xMin);
    const y = yMax - (py / canvas.height) * (yMax - yMin);

    setHoverCoord({ x, y, px, py });

    if (!isDragging) return;

    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    const xShift = (dx / canvas.width) * (xMax - xMin);
    const yShift = (dy / canvas.height) * (yMax - yMin);

    setXMin((prev) => prev - xShift);
    setXMax((prev) => prev - xShift);
    setYMin((prev) => prev + yShift);
    setYMax((prev) => prev + yShift);

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add function
  const addFunction = () => {
    if (functions.length >= 5) return;
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
    const nextColor = colors[functions.length % colors.length];
    setFunctions((prev) => [
      ...prev,
      {
        id: `f${Date.now()}`,
        expression: 'cos(x)',
        color: nextColor,
        visible: true,
      },
    ]);
  };

  // Presets
  const applyPreset = (preset: 'trig' | 'poly' | 'wave') => {
    if (preset === 'trig') {
      setFunctions([
        { id: 'f1', expression: 'sin(x)', color: '#6366f1', visible: true },
        { id: 'f2', expression: 'cos(x)', color: '#ec4899', visible: true },
      ]);
    } else if (preset === 'poly') {
      setFunctions([
        { id: 'f1', expression: 'x^3 - 3*x', color: '#10b981', visible: true },
        { id: 'f2', expression: '0.5*x^2 - 2', color: '#f59e0b', visible: true },
      ]);
    } else {
      setFunctions([
        { id: 'f1', expression: 'sin(2*x) + cos(3*x)', color: '#8b5cf6', visible: true },
      ]);
    }
    handleResetView();
  };

  return (
    <div className="w-full space-y-4">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-slate-900/90 light:bg-slate-100 border border-slate-800 light:border-slate-300">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleZoom(0.8)}
            className="p-2 rounded-xl bg-slate-800 light:bg-slate-200 hover:bg-slate-700 text-slate-200"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(1.25)}
            className="p-2 rounded-xl bg-slate-800 light:bg-slate-200 hover:bg-slate-700 text-slate-200"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="p-2 rounded-xl bg-slate-800 light:bg-slate-200 hover:bg-slate-700 text-slate-200"
            title="Reset Origin (10x10)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 hidden sm:inline">Presets:</span>
          <button
            onClick={() => applyPreset('trig')}
            className="px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 font-medium"
          >
            Sin / Cos
          </button>
          <button
            onClick={() => applyPreset('poly')}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 font-medium"
          >
            Cubic & Poly
          </button>
        </div>
      </div>

      {/* Main Canvas Graph Display */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 light:border-slate-300 shadow-xl bg-black">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="w-full cursor-grab active:cursor-grabbing block"
        />

        {/* Hover Coordinate Floating Badge */}
        {hoverCoord && (
          <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-slate-900/90 text-indigo-300 border border-slate-800 font-mono text-xs shadow-lg backdrop-blur-md">
            X: <span className="font-bold text-white">{hoverCoord.x.toFixed(3)}</span> | Y:{' '}
            <span className="font-bold text-white">{hoverCoord.y.toFixed(3)}</span>
          </div>
        )}
      </div>

      {/* Equations List Manager */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 light:text-slate-700">
          <span>Active Graph Functions f(x)</span>
          <button
            onClick={addFunction}
            className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-bold"
          >
            <Plus className="w-4 h-4" /> Add Function
          </button>
        </div>

        {functions.map((fn) => (
          <div
            key={fn.id}
            className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-900/60 light:bg-slate-100 border border-slate-800 light:border-slate-300"
          >
            <input
              type="color"
              value={fn.color}
              onChange={(e) =>
                setFunctions((prev) =>
                  prev.map((f) => (f.id === fn.id ? { ...f, color: e.target.value } : f))
                )
              }
              className="w-6 h-6 rounded cursor-pointer border-none bg-transparent"
            />
            <span className="font-mono text-xs font-bold text-slate-400">y =</span>
            <input
              type="text"
              value={fn.expression}
              onChange={(e) =>
                setFunctions((prev) =>
                  prev.map((f) => (f.id === fn.id ? { ...f, expression: e.target.value } : f))
                )
              }
              className="flex-1 px-3 py-1.5 rounded-xl bg-slate-800/80 light:bg-white border border-slate-700/60 light:border-slate-300 font-mono text-xs text-slate-100 light:text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() =>
                setFunctions((prev) =>
                  prev.map((f) => (f.id === fn.id ? { ...f, visible: !f.visible } : f))
                )
              }
              className="p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              {fn.visible ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4" />}
            </button>
            {functions.length > 1 && (
              <button
                onClick={() => setFunctions((prev) => prev.filter((f) => f.id !== fn.id))}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
