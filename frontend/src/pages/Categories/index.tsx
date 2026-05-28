import { Button } from '@/components/ui/button';
import { useQuery } from '@apollo/client/react';
import { ArrowUpDown, Plus, Tag, Utensils } from 'lucide-react';
import { useState } from 'react';
import {
  CATEGORIES_METRICS,
  LIST_CATEGORIES,
} from '../../lib/graphql/queries/Category';
import type { Category } from '../../types';
import { CategoryCardItem } from './components/CategoryCardItem';
import { CategoryMetricCard } from './components/CategoryMetricCard';
import { CreateCategoryDialog } from './components/CreateCategoryDialog';
import { DeleteCategoryDialog } from './components/DeleteCategoryDialog';
import { EditCategoryDialog } from './components/EditCategoryDialog';

export function Categories() {
  const {
    data: categoriesData,
    loading: categoriesLoading,
    refetch: categoriesRefetch,
  } = useQuery(LIST_CATEGORIES);

  const {
    data: metricsData,
    loading: metricsLoading,
    refetch: metricsRefetch,
  } = useQuery(CATEGORIES_METRICS);

  const categories = categoriesData?.getAllCategoriesByUserId || [];
  const {
    countCategories = 0,
    countTransactions = 0,
    mostUsedCategory,
  } = metricsData?.getCategoriesMetricsByUserId || {};

  const [category, setCategory] = useState<Category | null>(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleEditTransaction = (transaction: Category) => {
    setCategory(transaction);
    setOpenEditDialog(true);
  };

  const handleDeleteCategory = (transaction: Category) => {
    setCategory(transaction);

    setOpenDeleteDialog(true);
  };

  const refetch = () => {
    categoriesRefetch();
    metricsRefetch();
  };

  const loading = categoriesLoading || metricsLoading;

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
            value={countCategories.toString()}
            iconColor='text-gray-700'
          />
          <CategoryMetricCard
            icon={ArrowUpDown}
            label='Total de transações'
            value={countTransactions.toString()}
            iconColor='text-purple'
          />
          <CategoryMetricCard
            icon={Utensils}
            label='Categoria mais utilizada'
            value={mostUsedCategory?.name || 'Nenhuma'}
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
                <CategoryCardItem
                  key={category.name}
                  category={category}
                  onEdit={() => handleEditTransaction(category)}
                  onDelete={() => handleDeleteCategory(category)}
                />
              ))}
        </section>
      </div>

      <CreateCategoryDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onCreated={refetch}
      />

      <EditCategoryDialog
        category={category}
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
        onEdited={refetch}
      />

      <DeleteCategoryDialog
        category={category}
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onDeleted={refetch}
      />
    </>
  );
}
