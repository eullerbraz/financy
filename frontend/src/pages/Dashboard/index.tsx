import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useQuery } from '@apollo/client/react';
import {
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LIST_CATEGORIES } from '../../lib/graphql/queries/Category';
import { LIST_TRANSACTIONS } from '../../lib/graphql/queries/Transaction';
import { Colors } from '../../types';
import { CreateTransactionDialog } from '../Transactions/components/CreateTransactionDialog';
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

export function Dashboard() {
  const { data: transactionsData, refetch: refetchTransactions } =
    useQuery(LIST_TRANSACTIONS);

  const transactions = transactionsData?.getAllTransactionsByUserId || [];

  const { data: categoriesData, refetch: refetchCategories } =
    useQuery(LIST_CATEGORIES);

  const categories = categoriesData?.getAllCategoriesByUserId || [];

  const [openCreateDialog, setCreateOpenDialog] = useState(false);

  const refetch = () => {
    refetchTransactions();
    refetchCategories();
  };

  return (
    <>
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
                <Link to='/transactions'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='gap-1 text-sm text-brand font-medium hover:brand-dark'
                  >
                    Ver todas
                    <ChevronRight className='size-5' />
                  </Button>
                </Link>
              </CardAction>
            </CardHeader>
            <CardContent className='p-0'>
              {transactions.map((transaction) => (
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
                onClick={() => setCreateOpenDialog(true)}
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
                <Link to='/transactions'>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='gap-1 text-sm text-brand font-medium hover:brand-dark'
                  >
                    Gerenciar
                    <ChevronRight className='size-5' />
                  </Button>
                </Link>
              </CardAction>
            </CardHeader>
            <CardContent className='flex flex-col gap-5 p-6'>
              {categories.map((category) => (
                <DashboardCategoryItem
                  key={category.name}
                  category={category}
                />
              ))}
            </CardContent>
          </Card>
        </section>
      </div>

      <CreateTransactionDialog
        open={openCreateDialog}
        onOpenChange={setCreateOpenDialog}
        onCreated={refetch}
      />
    </>
  );
}
