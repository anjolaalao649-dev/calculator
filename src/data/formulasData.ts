import { Formula } from '../types';

export const FORMULAS: Formula[] = [
  // Algebra
  {
    id: 'quad_vertex',
    title: 'Quadratic Vertex X-Coordinate',
    category: 'Algebra',
    formulaStr: 'x = -b / (2a)',
    description: 'Finds the x-coordinate of the parabola axis of symmetry / vertex.',
    variables: [
      { symbol: 'a', label: 'Coefficient a (≠ 0)', defaultValue: 1 },
      { symbol: 'b', label: 'Coefficient b', defaultValue: -4 },
    ],
    solveFor: 'x',
    computeFn: ({ a, b }) => (a !== 0 ? -b / (2 * a) : NaN),
  },
  {
    id: 'compound_interest',
    title: 'Compound Interest Amount',
    category: 'Algebra',
    formulaStr: 'A = P × (1 + r/n)^(n×t)',
    description: 'Calculates total accumulated amount A with principal P, annual rate r, compound frequency n, and time t.',
    variables: [
      { symbol: 'P', label: 'Principal ($)', defaultValue: 1000 },
      { symbol: 'r', label: 'Annual Interest Rate (decimal, e.g. 0.05)', defaultValue: 0.05 },
      { symbol: 'n', label: 'Compounding frequency per year', defaultValue: 12 },
      { symbol: 't', label: 'Time in Years', defaultValue: 5 },
    ],
    solveFor: 'A',
    computeFn: ({ P, r, n, t }) => P * Math.pow(1 + r / n, n * t),
  },
  // Geometry
  {
    id: 'circle_area',
    title: 'Area of a Circle',
    category: 'Geometry',
    formulaStr: 'A = π × r²',
    description: 'Calculates the area of a circle given radius r.',
    variables: [{ symbol: 'r', label: 'Radius', defaultValue: 5 }],
    solveFor: 'A',
    computeFn: ({ r }) => Math.PI * r * r,
  },
  {
    id: 'sphere_volume',
    title: 'Volume of a Sphere',
    category: 'Geometry',
    formulaStr: 'V = (4/3) × π × r³',
    description: 'Calculates the volume of a sphere given radius r.',
    variables: [{ symbol: 'r', label: 'Radius', defaultValue: 3 }],
    solveFor: 'V',
    computeFn: ({ r }) => (4 / 3) * Math.PI * Math.pow(r, 3),
  },
  {
    id: 'pythagoras',
    title: 'Pythagorean Theorem Hypotenuse',
    category: 'Geometry',
    formulaStr: 'c = √(a² + b²)',
    description: 'Finds hypotenuse length c of a right triangle with legs a and b.',
    variables: [
      { symbol: 'a', label: 'Leg a', defaultValue: 3 },
      { symbol: 'b', label: 'Leg b', defaultValue: 4 },
    ],
    solveFor: 'c',
    computeFn: ({ a, b }) => Math.sqrt(a * a + b * b),
  },
  // Trigonometry
  {
    id: 'law_of_cosines',
    title: 'Law of Cosines (Side c)',
    category: 'Trigonometry',
    formulaStr: 'c = √(a² + b² - 2ab cos(C))',
    description: 'Finds side c given sides a, b and angle C in degrees.',
    variables: [
      { symbol: 'a', label: 'Side a', defaultValue: 7 },
      { symbol: 'b', label: 'Side b', defaultValue: 10 },
      { symbol: 'C_deg', label: 'Angle C (degrees)', defaultValue: 60 },
    ],
    solveFor: 'c',
    computeFn: ({ a, b, C_deg }) => {
      const rad = (C_deg * Math.PI) / 180;
      return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad));
    },
  },
  // Calculus
  {
    id: 'diff_power_rule',
    title: 'Derivative of Power Function',
    category: 'Calculus',
    formulaStr: 'd/dx (xⁿ) = n × xⁿ⁻¹',
    description: 'Evaluates derivative of xⁿ at a specific value of x.',
    variables: [
      { symbol: 'n', label: 'Exponent n', defaultValue: 3 },
      { symbol: 'x', label: 'Evaluation point x', defaultValue: 2 },
    ],
    solveFor: "f'(x)",
    computeFn: ({ n, x }) => n * Math.pow(x, n - 1),
  },
  // Physics
  {
    id: 'kinetic_energy',
    title: 'Kinetic Energy',
    category: 'Physics',
    formulaStr: 'KE = 0.5 × m × v²',
    description: 'Energy possessed by an object due to motion.',
    variables: [
      { symbol: 'm', label: 'Mass (kg)', defaultValue: 10 },
      { symbol: 'v', label: 'Velocity (m/s)', defaultValue: 15 },
    ],
    solveFor: 'KE (Joules)',
    computeFn: ({ m, v }) => 0.5 * m * v * v,
  },
  {
    id: 'gravitational_force',
    title: 'Newton Universal Gravitation',
    category: 'Physics',
    formulaStr: 'F = G × (m1 × m2) / r²',
    description: 'Gravitational attraction between two point masses m1 and m2 separated by distance r.',
    variables: [
      { symbol: 'm1', label: 'Mass 1 (kg)', defaultValue: 5.972e24 }, // Earth mass
      { symbol: 'm2', label: 'Mass 2 (kg)', defaultValue: 70 }, // Human mass
      { symbol: 'r', label: 'Distance r (m)', defaultValue: 6371000 }, // Earth radius
    ],
    solveFor: 'F (Newtons)',
    computeFn: ({ m1, m2, r }) => {
      const G = 6.6743e-11;
      return (G * m1 * m2) / (r * r);
    },
  },
  {
    id: 'einstein_energy',
    title: 'Mass-Energy Equivalence',
    category: 'Physics',
    formulaStr: 'E = m × c²',
    description: 'Einstein famous mass-energy equation where c = 299,792,458 m/s.',
    variables: [{ symbol: 'm', label: 'Mass (kg)', defaultValue: 0.001 }],
    solveFor: 'E (Joules)',
    computeFn: ({ m }) => m * Math.pow(299792458, 2),
  },
  // Chemistry
  {
    id: 'ideal_gas_law',
    title: 'Ideal Gas Law (Pressure)',
    category: 'Chemistry',
    formulaStr: 'P = (n × R × T) / V',
    description: 'Pressure P where R = 8.314 J/(mol·K).',
    variables: [
      { symbol: 'n', label: 'Amount of substance (moles)', defaultValue: 2 },
      { symbol: 'T', label: 'Absolute Temperature (K)', defaultValue: 298.15 },
      { symbol: 'V', label: 'Volume (m³)', defaultValue: 0.05 },
    ],
    solveFor: 'P (Pascals)',
    computeFn: ({ n, T, V }) => (V !== 0 ? (n * 8.314 * T) / V : NaN),
  },
  // Statistics
  {
    id: 'z_score',
    title: 'Standard Z-Score',
    category: 'Statistics',
    formulaStr: 'z = (x - μ) / σ',
    description: 'Measures how many standard deviations σ an observation x is from mean μ.',
    variables: [
      { symbol: 'x', label: 'Observation x', defaultValue: 85 },
      { symbol: 'mu', label: 'Mean μ', defaultValue: 70 },
      { symbol: 'sigma', label: 'Standard Deviation σ', defaultValue: 10 },
    ],
    solveFor: 'z',
    computeFn: ({ x, mu, sigma }) => (sigma !== 0 ? (x - mu) / sigma : NaN),
  },
];
