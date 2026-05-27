import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
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
  const loading = false; // TODO: loading state from mutation

  const handledeleteCategory = async () => {
    if (!category) return;

    onDeleted();
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
            onClick={handledeleteCategory}
            disabled={loading}
          >
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
