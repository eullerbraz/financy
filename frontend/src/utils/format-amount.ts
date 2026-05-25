import { formatCurrency } from './format-currency';

export function formatAmount(value: number) {
  const abs = Math.abs(value);
  return `${value >= 0 ? '+' : '-'} ${formatCurrency(abs)}`;
}
