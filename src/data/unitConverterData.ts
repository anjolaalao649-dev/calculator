import { UnitCategory } from '../types';

export const UNIT_CATEGORIES: UnitCategory[] = [
  {
    id: 'length',
    name: 'Length',
    iconName: 'Ruler',
    units: [
      { id: 'm', name: 'Meter', symbol: 'm', ratioToBase: 1 },
      { id: 'km', name: 'Kilometer', symbol: 'km', ratioToBase: 1000 },
      { id: 'cm', name: 'Centimeter', symbol: 'cm', ratioToBase: 0.01 },
      { id: 'mm', name: 'Millimeter', symbol: 'mm', ratioToBase: 0.001 },
      { id: 'mi', name: 'Mile', symbol: 'mi', ratioToBase: 1609.344 },
      { id: 'yd', name: 'Yard', symbol: 'yd', ratioToBase: 0.9144 },
      { id: 'ft', name: 'Foot', symbol: 'ft', ratioToBase: 0.3048 },
      { id: 'in', name: 'Inch', symbol: 'in', ratioToBase: 0.0254 },
      { id: 'nmi', name: 'Nautical Mile', symbol: 'nmi', ratioToBase: 1852 },
    ],
  },
  {
    id: 'mass',
    name: 'Weight / Mass',
    iconName: 'Weight',
    units: [
      { id: 'kg', name: 'Kilogram', symbol: 'kg', ratioToBase: 1 },
      { id: 'g', name: 'Gram', symbol: 'g', ratioToBase: 0.001 },
      { id: 'mg', name: 'Milligram', symbol: 'mg', ratioToBase: 0.000001 },
      { id: 't', name: 'Metric Ton', symbol: 't', ratioToBase: 1000 },
      { id: 'lb', name: 'Pound', symbol: 'lb', ratioToBase: 0.45359237 },
      { id: 'oz', name: 'Ounce', symbol: 'oz', ratioToBase: 0.028349523125 },
    ],
  },
  {
    id: 'temperature',
    name: 'Temperature',
    iconName: 'Thermometer',
    units: [
      { id: 'celsius', name: 'Celsius', symbol: '°C', ratioToBase: 1, offset: 0 },
      { id: 'fahrenheit', name: 'Fahrenheit', symbol: '°F', ratioToBase: 5 / 9, offset: 32 },
      { id: 'kelvin', name: 'Kelvin', symbol: 'K', ratioToBase: 1, offset: 273.15 },
    ],
  },
  {
    id: 'time',
    name: 'Time',
    iconName: 'Clock',
    units: [
      { id: 's', name: 'Second', symbol: 's', ratioToBase: 1 },
      { id: 'min', name: 'Minute', symbol: 'min', ratioToBase: 60 },
      { id: 'h', name: 'Hour', symbol: 'h', ratioToBase: 3600 },
      { id: 'd', name: 'Day', symbol: 'd', ratioToBase: 86400 },
      { id: 'wk', name: 'Week', symbol: 'wk', ratioToBase: 604800 },
      { id: 'mo', name: 'Month (30 days)', symbol: 'mo', ratioToBase: 2592000 },
      { id: 'yr', name: 'Year (365 days)', symbol: 'yr', ratioToBase: 31536000 },
    ],
  },
  {
    id: 'area',
    name: 'Area',
    iconName: 'Square',
    units: [
      { id: 'sqm', name: 'Square Meter', symbol: 'm²', ratioToBase: 1 },
      { id: 'sqkm', name: 'Square Kilometer', symbol: 'km²', ratioToBase: 1000000 },
      { id: 'sqft', name: 'Square Foot', symbol: 'ft²', ratioToBase: 0.09290304 },
      { id: 'sqin', name: 'Square Inch', symbol: 'in²', ratioToBase: 0.00064516 },
      { id: 'acre', name: 'Acre', symbol: 'ac', ratioToBase: 4046.8564224 },
      { id: 'ha', name: 'Hectare', symbol: 'ha', ratioToBase: 10000 },
    ],
  },
  {
    id: 'volume',
    name: 'Volume',
    iconName: 'Box',
    units: [
      { id: 'l', name: 'Liter', symbol: 'L', ratioToBase: 1 },
      { id: 'ml', name: 'Milliliter', symbol: 'mL', ratioToBase: 0.001 },
      { id: 'cum', name: 'Cubic Meter', symbol: 'm³', ratioToBase: 1000 },
      { id: 'gal', name: 'US Gallon', symbol: 'gal', ratioToBase: 3.785411784 },
      { id: 'qt', name: 'US Quart', symbol: 'qt', ratioToBase: 0.946352946 },
      { id: 'pt', name: 'US Pint', symbol: 'pt', ratioToBase: 0.473176473 },
      { id: 'cup', name: 'US Cup', symbol: 'cup', ratioToBase: 0.2365882365 },
      { id: 'floz', name: 'US Fluid Ounce', symbol: 'fl oz', ratioToBase: 0.0295735295625 },
    ],
  },
  {
    id: 'speed',
    name: 'Speed',
    iconName: 'Gauge',
    units: [
      { id: 'mps', name: 'Meter per second', symbol: 'm/s', ratioToBase: 1 },
      { id: 'kph', name: 'Kilometer per hour', symbol: 'km/h', ratioToBase: 0.277777778 },
      { id: 'mph', name: 'Mile per hour', symbol: 'mph', ratioToBase: 0.44704 },
      { id: 'knot', name: 'Knot', symbol: 'kn', ratioToBase: 0.514444444 },
    ],
  },
  {
    id: 'pressure',
    name: 'Pressure',
    iconName: 'Activity',
    units: [
      { id: 'pa', name: 'Pascal', symbol: 'Pa', ratioToBase: 1 },
      { id: 'kpa', name: 'Kilopascal', symbol: 'kPa', ratioToBase: 1000 },
      { id: 'bar', name: 'Bar', symbol: 'bar', ratioToBase: 100000 },
      { id: 'psi', name: 'PSI (lbs/sq in)', symbol: 'psi', ratioToBase: 6894.757293 },
      { id: 'atm', name: 'Standard Atmosphere', symbol: 'atm', ratioToBase: 101325 },
    ],
  },
  {
    id: 'energy',
    name: 'Energy',
    iconName: 'Zap',
    units: [
      { id: 'j', name: 'Joule', symbol: 'J', ratioToBase: 1 },
      { id: 'kj', name: 'Kilojoule', symbol: 'kJ', ratioToBase: 1000 },
      { id: 'cal', name: 'Calorie', symbol: 'cal', ratioToBase: 4.184 },
      { id: 'kcal', name: 'Kilocalorie (food)', symbol: 'kcal', ratioToBase: 4184 },
      { id: 'wh', name: 'Watt-hour', symbol: 'Wh', ratioToBase: 3600 },
      { id: 'kwh', name: 'Kilowatt-hour', symbol: 'kWh', ratioToBase: 3600000 },
      { id: 'btu', name: 'BTU', symbol: 'BTU', ratioToBase: 1055.05585 },
    ],
  },
  {
    id: 'data',
    name: 'Data Storage',
    iconName: 'Database',
    units: [
      { id: 'b', name: 'Byte', symbol: 'B', ratioToBase: 1 },
      { id: 'kb', name: 'Kilobyte', symbol: 'KB', ratioToBase: 1024 },
      { id: 'mb', name: 'Megabyte', symbol: 'MB', ratioToBase: 1048576 },
      { id: 'gb', name: 'Gigabyte', symbol: 'GB', ratioToBase: 1073741824 },
      { id: 'tb', name: 'Terabyte', symbol: 'TB', ratioToBase: 1099511627776 },
      { id: 'pb', name: 'Petabyte', symbol: 'PB', ratioToBase: 1125899906842624 },
    ],
  },
  {
    id: 'currency',
    name: 'Currency (Reference Rates)',
    iconName: 'DollarSign',
    units: [
      { id: 'usd', name: 'US Dollar', symbol: '$', ratioToBase: 1 },
      { id: 'eur', name: 'Euro', symbol: '€', ratioToBase: 1.08 },
      { id: 'gbp', name: 'British Pound', symbol: '£', ratioToBase: 1.28 },
      { id: 'jpy', name: 'Japanese Yen', symbol: '¥', ratioToBase: 0.0068 },
      { id: 'cad', name: 'Canadian Dollar', symbol: 'CA$', ratioToBase: 0.73 },
      { id: 'aud', name: 'Australian Dollar', symbol: 'A$', ratioToBase: 0.65 },
      { id: 'chf', name: 'Swiss Franc', symbol: 'CHF', ratioToBase: 1.13 },
      { id: 'inr', name: 'Indian Rupee', symbol: '₹', ratioToBase: 0.012 },
      { id: 'cny', name: 'Chinese Yuan', symbol: '¥', ratioToBase: 0.14 },
    ],
  },
];

export function convertUnits(
  category: UnitCategory,
  fromUnitId: string,
  toUnitId: string,
  value: number
): number {
  if (isNaN(value)) return 0;
  const from = category.units.find((u) => u.id === fromUnitId);
  const to = category.units.find((u) => u.id === toUnitId);

  if (!from || !to) return value;

  if (category.id === 'temperature') {
    // Special temperature handling with offsets
    let kelvin = 0;
    if (from.id === 'celsius') kelvin = value + 273.15;
    else if (from.id === 'fahrenheit') kelvin = (value - 32) * (5 / 9) + 273.15;
    else kelvin = value;

    if (to.id === 'celsius') return kelvin - 273.15;
    if (to.id === 'fahrenheit') return (kelvin - 273.15) * (9 / 5) + 32;
    return kelvin;
  }

  // Linear base conversion: value * from.ratioToBase / to.ratioToBase
  const baseValue = value * from.ratioToBase;
  return baseValue / to.ratioToBase;
}
