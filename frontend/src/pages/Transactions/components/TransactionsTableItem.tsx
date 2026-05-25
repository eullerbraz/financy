import { Button } from '@/components/ui/button';
import { CircleArrowDown, CircleArrowUp, SquarePen, Trash } from 'lucide-react';
import { colorsMap, type Transaction } from '..';
import { CategoryLogo } from '../../../components/CategoryLogo';
import { CategoryTag } from '../../../components/CategoryTag';
import { formatAmount } from '../../../utils/format-amount';

export function TransactionsTableItem({
  transaction,
}: {
  transaction: Transaction;
}) {
  const Icon = transaction.icon;
  const color = colorsMap[transaction.category.color];

  return (
    <div className='flex px-6 py-4 border-t border-gray-200'>
      <div className='flex items-center gap-4 flex-1'>
        <CategoryLogo bgColor={color.bg} textColor={color.text} icon={Icon} />

        <span className='truncate text-base font-medium text-gray-800'>
          {transaction.title}
        </span>
      </div>

      <div className='flex items-center gap-1'>
        <div className='min-w-28 flex items-center justify-center'>
          <span className='text-sm font-normal text-gray-600'>
            {transaction.date}
          </span>
        </div>

        <div className='min-w-40 flex items-center justify-center'>
          <CategoryTag
            name={transaction.category.name}
            bgColor={color.bg}
            textColor={color.textDark}
          />
        </div>

        <div className='min-w-32 flex items-center justify-center gap-2 text-sm font-medium'>
          {transaction.tone === 'inflow' ? (
            <>
              <CircleArrowUp className='size-4 text-green' />
              <span className='text-green-dark'>Entrada</span>
            </>
          ) : (
            <>
              <CircleArrowDown className='size-4 text-red' />
              <span className='text-red-dark'>Saida</span>
            </>
          )}
        </div>

        <div className='min-w-40 flex items-center justify-end'>
          <span className='text-sm font-semibold tabular-nums text-gray-800'>
            {formatAmount(transaction.amount)}
          </span>
        </div>

        <div className='min-w-28 flex items-center justify-end gap-2'>
          <Button
            size='icon'
            variant='outline'
            className='border-gray-300 text-red'
          >
            <Trash className='size-4 text-feedback-danger' />
          </Button>

          <Button
            size='icon'
            variant='outline'
            className='border-gray-300 text-gray-600'
          >
            <SquarePen className='size-4 text-gray-700' />
          </Button>
        </div>
      </div>
    </div>
  );
}
