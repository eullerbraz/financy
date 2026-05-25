import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BriefcaseBusiness,
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Fuel,
  Landmark,
  Pizza,
  Plus,
  ShoppingCart,
  Wallet,
} from 'lucide-react';
import { DashboardCategoryItem } from './components/DashboardCategoryItem';
import { DashboardMetricCard } from './components/DashboardMetricCard';
import { DashboardTransactionItem } from './components/DashboardTransactionItem';

export type MetricTone = 'purple' | 'brand' | 'red';
export type TransactionTone = 'inflow' | 'outflow';

export type Metric = {
  label: string;
  value: number;
  icon: typeof Wallet;
  tone: MetricTone;
};

export type Transaction = {
  title: string;
  date: string;
  amount: number;
  category: Category;
  tone: TransactionTone;
  icon: typeof Landmark;
};

export type Category = {
  name: string;
  items: number;
  amount: number;
  color: string;
};

const metrics: Metric[] = [
  {
    label: 'Saldo total',
    value: 12847.32,
    icon: Wallet,
    tone: 'purple',
  },
  {
    label: 'Receitas do mês',
    value: 4250.0,
    icon: CircleArrowUp,
    tone: 'brand',
  },
  {
    label: 'Despesas do mês',
    value: 2180.45,
    icon: CircleArrowDown,
    tone: 'red',
  },
];

const recentTransactions: Transaction[] = [
  {
    title: 'Pagamento de Salário',
    date: '01/12/25',
    amount: 4250.0,
    category: {
      name: 'Receita',
      color: 'green',
      items: 1,
      amount: 4250.0,
    },
    tone: 'inflow',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Jantar no Restaurante',
    date: '30/11/25',
    amount: -89.5,
    category: {
      name: 'Alimentação',
      color: 'blue',
      items: 1,
      amount: 89.5,
    },
    tone: 'outflow',
    icon: Pizza,
  },
  {
    title: 'Posto de Gasolina',
    date: '29/11/25',
    amount: -100.0,
    category: {
      name: 'Transporte',
      color: 'purple',
      items: 1,
      amount: 100.0,
    },
    tone: 'outflow',
    icon: Fuel,
  },
  {
    title: 'Compras no Mercado',
    date: '28/11/25',
    amount: -156.8,
    category: {
      name: 'Mercado',
      color: 'orange',
      items: 1,
      amount: 156.8,
    },
    tone: 'outflow',
    icon: ShoppingCart,
  },
  {
    title: 'Retorno de Investimento',
    date: '26/11/25',
    amount: 340.25,
    category: {
      name: 'Investimento',
      color: 'green',
      items: 1,
      amount: 340.25,
    },
    tone: 'inflow',
    icon: Wallet,
  },
];

const categories: Category[] = [
  {
    name: 'Alimentação',
    items: 12,
    amount: 542.3,
    color: 'blue',
  },
  {
    name: 'Transporte',
    items: 8,
    amount: 385.5,
    color: 'purple',
  },
  {
    name: 'Mercado',
    items: 3,
    amount: 298.75,
    color: 'orange',
  },
  {
    name: 'Entretenimento',
    items: 2,
    amount: 186.2,
    color: 'pink',
  },
  {
    name: 'Utilidades',
    items: 7,
    amount: 245.8,
    color: 'yellow',
  },
];

export const colorsMap: Record<
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

export function Dashboard() {
  return (
    <div className='flex flex-1 gap-6 flex-col w-full p-12 justify-start'>
      <section className='grid gap-6 grid-cols-3'>
        {metrics.map((metric) => (
          <DashboardMetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className='grid gap-6 grid-cols-3 items-start'>
        <Card className='gap-0 p-0 col-span-2 border border-gray-200'>
          <CardHeader className='px-6 py-4 flex items-center justify-between gap-4'>
            <CardTitle className='text-xs font-medium uppercase tracking-wide text-gray-500'>
              Transações recentes
            </CardTitle>
            <CardAction>
              <Button
                variant='ghost'
                size='sm'
                className='gap-1 text-sm text-brand font-medium hover:brand-dark'
              >
                Ver todas
                <ChevronRight className='size-5' />
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent className='p-0'>
            {recentTransactions.map((transaction) => (
              <DashboardTransactionItem
                key={`${transaction.title}-${transaction.date}`}
                transaction={transaction}
              />
            ))}
          </CardContent>

          <div className='flex justify-center items-center border-t border-gray-200 px-6 py-4'>
            <Button
              size='sm'
              variant='ghost'
              className='gap-1 text-sm text-brand font-medium hover:brand-dark'
            >
              <Plus className='size-5' />
              Nova transação
            </Button>
          </div>
        </Card>

        <Card className='gap-0 p-0 border border-gray-200'>
          <CardHeader className='px-6 py-4 flex items-center justify-between gap-4 border-b border-gray-200'>
            <CardTitle className='text-xs font-medium uppercase tracking-wide text-gray-500'>
              Categorias
            </CardTitle>
            <CardAction>
              <Button
                variant='ghost'
                size='sm'
                className='gap-1 text-sm text-brand font-medium hover:brand-dark'
              >
                Gerenciar
                <ChevronRight className='size-5' />
              </Button>
            </CardAction>
          </CardHeader>

          <CardContent className='flex flex-col gap-5 p-6'>
            {categories.map((category) => (
              <DashboardCategoryItem key={category.name} category={category} />
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
