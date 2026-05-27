import { cn } from '@/lib/utils';
import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { CategoryLogo } from '../../../components/CategoryLogo';
import { CategoryTag } from '../../../components/CategoryTag';
import { IconsMap, TransactionType, type Transaction } from '../../../types';
import { formatAmount } from '../../../utils/format-amount';

const colorsMap: Record<
  string,
  { bg: string; text: string; textDark: string }
> = {
  blue: {
    bg: 'bg-blue-light',
    text: 'text-blue',
    textDark: 'text-blue-dark',
  },
  purple: {
    bg: 'bg-purple-light',
    text: 'text-purple',
    textDark: 'text-purple-dark',
  },
  orange: {
    bg: 'bg-orange-light',
    text: 'text-orange',
    textDark: 'text-orange-dark',
  },
  pink: {
    bg: 'bg-pink-light',
    text: 'text-pink',
    textDark: 'text-pink-dark',
  },
  yellow: {
    bg: 'bg-yellow-light',
    text: 'text-yellow',
    textDark: 'text-yellow-dark',
  },
  green: {
    bg: 'bg-green-light',
    text: 'text-green',
    textDark: 'text-green-dark',
  },
};

export function DashboardTransactionItem({
  transaction,
}: {
  transaction: Transaction;
}) {
  const Icon = IconsMap[transaction.category.icon as keyof typeof IconsMap];

  const bgColorLight = colorsMap[transaction.category.color].bg;
  const textColor = colorsMap[transaction.category.color].text;
  const textColorDark = colorsMap[transaction.category.color].textDark;

  return (
    <div className='flex px-6 py-4 border-t border-gray-200'>
      <div className='flex items-center gap-4 flex-1'>
        <CategoryLogo
          bgColor={bgColorLight}
          textColor={textColor}
          icon={Icon}
        />

        <div>
          <p className='text-base font-medium text-gray-800'>
            {transaction.description}
          </p>
          <p className='text-sm font-normal text-gray-600'>
            {transaction.date.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
            })}
          </p>
        </div>
      </div>
      <div className='flex'>
        <div className='min-w-40 flex items-center justify-center'>
          <CategoryTag
            name={transaction.category.name}
            bgColor={bgColorLight}
            textColor={textColorDark}
          />
        </div>

        <div
          className={cn(
            'min-w-32 flex items-center justify-center gap-2 text-sm font-semibold tabular-nums text-gray-800',
          )}
        >
          <span>{formatAmount(transaction.amount)}</span>
          {transaction.type === TransactionType.inflow ? (
            <CircleArrowUp className='size-4 text-green-dark' />
          ) : (
            <CircleArrowDown className='size-4 text-red-dark' />
          )}
        </div>
      </div>
    </div>
  );
}
