import { useMutation } from '@apollo/client/react';
import { toast } from 'sonner';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { DELETE_CATEGORY } from '../../../lib/graphql/mutations/Category';
import {
  CATEGORIES_METRICS,
  LIST_CATEGORIES,
} from '../../../lib/graphql/queries/Category';
import type { Category } from '../../../types';

interface DeleteCategoryDialogProps {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: () => void;
}

export function DeleteCategoryDialog({
  open,
  onOpenChange,
  category,
  onDeleted,
}: DeleteCategoryDialogProps) {
  const [deleteCategoryById, { loading }] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: LIST_CATEGORIES }, { query: CATEGORIES_METRICS }],
    onCompleted() {
      toast.success('Categoria removida com sucesso');

      onOpenChange(false);

      onDeleted?.();
    },
    onError() {
      toast.error('Falha ao remover a categoria');
    },
  });

  const handleDeleteCategory = async () => {
    if (!category) return;

    await deleteCategoryById({
      variables: {
        deleteCategoryByIdId: category.id,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className='flex flex-col items-start gap-4'>
          <DialogTitle className='text-base font-semibold text-gray-800'>
            Remover categoria
          </DialogTitle>
          <DialogDescription className='text-sm font-normal text-gray-600'>
            <span>Tem certeza que deseja remover a categoria </span>
            <span className='font-semibold'> {category?.name}</span>
            <span>? Essa ação não poderá ser desfeita.</span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            className='hover:bg-gray-200'
            variant='outline'
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            className='bg-red text-white hover:bg-red-dark'
            variant='destructive'
            onClick={handleDeleteCategory}
            disabled={loading}
          >
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
