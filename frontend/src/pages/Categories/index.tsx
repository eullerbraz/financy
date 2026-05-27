import { Button } from '@/components/ui/button';
import { useQuery } from '@apollo/client/react';
import { ArrowUpDown, Plus, Tag, Utensils } from 'lucide-react';
import { useState } from 'react';
import { LIST_CATEGORIES } from '../../lib/graphql/queries/Category';
import { CategoryCardItem } from './components/CategoryCardItem';
import { CategoryMetricCard } from './components/CategoryMetricCard';
import { CreateCategoryDialog } from './components/CreateCategoryDialog';

export function Categories() {
  const { data, loading, refetch } = useQuery(LIST_CATEGORIES);

  const categories = data?.getAllCategoriesByUserId || [];

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
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`category-skeleton-${i}`}
                  className='h-[226px] rounded-lg border border-dashed border-gray-200'
                />
              ))
            : categories.map((category) => (
                <CategoryCardItem key={category.name} category={category} />
              ))}
        </section>
      </div>

      <CreateCategoryDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={() => refetch()}
      />
    </>
  );
}
