import { TransactionType } from '../types';
import { formatCurrency } from './format-currency';

export function formatAmount(
  value: number,
  type: TransactionType = TransactionType.inflow,
): string {
  const abs = Math.abs(value);
  return `${type === TransactionType.inflow ? '+' : '-'} ${formatCurrency(abs)}`;
}
