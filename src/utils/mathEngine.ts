import * as math from 'mathjs';
import { AngleUnit, AppSettings } from '../types';

/**
 * Custom math.js evaluation wrapper with angle unit handling (Deg/Rad) and high precision
 */

export interface EvaluationResult {
  isValid: boolean;
  result: string;
  numericValue?: number;
  error?: string;
}

// Convert trigonometric expressions if in degree mode
function preprocessExpression(expr: string, angleUnit: AngleUnit): string {
  let processed = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'pi')
    .replace(/√\(/g, 'sqrt(')
    .replace(/∛\(/g, 'cbrt(')
    .replace(/MOD/g, 'mod')
    .replace(/AND/g, '&')
    .replace(/OR/g, '|')
    .replace(/XOR/g, '^')
    .replace(/NOT\s*/g, '~');

  if (angleUnit === 'deg') {
    // Math.js expects sin(x deg) or we transform sin(x) -> sin(x deg)
    // We replace standard trig calls sin(val) -> sin(val deg) if not already specified
    processed = processed.replace(/(sin|cos|tan)\(([^()]+)\)/g, (match, fn, arg) => {
      if (arg.includes('deg') || arg.includes('rad')) return match;
      return `${fn}((${arg}) deg)`;
    });
    // For inverse trig, convert result to deg
    processed = processed.replace(/(asin|acos|atan)\(([^()]+)\)/g, (match, fn, arg) => {
      return `(${fn}(${arg}) in deg)`;
    });
  }

  return processed;
}

export function evaluateExpression(
  expression: string,
  angleUnit: AngleUnit = 'deg',
  precision: number = 6
): EvaluationResult {
  if (!expression || expression.trim() === '') {
    return { isValid: true, result: '' };
  }

  try {
    const cleaned = preprocessExpression(expression, angleUnit);
    const evalResult = math.evaluate(cleaned);

    if (evalResult === undefined || evalResult === null) {
      return { isValid: false, result: '', error: 'Invalid expression' };
    }

    if (typeof evalResult === 'function') {
      return { isValid: false, result: '', error: 'Incomplete function call' };
    }

    let numVal: number | undefined;
    let formatted = '';

    if (typeof evalResult === 'number') {
      numVal = evalResult;
      if (!isFinite(evalResult)) {
        if (isNaN(evalResult)) {
          return { isValid: false, result: 'NaN', error: 'Undefined result (NaN)' };
        }
        return { isValid: false, result: evalResult > 0 ? 'Infinity' : '-Infinity', error: 'Division by zero or overflow' };
      }
      formatted = formatNumber(evalResult, precision);
    } else if (math.isComplex(evalResult)) {
      const re = formatNumber(evalResult.re, precision);
      const im = formatNumber(Math.abs(evalResult.im), precision);
      const sign = evalResult.im >= 0 ? '+' : '-';
      formatted = `${re} ${sign} ${im}i`;
    } else if (math.isUnit(evalResult)) {
      formatted = evalResult.format({ precision });
    } else if (math.isMatrix(evalResult) || Array.isArray(evalResult)) {
      const arr = math.isMatrix(evalResult) ? evalResult.toArray() : evalResult;
      formatted = JSON.stringify(arr);
    } else if (typeof evalResult === 'boolean') {
      formatted = evalResult ? 'true' : 'false';
    } else if (typeof evalResult === 'object' && evalResult.value !== undefined) {
      // e.g. math.js Unit or Val
      formatted = math.format(evalResult, { precision });
    } else {
      formatted = String(evalResult);
    }

    return {
      isValid: true,
      result: formatted,
      numericValue: numVal,
    };
  } catch (err: any) {
    let msg = 'Syntax Error';
    if (err.message) {
      if (err.message.includes('Undefined symbol')) {
        msg = `Unknown variable or symbol`;
      } else if (err.message.includes('Unexpected end of expression')) {
        msg = 'Incomplete expression';
      } else if (err.message.includes('Division by zero')) {
        msg = 'Divide by zero';
      } else {
        msg = err.message.length < 35 ? err.message : 'Invalid Expression';
      }
    }
    return { isValid: false, result: '', error: msg };
  }
}

export function formatNumber(
  val: number,
  precision: number = 6,
  thousandsSep: boolean = false
): string {
  if (val === 0) return '0';
  if (!isFinite(val)) return String(val);

  const absVal = Math.abs(val);

  // Scientific notation for very small or very large numbers
  if (absVal >= 1e12 || (absVal < 1e-6 && absVal > 0)) {
    return val.toExponential(Math.min(precision, 8));
  }

  // Standard rounded decimal formatting
  const rounded = Number(Math.round(Number(val + 'e' + precision)) + 'e-' + precision);
  let str = String(rounded);

  if (thousandsSep) {
    const parts = str.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    str = parts.join('.');
  }

  return str;
}

// Factorial helper
export function factorial(n: number): number {
  if (n < 0) return NaN;
  if (n === 0 || n === 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
    if (!isFinite(res)) return Infinity;
  }
  return res;
}

// Permutations nPr
export function permutations(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n) return 0;
  return factorial(n) / factorial(n - r);
}

// Combinations nCr
export function combinations(n: number, r: number): number {
  if (n < 0 || r < 0 || r > n) return 0;
  return factorial(n) / (factorial(r) * factorial(n - r));
}

// Prime checker
export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

// GCD & LCM
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

// Fibonacci
export function fibonacci(n: number): number {
  if (n < 0) return NaN;
  if (n === 0) return 0;
  if (n === 1) return 1;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}

// Polynomial Solvers
export function solveQuadratic(a: number, b: number, c: number): { x1: string; x2: string } {
  if (a === 0) {
    if (b === 0) return { x1: c === 0 ? 'Infinite solutions' : 'No solution', x2: '' };
    return { x1: String(-c / b), x2: 'Linear equation' };
  }
  const disc = b * b - 4 * a * c;
  if (disc > 0) {
    const x1 = (-b + Math.sqrt(disc)) / (2 * a);
    const x2 = (-b - Math.sqrt(disc)) / (2 * a);
    return { x1: formatNumber(x1, 6), x2: formatNumber(x2, 6) };
  } else if (disc === 0) {
    const x = -b / (2 * a);
    return { x1: formatNumber(x, 6), x2: formatNumber(x, 6) };
  } else {
    const real = -b / (2 * a);
    const imag = Math.sqrt(-disc) / (2 * a);
    return {
      x1: `${formatNumber(real, 4)} + ${formatNumber(imag, 4)}i`,
      x2: `${formatNumber(real, 4)} - ${formatNumber(imag, 4)}i`,
    };
  }
}

// Matrix Operations
export function matrixDet(m: number[][]): number {
  try {
    return math.det(m);
  } catch {
    return NaN;
  }
}

export function matrixInverse(m: number[][]): number[][] | null {
  try {
    const inv = math.inv(m);
    return (math.isMatrix(inv) ? inv.toArray() : inv) as unknown as number[][];
  } catch {
    return null;
  }
}

export function matrixMultiply(a: number[][], b: number[][]): number[][] | null {
  try {
    const mult = math.multiply(a, b);
    return (math.isMatrix(mult) ? mult.toArray() : mult) as unknown as number[][];
  } catch {
    return null;
  }
}

export function matrixTranspose(m: number[][]): number[][] {
  try {
    const t = math.transpose(m);
    return (math.isMatrix(t) ? t.toArray() : t) as unknown as number[][];
  } catch {
    return m;
  }
}

// Statistical Helpers
export function calculateStats(numbers: number[]) {
  if (numbers.length === 0) return null;
  const count = numbers.length;
  const sum = numbers.reduce((acc, v) => acc + v, 0);
  const mean = sum / count;

  const sorted = [...numbers].sort((a, b) => a - b);
  const min = sorted[0];
  const max = sorted[sorted.length - 1];

  let median = 0;
  if (count % 2 === 0) {
    median = (sorted[count / 2 - 1] + sorted[count / 2]) / 2;
  } else {
    median = sorted[Math.floor(count / 2)];
  }

  // Mode
  const freq: Record<number, number> = {};
  let maxFreq = 0;
  numbers.forEach((n) => {
    freq[n] = (freq[n] || 0) + 1;
    if (freq[n] > maxFreq) maxFreq = freq[n];
  });
  const modes = Object.keys(freq)
    .filter((k) => freq[Number(k)] === maxFreq)
    .map(Number);

  // Variance & Standard Deviation
  const variance = numbers.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / count;
  const stdDev = Math.sqrt(variance);

  return {
    count,
    sum,
    mean,
    median,
    min,
    max,
    range: max - min,
    modes: maxFreq > 1 ? modes : 'No repeat mode',
    variance,
    stdDev,
  };
}
