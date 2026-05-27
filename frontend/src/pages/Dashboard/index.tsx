import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  Wallet,
} from 'lucide-react';
import {
  Colors,
  IconsEnum,
  TransactionType,
  type Category,
  type Transaction,
} from '../../types';
import { DashboardCategoryItem } from './components/DashboardCategoryItem';
import { DashboardMetricCard } from './components/DashboardMetricCard';
import { DashboardTransactionItem } from './components/DashboardTransactionItem';

export interface DashboardMetric {
  label: string;
  value: number;
  icon: typeof Wallet;
  color: string;
}

const metrics: DashboardMetric[] = [
  {
    label: 'Saldo total',
    value: 12847.32,
    icon: Wallet,
    color: Colors.purple,
  },
  {
    label: 'Receitas do mês',
    value: 4250.0,
    icon: CircleArrowUp,
    color: Colors.green,
  },
  {
    label: 'Despesas do mês',
    value: 2180.45,
    icon: CircleArrowDown,
    color: Colors.red,
  },
];

const recentTransactions: Transaction[] = [
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

const categories: Category[] = [
  {
    id: 'c-1',
    name: 'Alimentação',
    description: 'Restaurantes, delivery e refeições',
    userId: 'u-1',
    countTransactions: 12,
    transactionAmount: 542.3,
    color: Colors.blue,
    icon: IconsEnum.Utensils,
  },
  {
    id: 'c-2',
    name: 'Entretenimento',
    description: 'Cinema, jogos e lazer',
    userId: 'u-1',
    countTransactions: 2,
    transactionAmount: 186.2,
    color: Colors.pink,
    icon: IconsEnum.Ticket,
  },
  {
    id: 'c-3',
    name: 'Investimento',
    description: 'Aplicações e retornos financeiros',
    userId: 'u-1',
    countTransactions: 1,
    transactionAmount: 340.25,
    color: Colors.green,
    icon: IconsEnum.PiggyBank,
  },
  {
    id: 'c-4',
    name: 'Mercado',
    description: 'Compras de supermercado e mantimentos',
    userId: 'u-1',
    countTransactions: 3,
    transactionAmount: 298.75,
    color: Colors.orange,
    icon: IconsEnum.ShoppingCart,
  },
  {
    id: 'c-5',
    name: 'Salário',
    description: 'Renda mensal e bonificações',
    userId: 'u-1',
    countTransactions: 3,
    transactionAmount: 6750,
    color: Colors.green,
    icon: IconsEnum.BriefcaseBusiness,
  },
  {
    id: 'c-6',
    name: 'Saúde',
    description: 'Medicamentos, consultas e exames',
    userId: 'u-1',
    countTransactions: 0,
    transactionAmount: 0,
    color: Colors.pink,
    icon: IconsEnum.HeartPulse,
  },
  {
    id: 'c-7',
    name: 'Transporte',
    description: 'Gasolina, transporte público e viagens',
    userId: 'u-1',
    countTransactions: 8,
    transactionAmount: 385.5,
    color: Colors.purple,
    icon: IconsEnum.CarFront,
  },
  {
    id: 'c-8',
    name: 'Utilidades',
    description: 'Energia, água, internet e telefone',
    userId: 'u-1',
    countTransactions: 7,
    transactionAmount: 245.8,
    color: Colors.yellow,
    icon: IconsEnum.ToolCase,
  },
];

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
                key={transaction.id}
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
