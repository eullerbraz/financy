import { Button } from '@/components/ui/button';
import {
  ArrowUpDown,
  BriefcaseBusiness,
  CarFront,
  HeartPulse,
  PiggyBank,
  Plus,
  ShoppingCart,
  Tag,
  Ticket,
  ToolCase,
  Utensils,
} from 'lucide-react';
import { CategoryCardItem } from './components/CategoryCardItem';
import { CategoryMetricCard } from './components/CategoryMetricCard';

export type CategoryTone =
  | 'blue'
  | 'purple'
  | 'green'
  | 'orange'
  | 'pink'
  | 'yellow';

export type Category = {
  name: string;
  description: string;
  items: number;
  amount: number;
  tone: CategoryTone;
  icon: typeof Tag;
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
  green: {
    bg: 'bg-green-light',
    text: 'text-green',
    textDark: 'text-green-dark',
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
} as const;

const categories: Category[] = [
  {
    name: 'Alimentação',
    description: 'Restaurantes, delivery e refeições',
    items: 12,
    amount: 542.3,
    tone: 'blue',
    icon: Utensils,
  },
  {
    name: 'Entretenimento',
    description: 'Cinema, jogos e lazer',
    items: 2,
    amount: 186.2,
    tone: 'pink',
    icon: Ticket,
  },
  {
    name: 'Investimento',
    description: 'Aplicações e retornos financeiros',
    items: 1,
    amount: 340.25,
    tone: 'green',
    icon: PiggyBank,
  },
  {
    name: 'Mercado',
    description: 'Compras de supermercado e mantimentos',
    items: 3,
    amount: 298.75,
    tone: 'orange',
    icon: ShoppingCart,
  },
  {
    name: 'Salário',
    description: 'Renda mensal e bonificações',
    items: 3,
    amount: 6750,
    tone: 'green',
    icon: BriefcaseBusiness,
  },
  {
    name: 'Saúde',
    description: 'Medicamentos, consultas e exames',
    items: 0,
    amount: 0,
    tone: 'pink',
    icon: HeartPulse,
  },
  {
    name: 'Transporte',
    description: 'Gasolina, transporte público e viagens',
    items: 8,
    amount: 385.5,
    tone: 'purple',
    icon: CarFront,
  },
  {
    name: 'Utilidades',
    description: 'Energia, água, internet e telefone',
    items: 7,
    amount: 245.8,
    tone: 'yellow',
    icon: ToolCase,
  },
];

export function Categories() {
  return (
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
  );
}
