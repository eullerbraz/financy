import { Button } from '@/components/ui/button';
import {
  BriefcaseBusiness,
  Fuel,
  Pizza,
  Plus,
  ShoppingBasket,
  ShoppingCart,
  Ticket,
  Wallet,
} from 'lucide-react';
import { TransactionsFilters } from './components/TransactionsFilters.tsx';
import { TransactionsTable } from './components/TransactionsTable.tsx';

export type TransactionTone = 'inflow' | 'outflow';

export type Category = {
  name: string;
  color: keyof typeof colorsMap;
};

export type Transaction = {
  id: string;
  title: string;
  date: string;
  amount: number;
  tone: TransactionTone;
  category: Category;
  icon: typeof Wallet;
};

export const colorsMap = {
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

const transactions: Transaction[] = [
  {
    id: 't-1',
    title: 'Jantar no Restaurante',
    date: '30/11/25',
    amount: -89.5,
    tone: 'outflow',
    category: {
      name: 'Alimentação',
      color: 'blue',
    },
    icon: Pizza,
  },
  {
    id: 't-2',
    title: 'Posto de Gasolina',
    date: '29/11/25',
    amount: -100,
    tone: 'outflow',
    category: {
      name: 'Transporte',
      color: 'purple',
    },
    icon: Fuel,
  },
  {
    id: 't-3',
    title: 'Compras no Mercado',
    date: '28/11/25',
    amount: -156.8,
    tone: 'outflow',
    category: {
      name: 'Mercado',
      color: 'orange',
    },
    icon: ShoppingCart,
  },
  {
    id: 't-4',
    title: 'Retorno de Investimento',
    date: '26/11/25',
    amount: 340.25,
    tone: 'inflow',
    category: {
      name: 'Investimento',
      color: 'green',
    },
    icon: Wallet,
  },
  {
    id: 't-5',
    title: 'Aluguel',
    date: '26/11/25',
    amount: -1700,
    tone: 'outflow',
    category: {
      name: 'Utilidades',
      color: 'yellow',
    },
    icon: ShoppingBasket,
  },
  {
    id: 't-6',
    title: 'Freelance',
    date: '24/11/25',
    amount: 2500,
    tone: 'inflow',
    category: {
      name: 'Salario',
      color: 'green',
    },
    icon: BriefcaseBusiness,
  },
  {
    id: 't-7',
    title: 'Compras Jantar',
    date: '22/11/25',
    amount: -150,
    tone: 'outflow',
    category: {
      name: 'Mercado',
      color: 'orange',
    },
    icon: ShoppingCart,
  },
  {
    id: 't-8',
    title: 'Cinema',
    date: '18/11/25',
    amount: -88,
    tone: 'outflow',
    category: {
      name: 'Entretenimento',
      color: 'pink',
    },
    icon: Ticket,
  },
];

export function Transactions() {
  return (
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
        >
          <Plus className='size-4' />
          Nova transação
        </Button>
      </header>

      <TransactionsFilters />

      <TransactionsTable transactions={transactions} />
    </div>
  );
}
