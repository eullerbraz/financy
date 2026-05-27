import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import type { Transaction } from '../../../types';

interface DeleteTransactionDialogProps {
  transaction: Transaction;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDeleted: (transactionId: string) => void;
}

export function DeleteTransactionDialog({
  open,
  onOpenChange,
  transaction,
  onDeleted,
}: DeleteTransactionDialogProps) {
  const loading = false; // TODO: loading state from mutation

  const handledeleteTransaction = async () => {
    if (!transaction) return;

    onDeleted(transaction.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className='flex flex-col items-start gap-4'>
          <DialogTitle className='text-base font-semibold text-gray-800'>
            Remover transação
          </DialogTitle>
          <DialogDescription className='text-sm font-normal text-gray-600'>
            <span>Tem certeza que deseja remover a transação </span>
            <span className='font-semibold'> {transaction.description}</span>
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
            onClick={handledeleteTransaction}
            disabled={loading}
          >
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
