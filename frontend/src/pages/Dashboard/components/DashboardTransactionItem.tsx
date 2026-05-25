import { cn } from '@/lib/utils';
import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { colorsMap, type Transaction } from '..';
import { CategoryLogo } from '../../../components/CategoryLogo';
import { CategoryTag } from '../../../components/CategoryTag';
import { formatCurrency } from '../../../utils/format-currency';

export function DashboardTransactionItem({
  transaction,
}: {
  transaction: Transaction;
}) {
  const Icon = transaction.icon;

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
            {transaction.title}
          </p>
          <p className='text-sm font-normal text-gray-600'>
            {transaction.date}
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
          <span>{formatCurrency(transaction.amount)}</span>
          {transaction.tone === 'inflow' ? (
            <CircleArrowUp className='size-4 text-green-dark' />
          ) : (
            <CircleArrowDown className='size-4 text-red-dark' />
          )}
        </div>
      </div>
    </div>
  );
}
