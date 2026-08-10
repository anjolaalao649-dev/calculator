export type CalcMode = 
  | 'standard' 
  | 'scientific' 
  | 'programmer' 
  | 'graphing' 
  | 'advanced' 
  | 'converter' 
  | 'formulas';

export type ThemeMode = 'dark' | 'light' | 'emerald' | 'cyberpunk';

export type AngleUnit = 'deg' | 'rad' | 'grad';

export type NumberBase = 'HEX' | 'DEC' | 'OCT' | 'BIN';

export interface AppSettings {
  theme: ThemeMode;
  precision: number; // Decimal places 0 to 10
  angleUnit: AngleUnit;
  thousandsSeparator: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  scientificNotationThreshold: number; // e.g. 1e10
  fontSize: 'sm' | 'md' | 'lg';
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  mode: CalcMode;
  timestamp: number;
  isPinned?: boolean;
}

export interface MemoryState {
  value: number;
  isSet: boolean;
}

export interface GraphFunction {
  id: string;
  expression: string;
  color: string;
  visible: boolean;
}

export interface UnitCategory {
  id: string;
  name: string;
  iconName: string;
  units: {
    id: string;
    name: string;
    symbol: string;
    ratioToBase: number; // for linear conversions relative to base unit
    offset?: number; // e.g. for temperature
  }[];
}

export interface Formula {
  id: string;
  title: string;
  category: 'Algebra' | 'Geometry' | 'Trigonometry' | 'Calculus' | 'Physics' | 'Chemistry' | 'Statistics';
  formulaStr: string;
  description: string;
  variables: {
    symbol: string;
    label: string;
    unit?: string;
    defaultValue?: number;
  }[];
  solveFor: string; // The variable on the left side
  computeFn: (inputs: Record<string, number>) => number;
}
