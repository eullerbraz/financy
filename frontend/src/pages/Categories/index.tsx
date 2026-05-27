import { Button } from '@/components/ui/button';
import { ArrowUpDown, Plus, Tag, Utensils } from 'lucide-react';
import { useState } from 'react';
import { Colors, IconsEnum, type Category } from '../../types';
import { CategoryCardItem } from './components/CategoryCardItem';
import { CategoryMetricCard } from './components/CategoryMetricCard';
import { CreateCategoryDialog } from './components/CreateCategoryDialog';

export const categories: Category[] = [
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

export function Categories() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className='flex flex-1 gap-8 flex-col w-full p-12 justify-start'>
        <header className='flex justify-between items-center gap-4'>
          <div className='flex flex-col gap-0.5'>
            <h1 className='text-2xl font-bold text-gray-800'>Categorias</h1>
            <p className='text-base font-normal text-gray-600'>
              Organize suas transações por categorias
            </p>
          </div>
          <Button
            className='hover:bg-brand-dark text-sm font-medium text-white'
            size='lg'
            onClick={() => setOpenDialog(true)}
          >
            <Plus className='size-4' />
            Nova categoria
          </Button>
        </header>
        <section className='grid gap-4 grid-cols-3'>
          <CategoryMetricCard
            icon={Tag}
            label='Total de categorias'
            value='8'
            iconColor='text-gray-700'
          />
          <CategoryMetricCard
            icon={ArrowUpDown}
            label='Total de transações'
            value='27'
            iconColor='text-purple'
          />
          <CategoryMetricCard
            icon={Utensils}
            label='Categoria mais utilizada'
            value='Alimentação'
            iconColor='text-blue'
          />
        </section>
        <section className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
          {categories.map((category) => (
            <CategoryCardItem key={category.name} category={category} />
          ))}
        </section>
      </div>

      <CreateCategoryDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={() => console.log('Categoria criada')}
      />
    </>
  );
}
