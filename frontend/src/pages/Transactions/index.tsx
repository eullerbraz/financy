import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import {
  Colors,
  IconsEnum,
  TransactionType,
  type Transaction,
} from '../../types/index.ts';
import { CreateTransactionDialog } from './components/CreateTransactionDialog.tsx';
import { TransactionsFilters } from './components/TransactionsFilters.tsx';
import { TransactionsTable } from './components/TransactionsTable.tsx';

const transactions: Transaction[] = [
  {
    id: 't-1',
    description: 'Jantar no Restaurante',
    date: new Date('30/11/25'),
    amount: -89.5,
    type: TransactionType.outflow,
    categoryId: 'c-1',
    userId: 'u-1',
    category: {
      id: 'c-1',
      name: 'Alimentação',
      color: Colors.orange,
      icon: IconsEnum.ShoppingCart,
      userId: 'u-1',
    },
  },
  {
    id: 't-2',
    description: 'Posto de Gasolina',
    date: new Date('29/11/25'),
    amount: -100,
    type: TransactionType.outflow,
    categoryId: 'c-2',
    userId: 'u-1',
    category: {
      id: 'c-2',
      name: 'Transporte',
      color: Colors.purple,
      icon: IconsEnum.CarFront,
      userId: 'u-1',
    },
  },
  {
    id: 't-3',
    description: 'Compras no Mercado',
    date: new Date('28/11/25'),
    amount: -156.8,
    type: TransactionType.outflow,
    categoryId: 'c-3',
    userId: 'u-1',
    category: {
      id: 'c-3',
      name: 'Mercado',
      color: Colors.orange,
      icon: IconsEnum.ShoppingCart,
      userId: 'u-1',
    },
  },
  {
    id: 't-4',
    description: 'Retorno de Investimento',
    date: new Date('26/11/25'),
    amount: 340.25,
    type: TransactionType.inflow,
    categoryId: 'c-4',
    userId: 'u-1',
    category: {
      id: 'c-4',
      name: 'Investimento',
      color: Colors.green,
      icon: IconsEnum.PiggyBank,
      userId: 'u-1',
    },
  },
  {
    id: 't-5',
    description: 'Aluguel',
    date: new Date('26/11/25'),
    amount: -1700,
    type: TransactionType.outflow,
    categoryId: 'c-5',
    userId: 'u-1',
    category: {
      id: 'c-5',
      name: 'Utilidades',
      color: Colors.yellow,
      icon: IconsEnum.ShoppingCart,
      userId: 'u-1',
    },
  },
  {
    id: 't-6',
    description: 'Freelance',
    date: new Date('24/11/25'),
    amount: 2500,
    type: TransactionType.inflow,
    categoryId: 'c-6',
    userId: 'u-1',
    category: {
      id: 'c-6',
      name: 'Salario',
      color: Colors.green,
      icon: IconsEnum.BriefcaseBusiness,
      userId: 'u-1',
    },
  },
  {
    id: 't-7',
    description: 'Compras Jantar',
    date: new Date('22/11/25'),
    amount: -150,
    type: TransactionType.outflow,
    categoryId: 'c-7',
    userId: 'u-1',
    category: {
      id: 'c-7',
      name: 'Mercado',
      color: Colors.orange,
      icon: IconsEnum.ShoppingCart,
      userId: 'u-1',
    },
  },
  {
    id: 't-8',
    description: 'Cinema',
    date: new Date('18/11/25'),
    amount: -88,
    type: TransactionType.outflow,
    categoryId: 'c-8',
    userId: 'u-1',
    category: {
      id: 'c-8',
      name: 'Entretenimento',
      color: Colors.pink,
      icon: IconsEnum.Ticket,
      userId: 'u-1',
    },
  },
];

export function Transactions() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className='flex flex-1 gap-8 flex-col w-full p-12 justify-start'>
        <header className='flex justify-between items-center gap-4'>
          <div className='flex flex-col gap-0.5'>
            <h1 className='text-2xl font-bold text-gray-800'>Transações</h1>
            <p className='text-base font-normal text-gray-600'>
              Gerencie todas as suas transacoes financeiras
            </p>
          </div>
          <Button
            className='hover:bg-brand-dark text-sm font-medium text-white'
            size='lg'
            onClick={() => setOpenDialog(true)}
          >
            <Plus className='size-4' />
            Nova transação
          </Button>
        </header>
        <TransactionsFilters />
        <TransactionsTable transactions={transactions} />
      </div>

      <CreateTransactionDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={() => console.log('Transação criada')}
      />
    </>
  );
}
