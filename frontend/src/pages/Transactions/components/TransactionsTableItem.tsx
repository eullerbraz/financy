import { Button } from '@/components/ui/button';
import { CircleArrowDown, CircleArrowUp, SquarePen, Trash } from 'lucide-react';
import { useState } from 'react';
import { CategoryLogo } from '../../../components/CategoryLogo';
import { CategoryTag } from '../../../components/CategoryTag';
import { IconsMap, TransactionType, type Transaction } from '../../../types';
import { formatAmount } from '../../../utils/format-amount';
import { EditTransactionDialog } from './EditTransactionDialog';

const colorsMap = {
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
} as const;

export function TransactionsTableItem({
  transaction,
}: {
  transaction: Transaction;
}) {
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const Icon = IconsMap[transaction.category.icon as keyof typeof IconsMap];

  const color = colorsMap[transaction.category.color as keyof typeof colorsMap];

  return (
    <>
      <div className='flex px-6 py-4 border-t border-gray-200'>
        <div className='flex items-center gap-4 flex-1'>
          <CategoryLogo bgColor={color.bg} textColor={color.text} icon={Icon} />
          <span className='truncate text-base font-medium text-gray-800'>
            {transaction.description}
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <div className='min-w-28 flex items-center justify-center'>
            <span className='text-sm font-normal text-gray-600'>
              {transaction.date.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              })}
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
            {transaction.type === TransactionType.inflow ? (
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
              onClick={() => setOpenEditDialog(true)}
            >
              <SquarePen className='size-4 text-gray-700' />
            </Button>
          </div>
        </div>
      </div>

      <EditTransactionDialog
        transaction={transaction}
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        onEdited={(transaction) => console.log(transaction)}
      />
    </>
  );
}
