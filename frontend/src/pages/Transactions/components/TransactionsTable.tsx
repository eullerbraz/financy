import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../../components/ui/button.tsx';
import type { Transaction } from '../../../types/index.ts';
import { TransactionsTableItem } from './TransactionsTableItem.tsx';

export function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <Card className='gap-0 overflow-hidden border border-gray-200 p-0'>
      <CardHeader className='px-6 py-4 flex items-center justify-between gap-0'>
        <div className='flex items-center gap-4 flex-1'>
          <CardTitle className='text-xs font-medium uppercase tracking-wide text-gray-500'>
            Descricao
          </CardTitle>
        </div>

        <div className='flex items-center gap-1'>
          <CardTitle className='min-w-28 text-xs font-medium uppercase tracking-wide text-gray-500 text-center'>
            Data
          </CardTitle>
          <CardTitle className='min-w-40 text-xs font-medium uppercase tracking-wide text-gray-500 text-center'>
            Categoria
          </CardTitle>
          <CardTitle className='min-w-32 text-xs font-medium uppercase tracking-wide text-gray-500 text-center'>
            Tipo
          </CardTitle>
          <CardTitle className='min-w-40 text-xs font-medium uppercase tracking-wide text-gray-500 text-right'>
            Valor
          </CardTitle>
          <CardTitle className='min-w-28 text-xs font-medium uppercase tracking-wide text-gray-500 text-right'>
            Ações
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className='p-0'>
        {transactions.map((transaction) => (
          <TransactionsTableItem
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </CardContent>

      <CardFooter className='border-t border-gray-200 bg-white px-6 py-4'>
        <div className='w-full flex items-center justify-between gap-4'>
          <span className='text-sm font-regular text-gray-700'>
            <span className='font-medium'>1</span>
            {' a '}
            <span className='font-medium'>10</span>
            {' | '}
            <span className='font-medium'>27</span>
            {' resultados'}
          </span>

          <div className='flex items-center gap-2'>
            <Button
              size='icon'
              variant='outline'
              className='text-gray-700 border-gray-300'
            >
              <ChevronLeft className='size-4' />
            </Button>
            <Button
              size='icon'
              className='bg-brand text-sm text-white font-medium'
            >
              1
            </Button>
            <Button
              size='icon'
              variant='outline'
              className='text-gray-700 border-gray-300'
            >
              2
            </Button>
            <Button
              size='icon'
              variant='outline'
              className='text-gray-700 border-gray-300'
            >
              3
            </Button>
            <Button
              size='icon'
              variant='outline'
              className='text-gray-700 border-gray-300'
            >
              <ChevronRight className='size-4' />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
